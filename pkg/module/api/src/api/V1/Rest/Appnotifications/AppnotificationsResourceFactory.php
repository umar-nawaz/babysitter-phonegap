<?php
namespace api\V1\Rest\Appnotifications;

class AppnotificationsResourceFactory
{
    public function __invoke($services)
    {
        return new AppnotificationsResource();
    }
}
