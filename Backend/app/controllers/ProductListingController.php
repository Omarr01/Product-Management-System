<?php

class ProductListingController
{
    protected $productModel;
    protected $productListingView;

    public function __construct()
    {
        $this->productModel = new ProductModel();
        $this->productListingView = new ProductListingView();
    }

    public function listAllProducts()
    {
        $products = $this->productModel->getAllProducts();

        $this->productListingView->render($products);
    }
}
