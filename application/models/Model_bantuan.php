<?php 
class Model_bantuan extends CI_Model {
    function __construct(){
        parent::__construct();
    }
    public function getBantuan()
    {
        $this->db->select("*");
        $this->db->from("bantuan");
        $this->db->join("bantuan_kabupaten",'bantuan_kabupaten.id_kabupaten = bantuan.id_kabupaten');
        return $this->db->get()->result();
    }
}