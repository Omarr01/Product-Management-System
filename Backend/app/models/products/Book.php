<?php

class Book extends Product implements JsonSerializable
{
    protected $weight;

    public function __construct($formData)
    {
        if (is_array($formData)) {
            $this->sku = $formData["sku"];
            $this->name = $formData["name"];
            $this->price = $formData["price"];
            $this->type = $formData["productType"];
            $this->weight = $formData["weight"];
            $this->specs = $formData["weight"];
        }
    }

    public function getWeight()
    {
        return $this->weight;
    }

    public function jsonSerialize()
    {
        return [
            'pid' => $this->getPid(),
            'SKU' => $this->getSku(),
            'name' => $this->getName(),
            'price' => $this->getPrice(),
            'type' => $this->getType(),
            'weight' => $this->getSpecs()
        ];
    }

    public function validate()
    {
        $fieldsWithError = parent::validateCommon();

        $weight = $this->getWeight();

        $foundEmptyFields = in_array("Please, submit required data", $fieldsWithError);
        $foundWrongDataFields = in_array("Please, provide the data of indicated type", $fieldsWithError);

        if (trim($weight) == "") {
            if (!$foundEmptyFields) {
                return array("Please, submit required data", "weight");
            } else {
                array_push($fieldsWithError, "weight");
            }
        } elseif (!is_numeric($weight)) {
            if (!$foundEmptyFields) {
                if (!$foundWrongDataFields) {
                    return array("Please, provide the data of indicated type", "weight");
                } else {
                    array_push($fieldsWithError, "weight");
                }
            }
        }

        return $fieldsWithError;
    }
}
