<?php
namespace api\V1\Rest\Appnotifications;
use api\V1\Rest\Bids\BidsEntity;

class AppnotificationsEntity
{
	public function create($data)
	{
		$resp = array();
		$resp['_embedded'] = array();

		global $dbAdapter;
		
		try
		{
			$date_created = date('Y-m-d H:i:s');
			
			//inserting into user_notification
			$query_user_notifications = "INSERT INTO user_notifications (job_id, user_id, notification_id , date_created, read_status ) VALUES ('".$data->job_id."','".$data->user_id."', '0' ,'"	 .$date_created."', '0' )";
        	$result_user_notifications = $dbAdapter->query($query_user_notifications, $dbAdapter::QUERY_MODE_EXECUTE);
			
			$bidsEntity = new BidsEntity();
			$updateArray = array();
			$updateArray['accept_status'] = 'Accepted';
			$bidsEntity->patch($data->bid_id, $updateArray);
			
			$resp['status'] = 'true';
			$resp['_embedded'] = array('notification_id' => '0');
				
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

            $query = "UPDATE user_notifications SET  $update_string   date_modified ='".$date_updated."'   WHERE id=$id"; 

            $update = $dbAdapter->query($query, $dbAdapter::QUERY_MODE_EXECUTE);
            
            if ($update) 
            {
                $updated_bid = "SELECT * FROM user_notifications WHERE id=$id";

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
	
	public function fetchAll ( $params = array() )
	{
        global $dbAdapter;
		
		$sitterMessage = 'user_name has Applied to the job job_title';
		$familyMessage = 'user_name has Accecped the job job_title';
		
		$result = array();
        $resp = array();
        $resp['_embedded'] = array() ;
		
        try 
        {
            if( isset($params['user_id']) ){	
				$query = "SELECT * FROM user_notifications WHERE user_id=". $params['user_id'] ." order by date_created DESC";

				$userNotifications = $dbAdapter->query($query, $dbAdapter::QUERY_MODE_EXECUTE)->toArray();
			}

            if( !empty($userNotifications) )
            {
				$query = "select * from users where id='". $userNotifications[0]['user_id'] ."'"; 
				$userData = $dbAdapter->query($query, $dbAdapter::QUERY_MODE_EXECUTE)->toArray();
				
				//   Send all notifications for the user.
				if( isset( $params['read_status']) && $params['read_status'] == 'all' ) {
					foreach($userNotifications as $key => $notification) {
						$resultNotification = null;
						
						$query = "select * from jobs where id='". $notification['job_id'] ."'"; 
						$jobData = $dbAdapter->query($query, $dbAdapter::QUERY_MODE_EXECUTE)->toArray();
						
						if( count($jobData) > 0 ){
							$resultNotification['notification_id'] = $notification['id'];
							$resultNotification['job_id'] = $notification['job_id'];
							$resultNotification['job_title'] = $jobData[0]['name'];
							$resultNotification['user_id'] = $notification['user_id'];
							$resultNotification['user_name'] = $userData[0]['name'];
							$resultNotification['datetime'] = $notification['date_created'];

							if( $userData[0]['type'] == 'Family' ){
								$familyMessage = str_replace( 'user_name', $userData[0]['name'], $familyMessage );
								$familyMessage = str_replace( 'job_title', $jobData[0]['name'], $familyMessage );
								$resultNotification['content'] = $familyMessage;
							} else if( $userData[0]['type'] == 'Sitter' ){
								$sitterMessage = str_replace( 'user_name', $userData[0]['name'], $sitterMessage );
								$sitterMessage = str_replace( 'job_title', $jobData[0]['name'], $sitterMessage );
								$resultNotification['content'] = $sitterMessage;
							}
							
							array_push($result, $resultNotification );	
						}
					}
				} else {
					//   Send only unread notifications for the user.
					foreach($userNotifications as $key => $notification) {
						if( $notification['read_status'] == '0' ) {
							$resultNotification = null;
							
							$query = "select * from jobs where id='". $notification['job_id'] ."'"; 
							$jobData = $dbAdapter->query($query, $dbAdapter::QUERY_MODE_EXECUTE)->toArray();
						
							if( count($jobData) > 0 ) {
							
								$resultNotification['notification_id'] = $notification['id'];
								$resultNotification['job_id'] = $notification['job_id'];
								$resultNotification['job_title'] = $jobData[0]['name'];
								$resultNotification['user_id'] = $notification['user_id'];
								$resultNotification['user_name'] = $userData[0]['name'];
								$resultNotification['datetime'] = $notification['date_created'];
									
								if( $userData[0]['type'] == 'Family' ){
									$familyMessage = str_replace( 'user_name', $userData[0]['name'], $familyMessage );
									$familyMessage = str_replace( 'job_title', $jobData[0]['name'], $familyMessage );
									$resultNotification['content'] = $familyMessage;
								} else if( $userData[0]['type'] == 'Sitter' ){
									$sitterMessage = str_replace( 'user_name', $userData[0]['name'], $sitterMessage );
									$sitterMessage = str_replace( 'job_title', $jobData[0]['name'], $sitterMessage );
									$resultNotification['content'] = $sitterMessage;
								}
							
								array_push($result, $resultNotification );	
							}						
						}
					}
				}
				
                $resp['status'] = 'true';

                $resp['_embedded'] = $result;
            
                return json_decode(json_encode($resp), FALSE);
            }
            else
            {
                $resp['status'] = 'false';
                $resp['message'] = 'No Notifications found';
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
