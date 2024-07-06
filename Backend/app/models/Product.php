<?php

abstract class Product
{
    protected $pid;
    protected $sku;
    protected $name;
    protected $price;
    protected $type;
    protected $specs;

    public function getPid()
    {
        return $this->pid;
    }

    public function setPid($pid)
    {
        $this->pid = $pid;
    }

    public function getSku()
    {
        return $this->sku;
    }

    public function setSku($sku)
    {
        $this->sku = $sku;
    }

    public function getName()
    {
        return $this->name;
    }

    public function setName($name)
    {
        $this->name = $name;
    }

    public function getPrice()
    {
        return $this->price;
    }

    public function setPrice($price)
    {
        $this->price = $price;
    }

    public function getType()
    {
        return $this->type;
    }

    public function setType($type)
    {
        $this->type = $type;
    }

    public function getSpecs()
    {
        return $this->specs;
    }

    public function setSpecs($specs)
    {
        $this->specs = $specs;
    }

    public function setValues($row)
    {
        $this->setPid($row["pid"]);
        $this->setSku($row["SKU"]);
        $this->setName($row["name"]);
        $this->setPrice($row["price"]);
        $this->setType($row["type"]);
        $this->setSpecs($row["specs"]);
    }

    public function validateCommon()
    {
        $sku = $this->getSku();
        $name = $this->getName();
        $price = $this->getPrice();
        $type = $this->getType();

        $productModel = new ProductModel();

        if (trim($sku) == "" || trim($name) == "" || trim($price) == "" || trim($type) == "") {
            $emptyFields = array("Please, submit required data");
            if (trim($sku) == "") {
                array_push($emptyFields, "SKU");
            }
            if (trim($name) == "") {
                array_push($emptyFields, "name");
            }
            if (trim($price) == "") {
                array_push($emptyFields, "price");
            }
            if (trim($type) == "") {
                array_push($emptyFields, "type");
            }
            return $emptyFields;
        } elseif (!is_numeric($price)) {
            return array("Please, provide the data of indicated type", "price");
        } else {
            if (in_array($sku, $productModel->SKUsAlreadyExist())) {
                return array("Sku Already Exists", "SKU");
            }
        }
        return array();
    }

    abstract public function validate();
}
