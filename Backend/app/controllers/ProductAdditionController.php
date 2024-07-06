<?php

class ProductAdditionController
{
    protected $productModel;
    protected $productAdditionView;

    public function __construct()
    {
        $this->productModel = new ProductModel();
        $this->productAdditionView = new ProductAdditionView();
    }

    public function addProduct()
    {
        $productInfo = json_decode(file_get_contents("php://input"), true);

        if (!empty($productInfo['productType']) && class_exists(strval($productInfo['productType']))) {
            $productType = strval($productInfo['productType']);

            $product = new $productType($productInfo);

            $errorAndInvalidFields = $this->productModel->insertProduct($product);

            $this->productAdditionView->render($errorAndInvalidFields);
        }
    }
}
