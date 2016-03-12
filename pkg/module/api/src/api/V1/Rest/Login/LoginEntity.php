<?php
namespace api\V1\Rest\Login;
session_start();

class LoginEntity
{
	public function login($data)
	{
		global $dbAdapter;
		$resp = array();
		$resp['_embedded'] = array() ;

        try
        {
	        $query = "SELECT * FROM users WHERE email='".$data->email."' and password='".$data->password."' ";

	        $result = $dbAdapter->query($query, $dbAdapter::QUERY_MODE_EXECUTE)->toArray();
	        

	        if(!empty($result) && $result[0]['deleted'] == 0)
	        {
	        	$resp['status'] = 'true';
		        $resp['_embedded'] = $result;

		        //setting session
		        $username = $result[0]['user_name'];
				$_SESSION["$username"] = $username;

		        return json_decode(json_encode($resp), FALSE);
		    }
		    else
		    {
		    	$resp['status'] = 'false';
		    	$resp['message'] = 'Invalid User or password';
		    	return json_decode(json_encode($resp), FALSE);
		    }
	    }
	    catch(Exception $e)
        {
        	$resp['status'] = 'false';
		    $resp['message'] = $e->getMessage();
            return json_decode(json_encode($resp), FALSE);
        }
	}

	public function logout($username)
	{
		// die("string");
		session_unset("$username");
        
        return TRUE;
	}
}
