<?php
namespace api\V1\Rest\Jobs;

class JobsResourceFactory
{
    public function __invoke($services)
    {
        return new JobsResource();
    }
}
