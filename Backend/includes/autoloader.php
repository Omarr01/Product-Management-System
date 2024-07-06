<?php

function custom_autoloader($class)
{
    $directories = array(
        'app/controllers/',
        'app/models/',
        'app/models/products/',
        'app/views/',
        'config/'
    );

    foreach ($directories as $directory) {
        $file =  __DIR__ . '/../' . $directory . $class . '.php';
        if (file_exists($file)) {
            require_once $file;
            break;
        }
    }
}

spl_autoload_register('custom_autoloader');
