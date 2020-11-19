<?php
class Model_bantuan extends CI_Model {
    function __construct(){
        parent::__construct();
    }

    public function getBantuan($param = null)
    {
        if($param == 'laporan'){
          $this->db->select("*");
          $this->db->from("laporan_bulanan_kegiatan");
        }else if($param == 'rekap'){
          $this->db->select("*");
          $this->db->from("rekap_perkab");
        }else{
          $this->db->select("*");
          $this->db->from("bantuan");
          $this->db->join("bantuan_kabupaten",'bantuan_kabupaten.id_kabupaten = bantuan.id_kabupaten', 'left');
        }
        return $this->db->get()->result();
    }

    public function insert_data($table, $data){

		$this->db->set($data);
		$valid = $this->db->insert($table);
		$val = true;
		return $val;
	}

}
