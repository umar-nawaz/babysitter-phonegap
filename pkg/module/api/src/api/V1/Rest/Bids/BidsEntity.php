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
        	$date_created = date('Y-m-d H:i:s');

        	$query_bids = "INSERT INTO bids (name, description, applicant_name , date_created ) VALUES ('".$data->name."','".$data->description."','".$data->applicant_name."','".$date_created."')";

        	$result = $dbAdapter->query($query_bids, $dbAdapter::QUERY_MODE_EXECUTE);

        	$bid_id =$dbAdapter->getDriver()->getLastGeneratedValue();

        	$query_job_bids = "INSERT INTO job_bids (job_id, bid_id, date_created ) VALUES ('".$data->job_id."','".$bid_id."','".$date_created."')";

        	$result = $dbAdapter->query($query_job_bids, $dbAdapter::QUERY_MODE_EXECUTE);

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

            $query_jobs = "UPDATE bids SET deleted = 1  WHERE id=$id";

            $result_jobs = $dbAdapter->query($query_jobs, $dbAdapter::QUERY_MODE_EXECUTE);


            if($result_jobs)
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

    public function fetchAll ()
    {
        $resp = array();
        $resp['_embedded'] = array() ;

         global $dbAdapter;

        try
        {
           
            
            $query = 'SELECT * FROM bids WHERE deleted = 0  ORDER BY date_created' ;

            $result = $dbAdapter->query($query, $dbAdapter::QUERY_MODE_EXECUTE)->toArray();

            $resp['status'] = 'true';
            $resp['_embedded'] = $result;
            
                
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
