<?php

namespace Model;

use DB\DBModel;

class Test extends DBModel
{

    public function getColumnNames()
    {
        return ['test_id', 'name', 'lol'];
    }
    
}