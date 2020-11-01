<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Pangan extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */

	public function __construct()
	{
		parent::__construct();
		$this->load->model('Model_pangan');
		$this->logs = $this->session->all_userdata();
		$this->logged = $this->session->userdata('userLogged');
		$this->kategori = $this->session->userdata('kategori');
		$this->username = $this->session->userdata('username');
		$this->role = $this->session->userdata('role');
		$this->kotaKab = $this->session->userdata('kotaKab');
		$this->name = $this->session->userdata('name');
		$this->foto = $this->session->userdata('foto');
		$this->content = array(
			"base_url" => base_url(),
			"logs" => $this->session->all_userdata(),
			"username" => $this->username,
			"role" => $this->role,
			"name" => $this->name,
			"foto" => $this->foto,
			"kotakab" => $this->kotaKab
		);

	}

	public function listPangan()
	{
		if ( $this->logged && $this->role == '10' || $this->role == '20')
		{
			$this->twig->display('admin/pangan/listpangan.html', $this->content);
		}else{
			redirect("dashboard");
		}
	}

	public function addpangan()
	{
		if ( $this->logged && $this->role == '10' || $this->role == '20')
		{

			$this->twig->display('admin/pangan/addpangan.html', $this->content);
		}else{
			redirect("dashboard");
		}
	}

	public function formPangan()
	{
		if ( $this->logged && $this->role == '10' || $this->role == '20')
		{

			$data = NULL;
			$id = $this->input->get('id');
			$idx = $this->db->escape_str($id);
            $KodeEdit = $idx;
            if (!empty($KodeEdit)) {
                $q = $this->db->get_where("pangan", array("id" => $KodeEdit));
                $data = $q->row();
            }

            $this->content['data'] = $data;
			$this->twig->display('admin/pangan.html', $this->content);
		}else{
			redirect("dashboard");
		}
	}

	public function savePangan()
	{
		if ( $this->logged && $this->role == '10' || $this->role == '20')
		{
			$params = (object)$this->input->post();
			$data = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $params->img));

			$filepath = "assets/dokumen/gambar/pangan/".$params->nama_file; // or image.jpg
			chmod($filepath,0777);
			file_put_contents($filepath,$data);
			$params->foto = $filepath;

 	        $data = $this->Model_pangan->savepangan($params);
 	        echo json_encode(array("status" => TRUE));
		}
		else
		{
			redirect("dashboard");
		}
	}


	public function updatePangan()
	{
		if ( $this->logged && $this->role == '10' || $this->role == '20')
		{
			$params = (object)$this->input->post();
		 	$data = $this->Model_pangan->update($params);
		 	echo json_encode(array("status" => TRUE));
		}
		else
		{
			redirect("dashboard");
		}
	}

	public function deletePangan($id = NULL)
	{
		$this->Model_pangan->delete($id);
		echo json_encode(array("status" => TRUE));
	}

	public function listDataPangan()
	{
		if ($this->logged && $this->role == '10' || $this->role == '20')
		{
			$params = $columns = $totalRecords = $data = array();
			$params = $_REQUEST;
			$query = $this->Model_pangan->listDataPangan();
			$x = 0;
			$i=0;
			foreach ($query as $proses) {
				$x++;
				$row = array();
				$row[] = (!empty($proses->nama) ? $proses->nama : "NULL");
				$row[] = (!empty($proses->tgl) ? $proses->tgl : "NULL");
				$row[] = (!empty($proses->jenisPangan) ? $proses->jenisPangan : "NULL");
				$row[] = (!empty($proses->created_by) ? $proses->created_by : "NULL");

				// if ($this->kategori == 'superAdmin') {
					$row[] = '<a href="'.base_url().'formPangan/?id='.$proses->id.'" class="btn btn-sm btn-info" title="Edit" id="Edit"><i class="fa fa-edit"></i> Edit </a> <a class="btn btn-sm btn-danger" href="javascript:void(0)" title="Hapus" onclick="deleteData('."'".$proses->id."'".')"><i class="fa fa-trash"></i> Delete</a> ';
				// }else{
				// 	$row[] = '<a href="javascript:void(0)" class="btn btn-sm btn-success" title="Hasil" onclick="view('."'".$proses->id."'".')" id="view"><i class="fa fa-eye"></i> View </a> <a class="btn btn-sm btn-danger" href="javascript:void(0)" title="Hapus" onclick="deleteData('."'".$proses->id."'".')"><i class="fa fa-trash"></i> Delete</a> ';
				// }



				//add html for action
				$data[] = $row;
			}

                $output = array(
    			                "draw" => $_POST['draw'],
                                "recordsTotal" => $this->Model_pangan->count_all(),
                                "recordsFiltered" => $this->Model_pangan->count_filtered(),
    	                         "data" => $data
    	                         );
			//output to json format
			echo json_encode($output);
		}else{
			redirect("dashboard");
		}


	}

	public function dataDetailPangan()
	{
		if ($this->logged && $this->role == '10' || $this->role == '20')
		{
			$no = $_POST['no'];
			$data = $this->Model_pangan->dataDetail($no);
			echo json_encode($data);
		}
		else
		{
			redirect("dashboard");
		}
	}

	public function loadparam()	{

			// $params = $columns = $totalRecords = $data = array();
			// $params = $_REQUEST;
			$param = $this->input->post('param');
			$id = $this->input->post('id');

			$query = $this->Model_pangan->loadparam($param, $id);

	header('Content-Type: application/json');
	echo json_encode($query);
}

	public function loadpangan()	{

			// $params = $columns = $totalRecords = $data = array();
			// $params = $_REQUEST;

			$query = $this->Model_pangan->loadpangan();

	header('Content-Type: application/json');
	echo json_encode($query);
}

}
