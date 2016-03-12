<?php
namespace api\V1\Rest\Bids;

class BidsResourceFactory
{
    public function __invoke($services)
    {
        return new BidsResource();
    }
}
