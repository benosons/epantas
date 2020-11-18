<?php
class Model_issue extends CI_Model {

    public function insertIssue($judul,$file,$deskripsi)
    {
        $user = $this->session->userdata('username');
        $data = array(
            'judul' => $judul,
            'deskripsi' => $deskripsi,
            'file' => $file,
            'created_by' => $user
        );
        $this->db->insert('issue',$data);
        $pesan = array('pesan'=>'Berhasil ditambahkan !');
        return $pesan;
    }

    public function loadIssue()
    {
        $data = $this->db->get('issue')->result();
        return $data;
    }
}