<?php

class ProductDeletionController
{
    protected $productModel;
    protected $productDeletionView;

    public function __construct()
    {
        $this->productModel = new ProductModel();
        $this->productDeletionView = new ProductDeletionView();
    }

    public function deleteProducts()
    {
        $_POST = json_decode(file_get_contents("php://input"), true);

        $productsToBeDeletedIds = $_POST['data'];

        if (!empty($productsToBeDeletedIds)) {
            $this->productModel->deleteProducts($productsToBeDeletedIds);

            $this->productDeletionView->render();
        }
    }
}
