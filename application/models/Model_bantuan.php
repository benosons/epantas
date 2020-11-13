<?php 
class Model_bantuan extends CI_Model {
    
    private function getBantuan()
    {
        // $this->db->select("*");
        // $this->db->from("bantuan");
        // $this->db->join("bantuan_kabupaten",'bantuan_kabupaten.id = bantuan.id_kabupaten');
        return $this->db->get('bantuan')->result();
    }
}