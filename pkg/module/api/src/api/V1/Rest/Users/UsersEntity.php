<?php
namespace api\V1\Rest\Users;

class UsersEntity
{
	public function create($data)
    {
        $resp = array();
        $resp['_embedded'] = array();

        global $dbAdapter;

        try
        {
            //checking if user already exist

            $user_name_query = "SELECT * FROM users WHERE email='".$data->email."'";

            $user = $dbAdapter->query($user_name_query, $dbAdapter::QUERY_MODE_EXECUTE)->toarray();
            if(!empty($user))
            {
                $resp['status'] = 'false';
                $resp['message'] = 'email or user_name already exist';
                return json_decode(json_encode($resp), FALSE);
            }


        	$date_created = date('Y-m-d H:i:s');

        	$query = "INSERT INTO users (name, user_name, email, password, date_of_birth , gender , family_sitter_name , type , user_image, date_created, deleted ) VALUES ('".$data->name."','".$data->email."','".$data->email."','".$data->password."','".$data->date_of_birth."','".$data->gender."','".$data->family_sitter_name."','".$data->type."','".$data->user_image."','".$date_created."','0')";
            
        	$result = $dbAdapter->query($query, $dbAdapter::QUERY_MODE_EXECUTE);

            $lastInsertId =array( 'id' => $dbAdapter->getDriver()->getLastGeneratedValue());

            $resp['status'] = 'true';
            $resp['_embedded'] = $lastInsertId;
                
            return json_decode(json_encode($resp), FALSE);
        }
        catch(Exception $e)
        {
            $resp['status'] = 'false';
            $resp['message'] = $e->getMessage();
            return json_decode(json_encode($resp), FALSE);
        }
	   
    }

	public function fetch($id)
    {
        global $dbAdapter;
        $resp = array();
        $resp['_embedded'] = array() ;

        try 
        {
        	$jobs_data = array();
            $jobs_data['user_jobs'] = array();

        	$query = "SELECT * FROM users WHERE id=$id";

        	$result = $dbAdapter->query($query, $dbAdapter::QUERY_MODE_EXECUTE)->toArray();
            // print_r($result);
            // die;
            
            $query_userjobs = "SELECT * FROM user_jobs WHERE user_id=$id AND deleted=0 ORDER BY  date_created DESC";

            $result_userjobs = $dbAdapter->query($query_userjobs, $dbAdapter::QUERY_MODE_EXECUTE)->toArray();

            if(!empty($result_userjobs))
            {
                foreach($result_userjobs as $row)
                {
                    $job_id = $row['job_id'];
                    $query_jobs = "SELECT * FROM jobs WHERE id=$job_id ";

                    $result_jobs = $dbAdapter->query($query_jobs, $dbAdapter::QUERY_MODE_EXECUTE)->toArray();

                    array_push($jobs_data['user_jobs'], $result_jobs[0]);
                    

                }
            }
            

            if(!empty($result) && $result[0]['deleted'] == 0)
            {
                $resp['status'] = 'true';
               
                if(!empty($result_jobs))
                { 
                    $result[0]['hasMany'][0] =  $jobs_data;
                }
                // print_r($result);
                // die;
                 $resp['_embedded'] = $result;
            
                return json_decode(json_encode($resp), FALSE);
            }
            else
            {
                $resp['status'] = 'false';
                $resp['message'] = 'No user found';
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

	public function fetchAll($params = array())
    {
        $resp = array();
        $resp['_embedded'] = array() ;

         global $dbAdapter;

        try
        {
           
            
            $query = 'SELECT * FROM users WHERE deleted = 0  ORDER BY date_created' ;

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

    public function update($id , $data)
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

            $query = "UPDATE users SET  $update_string   date_modified ='".$date_updated."'   WHERE id=$id"; 

            $update = $dbAdapter->query($query, $dbAdapter::QUERY_MODE_EXECUTE);
            
            if ($update) 
            {
                $updated_user = "SELECT * FROM users WHERE id=$id";

                $result = $dbAdapter->query($updated_user, $dbAdapter::QUERY_MODE_EXECUTE)->toArray();

                $resp['status'] = 'true';
                $resp['_embedded'] = $result;
                   
                return json_decode(json_encode($resp), FALSE);
            }
            else
            {
                $resp['status'] = 'false';
                $resp['message'] = 'Error in updating user';
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

    public function delete($id)
    {
        global $dbAdapter;

        $resp = array();
        $resp['_embedded'] = array() ;

        try
        {

            $query = "UPDATE users SET deleted = 1  WHERE id=$id";

            $result = $dbAdapter->query($query, $dbAdapter::QUERY_MODE_EXECUTE);

            if($result)
            {
                return TRUE;
            }
        }
        catch(Exception $e)
        {
            return FALSE;

            // $resp['status'] = 'false';
            // $resp['message'] = $e->getMessage();
            // return json_decode(json_encode($resp), FALSE);
        }


    }
}
