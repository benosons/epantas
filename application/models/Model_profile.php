<?php
class Model_profile extends CI_Model {

    var $table = 'data_provinsi';
    var $column = array('nama','tgl','jenisPangan'); //set column field database for datatable searchable just firstname , lastname , address are searchable
    var $column_search = array('nama','tgl','jenisPangan');
    var $order = array('id' => 'desc'); // default order

    function __construct(){
        parent::__construct();
    }


    // server side

    private function _get_datatables_query()
    {
        $kat = $this->session->userdata('kategori');
        $nama = $this->session->userdata('username');
        $id = $this->db->escape_str($nama);
        if ($kat == 'superAdmin') {
            $this->db->from('pangan');
        }else{
            $this->db->from('pangan');
            $this->db->where('created_by',$nama);
        }


        $i = 0;

        foreach ($this->column as $item) // loop column
    {
         if($_POST['search']['value']) // if datatable send POST for search
         {

            if($i===0) // first loop
            {
               $this->db->group_start(); // open bracket. query Where with OR clause better with bracket. because maybe can combine with other WHERE with AND.
               $this->db->like($item, $_POST['search']['value']);
            }
            else
            {
               $this->db->or_like($item, $_POST['search']['value']);
            }

            if(count($this->column) - 1 == $i) //last loop
               $this->db->group_end(); //close bracket
         }
         $column[$i] = $item; // set column array variable to order processing
         $i++;
    }

        if(isset($_POST['order'])) // here order processing
        {
            $this->db->order_by($column[$_POST['order']['0']['column']], $_POST['order']['0']['dir']);
        }
        else if(isset($this->order))
        {
            $order = $this->order;
            $this->db->order_by(key($order), $order[key($order)]);
        }
    }

    function get_datatables()
    {
        $this->_get_datatables_query();
        if($_POST['length'] != -1)
        $this->db->limit($_POST['length'], $_POST['start']);
        $query = $this->db->get();
        return $query->result();
    }

    function count_filtered()
    {
        $this->_get_datatables_query();
        $query = $this->db->get();
        return $query->num_rows();
    }

    public function count_all()
    {
        $this->db->from($this->table);
        return $this->db->count_all_results();
    }


    public function listDataPangan()
    {
        $nama = $this->session->userdata('username');
        $kategori = $this->session->userdata('kategori');
        $id = $this->db->escape_str($nama);
        if ($kategori == 'superAdmin') {
            $query = $this->db->query("select * from pangan order by id desc")->result();
        }else{
            $query = $this->db->query("select * from pangan where created_by = '".$id."' order by id desc")->result();
        }


        return $query;
    }


    public function save_provinsi($params = NULL)
    {
            $valid = true;

            $this->db->set($params);
            // $this->db->set("tgl", $params->tgl);
            // $this->db->set("jenisPangan", $params->jenisPangan);
            // $this->db->set("created_by", $this->session->userdata('username'));
            // $this->db->set("create_date", date("Y-m-d H:i:s"));
            // $this->db->set("update_date", date("Y-m-d H:i:s"));
            $valid = $this->db->insert('data_provinsi');

        return $valid;

    }

    public function save_kabupaten($params = NULL)
    {
            $valid = true;

            $this->db->set($params);
            // $this->db->set("tgl", $params->tgl);
            // $this->db->set("jenisPangan", $params->jenisPangan);
            // $this->db->set("created_by", $this->session->userdata('username'));
            // $this->db->set("create_date", date("Y-m-d H:i:s"));
            // $this->db->set("update_date", date("Y-m-d H:i:s"));
            $valid = $this->db->insert('data_kabupaten');

        return $valid;

    }

    public function save_kecamatan($params = NULL)
    {
            $valid = true;

            $this->db->set($params);
            // $this->db->set("tgl", $params->tgl);
            // $this->db->set("jenisPangan", $params->jenisPangan);
            // $this->db->set("created_by", $this->session->userdata('username'));
            // $this->db->set("create_date", date("Y-m-d H:i:s"));
            // $this->db->set("update_date", date("Y-m-d H:i:s"));
            $valid = $this->db->insert('data_kecamatan');

        return $valid;

    }

    public function save_poktan($params = NULL)
    {
            $valid = true;

            $this->db->set($params);
            // $this->db->set("tgl", $params->tgl);
            // $this->db->set("jenisPangan", $params->jenisPangan);
            // $this->db->set("created_by", $this->session->userdata('username'));
            // $this->db->set("create_date", date("Y-m-d H:i:s"));
            // $this->db->set("update_date", date("Y-m-d H:i:s"));
            $valid = $this->db->insert('data_poktan');

        return $valid;

    }

    public function savekelompoktani($params = NULL)
    {
            $valid = true;

            $this->db->set($params);
            // $this->db->set("tgl", $params->tgl);
            // $this->db->set("jenisPangan", $params->jenisPangan);
            // $this->db->set("created_by", $this->session->userdata('username'));
            // $this->db->set("create_date", date("Y-m-d H:i:s"));
            // $this->db->set("update_date", date("Y-m-d H:i:s"));
            $valid = $this->db->insert('kelompok_tani');

        return $valid;

    }

    public function saveanggota($params = NULL)
    {
            $valid = true;

            $this->db->set($params);

            // $this->db->set("tgl", $params->tgl);
            // $this->db->set("jenisPangan", $params->jenisPangan);
            // $this->db->set("created_by", $this->session->userdata('username'));
            // $this->db->set("create_date", date("Y-m-d H:i:s"));
            // $this->db->set("update_date", date("Y-m-d H:i:s"));
            $valid = $this->db->insert('anggota_kelompok');

        return $valid;

    }

    public function savepejabat($params = NULL)
    {
            $valid = true;

            $this->db->set($params);

            // $this->db->set("tgl", $params->tgl);
            // $this->db->set("jenisPangan", $params->jenisPangan);
            // $this->db->set("created_by", $this->session->userdata('username'));
            // $this->db->set("create_date", date("Y-m-d H:i:s"));
            // $this->db->set("update_date", date("Y-m-d H:i:s"));
            $valid = $this->db->insert('pejabat_pengelola');

        return $valid;

    }

    public function savepenyuluh($params = NULL)
    {
            $valid = true;

            $this->db->set($params);

            // $this->db->set("tgl", $params->tgl);
            // $this->db->set("jenisPangan", $params->jenisPangan);
            // $this->db->set("created_by", $this->session->userdata('username'));
            // $this->db->set("create_date", date("Y-m-d H:i:s"));
            // $this->db->set("update_date", date("Y-m-d H:i:s"));
            $valid = $this->db->insert('penyuluh_pendamping');

        return $valid;

    }

    public function loadprovinsi()
    {
        $query = $this->db->query("select *, (select jabatan.deskripsi from jabatan where id = pep.jabatan) as deskripsi_jabatan from data_provinsi dprov
        join pejabat_pengelola pep on pep.id = dprov.nama_pejabat order by dprov.id desc")->result();
        return $query;
    }

    public function loadkabupaten()
    {
        $query = $this->db->query("select *, (select jabatan.deskripsi from jabatan where id = pep.jabatan) as deskripsi_jabatan from data_kabupaten dkab
        join pejabat_pengelola pep on pep.id = dkab.nama_pejabat order by dkab.id desc")->result();
        return $query;
    }

    public function loadkecamatan()
    {
        $query = $this->db->query("select *, (select nama from status_penyuluh where id = pen.status_penyuluh) as deskripsi_status_penyuluh from data_kecamatan dkec
        join penyuluh_pendamping pen on pen.id = dkec.penyuluh order by dkec.id desc")->result();
        return $query;
    }

    public function loadpoktan()
    {
        $query = $this->db->query("select dpok.*, ktan.*, (select status_milik_lahan.nama from status_milik_lahan where id = dpok.status_lahan) as deskripsi_status_lahan from data_poktan dpok
        join kelompok_tani ktan on dpok.id_kelompok = ktan.id order by dpok.id desc")->result();
        return $query;
    }

    public function loadkelompok()
    {
        $query = $this->db->query("select *, (select count(*) from anggota_kelompok where id_kelompok = kelompok_tani.id) as total from kelompok_tani order by id desc")->result();
        return $query;
    }

    public function loadanggota($id = null)
    {

        $query = $this->db->query("select * from anggota_kelompok where id_kelompok = $id order by id desc")->result();
        return $query;
    }

    public function loadpejabat($id = null)
    {

        $query = $this->db->query("select *, (select nama from jabatan where id = pejabat_pengelola.jabatan) as deskripsi_jabatan from pejabat_pengelola order by id desc")->result();
        return $query;
    }

    public function loadpenyuluh($id = null)
    {

        $query = $this->db->query("select *, (select nama from status_penyuluh where id = penyuluh_pendamping.status_penyuluh) as deskripsi_status_penyuluh from penyuluh_pendamping order by id desc")->result();
        return $query;
    }

    public function update($params = NULL)
    {
        $valid = false;

            $this->db->set("nama", $params->nama);
            $this->db->set("tgl", $params->tgl);
            $this->db->set("jenisPangan", $params->jenisPangan);
            $this->db->set("updated_by", $this->session->userdata('username'));
            $this->db->set("updated_at", date("Y-m-d H:i:s"));
            $this->db->where('id', $params->id);
            $valid = $this->db->update('pangan');

        return $valid;

    }

    public function delete($id)
    {
        $ids = $this->db->escape_str($id);
        $this->db->where('id', $ids);
        $this->db->delete('pangan');
    }



    public function cek($kd)
    {
        $query = $this->db->query("select * FROM pangan WHERE id = '".$this->db->escape_like_str($kd)."' ");

        return $query;
    }


}
