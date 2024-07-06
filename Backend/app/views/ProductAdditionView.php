<?php

class ProductAdditionView
{
    public function render($errorAndInvalidFields)
    {
        print_r(json_encode($errorAndInvalidFields));
    }
}
