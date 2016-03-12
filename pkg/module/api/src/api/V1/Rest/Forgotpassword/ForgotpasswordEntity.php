<?php
namespace api\V1\Rest\Forgotpassword;

class ForgotpasswordEntity
{
	public function getpassword($data)
	{
		global $dbAdapter;

		$resp = array();
		$resp['_embedded'] = array();

        try
        {
        	$user_email = $data->email;

        	$query = "SELECT * FROM users WHERE email='".$user_email."'";

        	$result = $dbAdapter->query($query, $dbAdapter::QUERY_MODE_EXECUTE)->toArray();

        	if(!empty($result))
        	{
	        	$company_email = 'babysitter@gmail.com'; 
				$subject 		= 'Forgot Password'; 
				$comments  		= 'Your Password: '. $result[0]['password'];

				$headers   = array();
				$headers[] = "MIME-Version: 1.0";
				$headers[] = "Content-type: text/plain; charset=utf-8";
				$headers[] = "From:  <$company_email>"; // email address
				$headers[] = "Reply-To: Recipient Name <$user_email>"; // Your site e-mail address
				$headers[] = "Subject: {$subject}";
				$headers[] = "X-Mailer: PHP/".phpversion();
				

				$is_sent = mail($user_email, $subject, $comments, implode("\r\n", $headers));	
				
				if($is_sent){
					$resp['status'] = 'true';
					$resp['message'] = "Email has successfully sent to $user_email";
					
					return json_decode(json_encode($resp), FALSE);
				}
				else{
					$resp['status'] = 'false';
					$resp['message'] = "Email sending failed.";
					return json_decode(json_encode($resp), FALSE);
				}

        	}
        	else
        	{
        		$resp = array( "message"=>"No user found with this email.");
				return json_decode(json_encode($resp), FALSE);

        	}

        }
        catch(Exception $e)
        {

        }
	}
}
