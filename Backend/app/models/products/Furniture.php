<?php

class Furniture extends Product implements JsonSerializable
{
    protected $height;
    protected $width;
    protected $length;

    public function __construct($formData)
    {
        if (is_array($formData)) {
            $this->sku = $formData["sku"];
            $this->name = $formData["name"];
            $this->price = $formData["price"];
            $this->type = $formData["productType"];
            $this->height = $formData["height"];
            $this->width = $formData["width"];
            $this->length = $formData["length"];
            $this->specs = "{$formData["height"]}x{$formData["width"]}x{$formData["length"]}";
        }
    }

    public function getHeight()
    {
        return $this->height;
    }

    public function getWidth()
    {
        return $this->width;
    }

    public function getLength()
    {
        return $this->length;
    }

    public function jsonSerialize()
    {
        return [
            'pid' => $this->getPid(),
            'SKU' => $this->getSku(),
            'name' => $this->getName(),
            'price' => $this->getPrice(),
            'type' => $this->getType(),
            'heightWidthLength' => $this->getSpecs()
        ];
    }

    public function validate()
    {
        $fieldsWithError = parent::validateCommon();

        $height = $this->getHeight();
        $width = $this->getWidth();
        $length = $this->getLength();

        $specs = array(
            "height" => $height,
            "width" => $width,
            "length" => $length
        );

        $foundEmptyFields = in_array("Please, submit required data", $fieldsWithError);
        $foundWrongDataFields = in_array("Please, provide the data of indicated type", $fieldsWithError);

        if (trim($height) == "" || trim($width) == "" || trim($length) == "") {
            if (!$foundEmptyFields) {
                $fieldsWithError = array("Please, submit required data");
            }
            foreach ($specs as $name => $value) {
                if (trim($value) == "") {
                    array_push($fieldsWithError, $name);
                }
            }
        } elseif (!is_numeric($height) || !is_numeric($width) || !is_numeric($length)) {
            if (!$foundEmptyFields) {
                if (!$foundWrongDataFields) {
                    $fieldsWithError = array("Please, provide the data of indicated type");
                }
                foreach ($specs as $name => $value) {
                    if (!is_numeric($value)) {
                        array_push($fieldsWithError, $name);
                    }
                }
            }
        }

        return $fieldsWithError;
    }
}
