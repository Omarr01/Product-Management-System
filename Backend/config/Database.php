<?php

class Database
{
    protected $host = 'localhost';
    protected $user = 'root';
    protected $pass = '';
    protected $dbName = 'scanditest';

    // protected $host = 'localhost';
    // protected $user = 'id20207160_omar';
    // protected $pass = 'vx8pSq9+dQ8b!uhg';
    // protected $dbName = 'id20207160_scandiwebtest';

    public function connectToDatabase()
    {
        $connect = mysqli_connect($this->host, $this->user, $this->pass, $this->dbName);
        if (!$connect) {
            die('Connection Failed');
        }
        return $connect;
    }
}
