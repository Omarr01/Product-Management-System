<?php

class DVD extends Product implements JsonSerializable
{
    protected $size;

    public function __construct($formData)
    {
        if (is_array($formData)) {
            $this->sku = $formData["sku"];
            $this->name = $formData["name"];
            $this->price = $formData["price"];
            $this->type = $formData["productType"];
            $this->size = $formData["size"];
            $this->specs = $formData["size"];
        }
    }

    public function getSize()
    {
        return $this->size;
    }

    public function jsonSerialize()
    {
        return [
            'pid' => $this->getPid(),
            'SKU' => $this->getSku(),
            'name' => $this->getName(),
            'price' => $this->getPrice(),
            'type' => $this->getType(),
            'size' => $this->getSpecs()
        ];
    }

    public function validate()
    {
        $fieldsWithError = parent::validateCommon();

        $size = $this->getSize();

        $foundEmptyFields = in_array("Please, submit required data", $fieldsWithError);
        $foundWrongDataFields = in_array("Please, provide the data of indicated type", $fieldsWithError);

        if (trim($size) == "") {
            if (!$foundEmptyFields) {
                return array("Please, submit required data", "size");
            } else {
                array_push($fieldsWithError, "size");
            }
        } elseif (!is_numeric($size)) {
            if (!$foundEmptyFields) {
                if (!$foundWrongDataFields) {
                    return array("Please, provide the data of indicated type", "size");
                } else {
                    array_push($fieldsWithError, "size");
                }
            }
        }

        return $fieldsWithError;
    }
}
