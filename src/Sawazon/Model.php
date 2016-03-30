<?php

namespace Sawazon;

abstract class Model implements \Serializable
{
    /** @var  number */
    protected $primary_key;

    /**
     * @param number $primary_key
     * @return Model
     */
    public abstract function load($primary_key);

    /**
     * @return array
     */
    public abstract function loadAll();

    public abstract function save();

    public abstract function delete();

    /**
     * @param Model $model
     * @return bool
     */
    public function equals(Model $model)
    {
        if (get_class($this) != get_class($model)) return false;
        return $this->primary_key == $model->primary_key;
    }

    /**
     * @return number
     */
    public function getPrimaryKey()
    {
        return $this->primary_key;
    }
}