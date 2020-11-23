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
        }
        return $this->db->get()->result();
    }

    public function insert_data($table, $data){

		$this->db->set($data);
		$valid = $this->db->insert($table);
		$val = true;
		return $val;
	}

  public function deletedata($params)
  {
      // $idx = $this->db->escape_str($id);
      $this->db->where('bulan', $params->bulan);
      $this->db->where('tahun', $params->tahun);
      $this->db->delete($params->table);
  }

}
