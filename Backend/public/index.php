<?php

include("../includes/core.php");
include("../includes/autoloader.php");

switch($_SERVER['QUERY_STRING']) {
    case '/productlist':
        $controller = new ProductListingController();
        $controller->listAllProducts();
        break;
    case '/productadd':
        $controller = new ProductAdditionController();
        $controller->addProduct();
        break;
    case '/productdelete':
        $controller = new ProductDeletionController();
        $controller->deleteProducts();
        break;
    default:break;
}
