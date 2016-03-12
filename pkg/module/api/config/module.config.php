<?php
return array(
    'service_manager' => array(
        'factories' => array(
            'api\\V1\\Rest\\Users\\UsersResource' => 'api\\V1\\Rest\\Users\\UsersResourceFactory',
            'api\\V1\\Rest\\Login\\LoginResource' => 'api\\V1\\Rest\\Login\\LoginResourceFactory',
            'api\\V1\\Rest\\Forgotpassword\\ForgotpasswordResource' => 'api\\V1\\Rest\\Forgotpassword\\ForgotpasswordResourceFactory',
            'api\\V1\\Rest\\Jobs\\JobsResource' => 'api\\V1\\Rest\\Jobs\\JobsResourceFactory',
            'api\\V1\\Rest\\Bids\\BidsResource' => 'api\\V1\\Rest\\Bids\\BidsResourceFactory',
        ),
    ),
    'router' => array(
        'routes' => array(
            'api.rest.users' => array(
                'type' => 'Segment',
                'options' => array(
                    'route' => '/users[/:users_id]',
                    'defaults' => array(
                        'controller' => 'api\\V1\\Rest\\Users\\Controller',
                    ),
                ),
            ),
            'api.rest.login' => array(
                'type' => 'Segment',
                'options' => array(
                    'route' => '/login[/:login_id]',
                    'defaults' => array(
                        'controller' => 'api\\V1\\Rest\\Login\\Controller',
                    ),
                ),
            ),
            'api.rest.forgotpassword' => array(
                'type' => 'Segment',
                'options' => array(
                    'route' => '/forgotpassword[/:forgotpassword_id]',
                    'defaults' => array(
                        'controller' => 'api\\V1\\Rest\\Forgotpassword\\Controller',
                    ),
                ),
            ),
            'api.rest.jobs' => array(
                'type' => 'Segment',
                'options' => array(
                    'route' => '/jobs[/:jobs_id]',
                    'defaults' => array(
                        'controller' => 'api\\V1\\Rest\\Jobs\\Controller',
                    ),
                ),
            ),
            'api.rest.bids' => array(
                'type' => 'Segment',
                'options' => array(
                    'route' => '/bids[/:bids_id]',
                    'defaults' => array(
                        'controller' => 'api\\V1\\Rest\\Bids\\Controller',
                    ),
                ),
            ),
        ),
    ),
    'zf-versioning' => array(
        'uri' => array(
            0 => 'api.rest.users',
            1 => 'api.rest.login',
            2 => 'api.rest.forgotpassword',
            3 => 'api.rest.jobs',
            4 => 'api.rest.bids',
        ),
    ),
    'zf-rest' => array(
        'api\\V1\\Rest\\Users\\Controller' => array(
            'listener' => 'api\\V1\\Rest\\Users\\UsersResource',
            'route_name' => 'api.rest.users',
            'route_identifier_name' => 'users_id',
            'collection_name' => 'users',
            'entity_http_methods' => array(
                0 => 'GET',
                1 => 'PATCH',
                2 => 'DELETE',
                3 => 'POST',
            ),
            'collection_http_methods' => array(
                0 => 'GET',
                1 => 'POST',
            ),
            'collection_query_whitelist' => array(
                0 => 'test',
                1 => 'name',
            ),
            'page_size' => 25,
            'page_size_param' => null,
            'entity_class' => 'api\\V1\\Rest\\Users\\UsersEntity',
            'collection_class' => 'api\\V1\\Rest\\Users\\UsersCollection',
            'service_name' => 'users',
        ),
        'api\\V1\\Rest\\Login\\Controller' => array(
            'listener' => 'api\\V1\\Rest\\Login\\LoginResource',
            'route_name' => 'api.rest.login',
            'route_identifier_name' => 'login_id',
            'collection_name' => 'login',
            'entity_http_methods' => array(
                0 => 'GET',
                1 => 'PATCH',
                2 => 'PUT',
                3 => 'DELETE',
            ),
            'collection_http_methods' => array(
                0 => 'GET',
                1 => 'POST',
            ),
            'collection_query_whitelist' => array(),
            'page_size' => 25,
            'page_size_param' => null,
            'entity_class' => 'api\\V1\\Rest\\Login\\LoginEntity',
            'collection_class' => 'api\\V1\\Rest\\Login\\LoginCollection',
            'service_name' => 'login',
        ),
        'api\\V1\\Rest\\Forgotpassword\\Controller' => array(
            'listener' => 'api\\V1\\Rest\\Forgotpassword\\ForgotpasswordResource',
            'route_name' => 'api.rest.forgotpassword',
            'route_identifier_name' => 'forgotpassword_id',
            'collection_name' => 'forgotpassword',
            'entity_http_methods' => array(
                0 => 'GET',
                1 => 'PATCH',
                2 => 'PUT',
                3 => 'DELETE',
            ),
            'collection_http_methods' => array(
                0 => 'GET',
                1 => 'POST',
            ),
            'collection_query_whitelist' => array(),
            'page_size' => 25,
            'page_size_param' => null,
            'entity_class' => 'api\\V1\\Rest\\Forgotpassword\\ForgotpasswordEntity',
            'collection_class' => 'api\\V1\\Rest\\Forgotpassword\\ForgotpasswordCollection',
            'service_name' => 'forgotpassword',
        ),
        'api\\V1\\Rest\\Jobs\\Controller' => array(
            'listener' => 'api\\V1\\Rest\\Jobs\\JobsResource',
            'route_name' => 'api.rest.jobs',
            'route_identifier_name' => 'jobs_id',
            'collection_name' => 'jobs',
            'entity_http_methods' => array(
                0 => 'GET',
                1 => 'PATCH',
                2 => 'PUT',
                3 => 'DELETE',
                4 => 'POST',
            ),
            'collection_http_methods' => array(
                0 => 'GET',
                1 => 'POST',
            ),
            'collection_query_whitelist' => array(),
            'page_size' => 25,
            'page_size_param' => null,
            'entity_class' => 'api\\V1\\Rest\\Jobs\\JobsEntity',
            'collection_class' => 'api\\V1\\Rest\\Jobs\\JobsCollection',
            'service_name' => 'jobs',
        ),
        'api\\V1\\Rest\\Bids\\Controller' => array(
            'listener' => 'api\\V1\\Rest\\Bids\\BidsResource',
            'route_name' => 'api.rest.bids',
            'route_identifier_name' => 'bids_id',
            'collection_name' => 'bids',
            'entity_http_methods' => array(
                0 => 'GET',
                1 => 'PATCH',
                2 => 'PUT',
                3 => 'DELETE',
                4 => 'POST',
            ),
            'collection_http_methods' => array(
                0 => 'GET',
                1 => 'POST',
            ),
            'collection_query_whitelist' => array(),
            'page_size' => 25,
            'page_size_param' => null,
            'entity_class' => 'api\\V1\\Rest\\Bids\\BidsEntity',
            'collection_class' => 'api\\V1\\Rest\\Bids\\BidsCollection',
            'service_name' => 'bids',
        ),
    ),
    'zf-content-negotiation' => array(
        'controllers' => array(
            'api\\V1\\Rest\\Users\\Controller' => 'HalJson',
            'api\\V1\\Rest\\Login\\Controller' => 'HalJson',
            'api\\V1\\Rest\\Forgotpassword\\Controller' => 'HalJson',
            'api\\V1\\Rest\\Jobs\\Controller' => 'HalJson',
            'api\\V1\\Rest\\Bids\\Controller' => 'HalJson',
        ),
        'accept_whitelist' => array(
            'api\\V1\\Rest\\Users\\Controller' => array(
                0 => 'application/vnd.api.v1+json',
                1 => 'application/hal+json',
                2 => 'application/json',
                3 => 'application/problem+json',
            ),
            'api\\V1\\Rest\\Login\\Controller' => array(
                0 => 'application/vnd.api.v1+json',
                1 => 'application/hal+json',
                2 => 'application/json',
            ),
            'api\\V1\\Rest\\Forgotpassword\\Controller' => array(
                0 => 'application/vnd.api.v1+json',
                1 => 'application/hal+json',
                2 => 'application/json',
            ),
            'api\\V1\\Rest\\Jobs\\Controller' => array(
                0 => 'application/vnd.api.v1+json',
                1 => 'application/hal+json',
                2 => 'application/json',
                3 => 'application/problem+json',
            ),
            'api\\V1\\Rest\\Bids\\Controller' => array(
                0 => 'application/vnd.api.v1+json',
                1 => 'application/hal+json',
                2 => 'application/json',
            ),
        ),
        'content_type_whitelist' => array(
            'api\\V1\\Rest\\Users\\Controller' => array(
                0 => 'application/vnd.api.v1+json',
                1 => 'application/json',
            ),
            'api\\V1\\Rest\\Login\\Controller' => array(
                0 => 'application/vnd.api.v1+json',
                1 => 'application/json',
            ),
            'api\\V1\\Rest\\Forgotpassword\\Controller' => array(
                0 => 'application/vnd.api.v1+json',
                1 => 'application/json',
            ),
            'api\\V1\\Rest\\Jobs\\Controller' => array(
                0 => 'application/vnd.api.v1+json',
                1 => 'application/json',
            ),
            'api\\V1\\Rest\\Bids\\Controller' => array(
                0 => 'application/vnd.api.v1+json',
                1 => 'application/json',
            ),
        ),
    ),
    'zf-hal' => array(
        'metadata_map' => array(
            'api\\V1\\Rest\\Users\\UsersEntity' => array(
                'entity_identifier_name' => 'id',
                'route_name' => 'api.rest.users',
                'route_identifier_name' => 'users_id',
                'hydrator' => 'Zend\\Stdlib\\Hydrator\\ArraySerializable',
            ),
            'api\\V1\\Rest\\Users\\UsersCollection' => array(
                'entity_identifier_name' => 'id',
                'route_name' => 'api.rest.users',
                'route_identifier_name' => 'users_id',
                'is_collection' => true,
            ),
            'api\\V1\\Rest\\Login\\LoginEntity' => array(
                'entity_identifier_name' => 'id',
                'route_name' => 'api.rest.login',
                'route_identifier_name' => 'login_id',
                'hydrator' => 'Zend\\Stdlib\\Hydrator\\ArraySerializable',
            ),
            'api\\V1\\Rest\\Login\\LoginCollection' => array(
                'entity_identifier_name' => 'id',
                'route_name' => 'api.rest.login',
                'route_identifier_name' => 'login_id',
                'is_collection' => true,
            ),
            'api\\V1\\Rest\\Forgotpassword\\ForgotpasswordEntity' => array(
                'entity_identifier_name' => 'id',
                'route_name' => 'api.rest.forgotpassword',
                'route_identifier_name' => 'forgotpassword_id',
                'hydrator' => 'Zend\\Stdlib\\Hydrator\\ArraySerializable',
            ),
            'api\\V1\\Rest\\Forgotpassword\\ForgotpasswordCollection' => array(
                'entity_identifier_name' => 'id',
                'route_name' => 'api.rest.forgotpassword',
                'route_identifier_name' => 'forgotpassword_id',
                'is_collection' => true,
            ),
            'api\\V1\\Rest\\Jobs\\JobsEntity' => array(
                'entity_identifier_name' => 'id',
                'route_name' => 'api.rest.jobs',
                'route_identifier_name' => 'jobs_id',
                'hydrator' => 'Zend\\Stdlib\\Hydrator\\ArraySerializable',
            ),
            'api\\V1\\Rest\\Jobs\\JobsCollection' => array(
                'entity_identifier_name' => 'id',
                'route_name' => 'api.rest.jobs',
                'route_identifier_name' => 'jobs_id',
                'is_collection' => true,
            ),
            'api\\V1\\Rest\\Bids\\BidsEntity' => array(
                'entity_identifier_name' => 'id',
                'route_name' => 'api.rest.bids',
                'route_identifier_name' => 'bids_id',
                'hydrator' => 'Zend\\Stdlib\\Hydrator\\ArraySerializable',
            ),
            'api\\V1\\Rest\\Bids\\BidsCollection' => array(
                'entity_identifier_name' => 'id',
                'route_name' => 'api.rest.bids',
                'route_identifier_name' => 'bids_id',
                'is_collection' => true,
            ),
        ),
    ),
);
