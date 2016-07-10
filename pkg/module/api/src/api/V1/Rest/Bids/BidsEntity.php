<?php
namespace api\V1\Rest\Bids;

class BidsEntity
{
	public function create($data)
	{
		$resp = array();
        $resp['_embedded'] = array();

        global $dbAdapter;

        try
        {
			
			$query = "SELECT * FROM job_bids WHERE job_id=".$data->job_id. " AND user_id =".$data->user_id;
			
			$user_result = $dbAdapter->query($query, $dbAdapter::QUERY_MODE_EXECUTE)->toArray();
			
			if(!empty($user_result)){
				$resp['status'] = 'false';
				$resp['message'] = 'User already applied for this job';
                
				return json_decode(json_encode($resp), FALSE);
				
			}
			
        	$date_created = date('Y-m-d H:i:s');
			
			//inserting into bids table
        	$query_bids = "INSERT INTO bids (name, description, applicant_name , date_created ) VALUES ('".$data->name."','".$data->description."','".$data->applicant_name."','".$date_created."')";

        	$result = $dbAdapter->query($query_bids, $dbAdapter::QUERY_MODE_EXECUTE);

        	$bid_id =$dbAdapter->getDriver()->getLastGeneratedValue();
			
			//inserting into job bids	 
        	$query_job_bids = "INSERT INTO job_bids (job_id, bid_id, user_id, date_created ) VALUES ('".$data->job_id."','".$bid_id."','".$data->user_id."','".$date_created."')";

        	$result_job_bids = $dbAdapter->query($query_job_bids, $dbAdapter::QUERY_MODE_EXECUTE);
			
			//inserting into notifications
		//	$query_notifications = "INSERT INTO notifications (type, content , date_created ) VALUES ('0','".$data->user_name." has applied on your ".$data->job_name."','".$date_created."')";

        //	$result_notifications = $dbAdapter->query($query_notifications, $dbAdapter::QUERY_MODE_EXECUTE);
			
		//	$notification_id =$dbAdapter->getDriver()->getLastGeneratedValue();
			
			//inserting into user_notification
			$query_user_notifications = "INSERT INTO user_notifications (job_id, user_id, notification_id , date_created, read_status ) VALUES ('".$data->job_id."','".$data->user_id."', '0' ,'".$date_created."', '0' )";

        	$result_user_notifications = $dbAdapter->query($query_user_notifications, $dbAdapter::QUERY_MODE_EXECUTE);

        	$resp['status'] = 'true';
            $resp['_embedded'] = array('bid_id' => $bid_id);
                
            return json_decode(json_encode($resp), FALSE);
        	

        }
        catch(Exception $e)
        {
        	$resp['status'] = 'false';
            $resp['message'] = $e->getMessage();
            return json_decode(json_encode($resp), FALSE);
        }

	}

	public function delete($id)
	{
        global $dbAdapter;

        try
        {

            $query_bids = "UPDATE bids SET deleted = 1  WHERE id=$id";

            $result_bids = $dbAdapter->query($query_bids, $dbAdapter::QUERY_MODE_EXECUTE);
			
			$query_bids = "UPDATE job_bids SET deleted = 1  WHERE bid_id=$id";

            $result_bids = $dbAdapter->query($query_bids, $dbAdapter::QUERY_MODE_EXECUTE);


            if($result_bids)
            {
                return TRUE;
            }
        }
        catch(Exception $e)
        {
            return FALSE;
        }

	}

	public function fetch ($id)
	{
        global $dbAdapter;

        $resp = array();
        $resp['_embedded'] = array() ;

        try 
        {
            
            $query = "SELECT * FROM bids WHERE id=$id ";

            $result = $dbAdapter->query($query, $dbAdapter::QUERY_MODE_EXECUTE)->toArray();


            if(!empty($result) && $result[0]['deleted'] == 0)
            {
                $resp['status'] = 'true';

                $resp['_embedded'] = $result;
            
                return json_decode(json_encode($resp), FALSE);
            }
            else
            {
                $resp['status'] = 'false';
                $resp['message'] = 'No bids found';
                return json_decode(json_encode($resp), FALSE);
            }
        }
        catch(Exception $e)
        {
            $resp['status'] = 'false';
            $resp['message'] =  $e->getMessage();
            return json_decode(json_encode($resp), FALSE);
        }

		
	}

    public function fetchAll ( $data = array() )
    {
        $resp = array();
        $resp['_embedded'] = array() ;

         global $dbAdapter;

        try
        {
            $user_id = $data['query'];
			if($user_id){
				$query = "SELECT * FROM bids WHERE deleted = 0 AND id in(SELECT bid_id FROM job_bids WHERE user_id = " .$user_id. " )ORDER BY date_created DESC";
			
					$bids_result = $dbAdapter->query($query, $dbAdapter::QUERY_MODE_EXECUTE)->toArray();
					
					if(empty($bids_result)){
						$resp['status'] = 'false';
						$resp['message'] = 'You dont have any applications';
						
					}
					else{
						$resp['status'] = 'true';
				        $resp['_embedded'] = $bids_result;
					}
				
			}	 
			else{
				$query = 'SELECT * FROM bids WHERE deleted = 0  ORDER BY date_created' ;
				$result = $dbAdapter->query($query, $dbAdapter::QUERY_MODE_EXECUTE)->toArray();
				$resp['status'] = 'true';
				$resp['_embedded'] = $result;
			}
           
            
			
            
                
            return json_decode(json_encode($resp), FALSE);
        }
        catch(Exception $e)
        {
            $resp['status'] = 'false';
            $resp['message'] = $e->getMessage();
            return json_decode(json_encode($resp), FALSE);
        }
        
    }

	public function patch($id , $data)
	{
        global $dbAdapter;

        $date_updated = date('Y-m-d H:i:s');

        $resp = array();
        $resp['_embedded'] = array() ;

        $update_string = "";

        try
        {
            foreach($data as $key => $value)
            {
                $update_string .= "$key = '".$value."' ,";
            }

            $query = "UPDATE bids SET  $update_string   date_modified ='".$date_updated."'   WHERE id=$id"; 

            $update = $dbAdapter->query($query, $dbAdapter::QUERY_MODE_EXECUTE);
            
            if ($update) 
            {
                $updated_bid = "SELECT * FROM bids WHERE id=$id";

                $result = $dbAdapter->query($updated_bid, $dbAdapter::QUERY_MODE_EXECUTE)->toArray();

                $resp['status'] = 'true';
                $resp['_embedded'] = $result;
                   
                return json_decode(json_encode($resp), FALSE);
            }
            else
            {
                $resp['status'] = 'false';
                $resp['message'] = 'Error in updating job';
                return json_decode(json_encode($resp), FALSE);
            }
        }
        catch(Exception $e)
        {
            $resp['status'] = 'false';
            $resp['message'] =  $e->getMessage();
            return json_decode(json_encode($resp), FALSE);
        }

	}
}
