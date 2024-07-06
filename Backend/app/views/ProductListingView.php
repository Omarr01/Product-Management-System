<?php

class ProductListingView
{
    public function render($products)
    {
        print_r(json_encode($products));
    }
}
