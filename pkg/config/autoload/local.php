<?php
return array(
    'db' => array(
        'adapters' => array(
            'schooldba' => array(
                'database' => 'school',
                'driver' => 'PDO_Mysql',
                'hostname' => 'localhost',
                'username' => 'root',
                'password' => '',
            ),
            'assa' => array(
                'database' => 'test',
                'driver' => 'Mysqli',
                'hostname' => 'localhost',
                'username' => 'root',
            ),
        ),
    ),
);
