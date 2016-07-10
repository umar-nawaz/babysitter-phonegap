<?php
namespace api\V1\Rest\Jobs;

class JobsEntity
{
	public function create($data)
	{
		$resp = array();
        $resp['_embedded'] = array();

        global $dbAdapter;

        try
        {
        	$date_created = date('Y-m-d H:i:s');

        	$query_jobs = "INSERT INTO jobs (name, description, date_created, job_date, job_time ) VALUES ('".$data->name."','".$data->description."','".$date_created."','".$data->job_date."','".$data->job_time."')";

        	$result = $dbAdapter->query($query_jobs, $dbAdapter::QUERY_MODE_EXECUTE);

        	$job_id =$dbAdapter->getDriver()->getLastGeneratedValue();

        	$query_userjobs = "INSERT INTO user_jobs (user_id, job_id, date_created ) VALUES ('".$data->user_id."','".$job_id."','".$date_created."')";

        	$result = $dbAdapter->query($query_userjobs, $dbAdapter::QUERY_MODE_EXECUTE);

        	$resp['status'] = 'true';
            $resp['_embedded'] = array('job_id' => $job_id);
                
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

            $query_jobs = "UPDATE jobs SET deleted = 1  WHERE id=$id";

            $result_jobs = $dbAdapter->query($query_jobs, $dbAdapter::QUERY_MODE_EXECUTE);
			
			$query_jobs_ = "UPDATE user_jobs SET deleted = 1  WHERE job_id=$id";

            $result_jobs_ = $dbAdapter->query($query_jobs_, $dbAdapter::QUERY_MODE_EXECUTE);


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

	public function fetch($id)
	{
		global $dbAdapter;

        $resp = array();
        $resp['_embedded'] = array() ;

        $bids_data = array();
        $bids_data['job_bids'] = array();

        try 
        {
        	//getting job
       		$query_jobs = "SELECT * FROM jobs WHERE id=$id ";

       		$result = $dbAdapter->query($query_jobs, $dbAdapter::QUERY_MODE_EXECUTE)->toArray();
			
			//getting user_jobs
			$query_user_jobs = "SELECT * FROM user_jobs WHERE job_id=$id ";

       		$result_user_jobs = $dbAdapter->query($query_user_jobs, $dbAdapter::QUERY_MODE_EXECUTE)->toArray();
			
			//sending user id  with job
			if(!empty($result_user_jobs))
			{
				$user_id = $result_user_jobs[0]['user_id'];
				
				$result[0]['user_id']  =  $user_id;
			}

            //getting bids related to jobs

        	$query_job_bids = "SELECT * FROM job_bids WHERE job_id=$id";

            $result_job_bids = $dbAdapter->query($query_job_bids, $dbAdapter::QUERY_MODE_EXECUTE)->toArray();

            if(!empty($result_job_bids))
            {
                foreach($result_job_bids as $row)
                {
                    $bid_id = $row['bid_id'];
                    $query_bids = "SELECT * FROM bids WHERE id=$bid_id";

                    $result_bids = $dbAdapter->query($query_bids, $dbAdapter::QUERY_MODE_EXECUTE)->toArray();

                    array_push($bids_data['job_bids'], $result_bids[0]);
                    

                }
            }

            if(!empty($result) && $result[0]['deleted'] == 0)
            {
                $resp['status'] = 'true';

                if(!empty($result_bids))
                { 
                    $result[0]['hasMany'][0] =  $bids_data;
                }

                $resp['_embedded'] = $result;
            
                return json_decode(json_encode($resp), FALSE);
            }
            else
            {
                $resp['status'] = 'false';
                $resp['message'] = 'No job found';
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

    public function fetchAll()
    {
        $resp = array();
        $resp['_embedded'] = array() ;

         global $dbAdapter;

        try
        {
  
            $query = 'SELECT * FROM jobs WHERE deleted = 0  ORDER BY  date_created DESC' ;

            $result = $dbAdapter->query($query, $dbAdapter::QUERY_MODE_EXECUTE)->toArray();

            $resp['status'] = 'true';
            $resp['_embedded'] = $result;
            
                
            return json_decode(json_encode($resp), TRUE);
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
            
            $query = "UPDATE jobs SET  $update_string   date_modified ='".$date_updated."'   WHERE id=$id"; 

            $update = $dbAdapter->query($query, $dbAdapter::QUERY_MODE_EXECUTE);
            
            if ($update) 
            {
                $updated_job = "SELECT * FROM jobs WHERE id=$id";

                $result = $dbAdapter->query($updated_job, $dbAdapter::QUERY_MODE_EXECUTE)->toArray();

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
