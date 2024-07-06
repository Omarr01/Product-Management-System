<?php

class ProductModel
{
    protected $database;

    public function __construct()
    {
        $this->database = new Database();
    }

    public function getAllProducts()
    {
        $sql = "SELECT * FROM product";
        $connect = $this->database->connectToDatabase();
        $result = mysqli_query($connect, $sql);

        $resultSet = array();

        while ($row = mysqli_fetch_assoc($result)) {
            $prodType = strval($row["type"]);
            if (class_exists($prodType)) {
                $product = new $prodType("");
                $product->setValues($row);
                $resultSet[] = $product;
            }
        }

        return $resultSet;
    }

    public function insertProduct($product)
    {
        $errorAndInvalidFields = $product->validate();
        if (empty($errorAndInvalidFields)) {
            $sku = $product->getSku();
            $name = $product->getName();
            $price = floatval($product->getPrice());
            $type = $product->getType();
            $specs = $product->getSpecs();

            $sql = "INSERT INTO product (SKU, name, price, type, specs) VALUES('$sku', '$name', '$price', '$type', '$specs')";
            $connect = $this->database->connectToDatabase();
            mysqli_query($connect, $sql);
        }
        return $errorAndInvalidFields;
    }

    public function SKUsAlreadyExist()
    {
        $sql = "SELECT SKU FROM product";
        $connect = $this->database->connectToDatabase();
        $result = mysqli_query($connect, $sql);

        $rs_sku = array();

        while ($row = mysqli_fetch_assoc($result)) {
            $rs_sku[] = $row["SKU"];
        }

        return $rs_sku;
    }

    public function deleteProducts($productsToBeDeletedIds)
    {
        $connect = $this->database->connectToDatabase();

        foreach ($productsToBeDeletedIds as $pid) {
            $sql = "DELETE FROM product WHERE pid= '$pid'";
            mysqli_query($connect, $sql);
        }
    }
}
