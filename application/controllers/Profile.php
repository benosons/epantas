<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Profile extends CI_Controller {

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
		$this->load->model('Model_profile');
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
			"foto" => $this->foto
		);

	}

	public function provinsi()
	{
		if ( $this->logged && $this->role == '10' || $this->role == '20')
		{
			$this->twig->display('admin/profile/dataProvinsi.html', $this->content);
		}else{
			redirect("dashboard");
		}
	}

	public function kabupaten()
	{
		if ( $this->logged && $this->role == '10' || $this->role == '20')
		{
			$this->twig->display('admin/profile/dataKabupaten.html', $this->content);
		}else{
			redirect("dashboard");
		}
	}

	public function kecamatan()
	{
		if ( $this->logged && $this->role == '10' || $this->role == '20')
		{
			$this->twig->display('admin/profile/dataKecamatan.html', $this->content);
		}else{
			redirect("dashboard");
		}
	}

	public function gapoktan()
	{
		if ( $this->logged && $this->role == '10' || $this->role == '20')
		{
			$this->twig->display('admin/profile/dataGapoktan.html', $this->content);
		}else{
			redirect("dashboard");
		}
	}

	public function addprov()
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
			$this->twig->display('admin/profile/addprovinsidata.html', $this->content);
		}else{
			redirect("dashboard");
		}
	}

	public function addkab()
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
			$this->twig->display('admin/profile/addkabupatendata.html', $this->content);
		}else{
			redirect("dashboard");
		}
	}

	public function addkec()
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
			$this->twig->display('admin/profile/addkecamatandata.html', $this->content);
		}else{
			redirect("dashboard");
		}
	}

	public function addpoktan()
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
			$this->twig->display('admin/profile/addpoktandata.html', $this->content);
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

	public function savedataprovinsi()
	{
		if ( $this->logged && $this->role == '10' || $this->role == '20')
		{
					$params = (object)$this->input->post();

					$data = $this->Model_profile->save_provinsi($params);
					header('Content-Type: application/json');
					echo json_encode(array("status" => TRUE));
		}
		else
		{
			redirect("dashboard");
		}
	}

	public function savedatakabupaten()
	{
		if ( $this->logged && $this->role == '10' || $this->role == '20')
		{
					$params = (object)$this->input->post();

					$data = $this->Model_profile->save_kabupaten($params);
					header('Content-Type: application/json');
					echo json_encode(array("status" => TRUE));
		}
		else
		{
			redirect("dashboard");
		}
	}

	public function savedatakecamatan()
	{
		if ( $this->logged && $this->role == '10' || $this->role == '20')
		{
					$params = (object)$this->input->post();

					$data = $this->Model_profile->save_kecamatan($params);
					header('Content-Type: application/json');
					echo json_encode(array("status" => TRUE));
		}
		else
		{
			redirect("dashboard");
		}
	}

	public function savedatapoktan()
	{
		if ( $this->logged && $this->role == '10' || $this->role == '20')
		{
					$params = (object)$this->input->post();

					$data = $this->Model_profile->save_poktan($params);
					header('Content-Type: application/json');
					echo json_encode(array("status" => TRUE));
		}
		else
		{
			redirect("dashboard");
		}
	}

	public function savekelompoktani()
	{
		if ( $this->logged && $this->role == '10' || $this->role == '20')
		{
					$params = (object)$this->input->post();

					$data = $this->Model_profile->savekelompoktani($params);
					header('Content-Type: application/json');
					echo json_encode(array("status" => TRUE));
		}
		else
		{
			redirect("dashboard");
		}
	}

	public function saveanggota()
	{
		if ( $this->logged && $this->role == '10' || $this->role == '20')
		{
					$params = (object)$this->input->post();

					$data = $this->Model_profile->saveanggota($params);
					header('Content-Type: application/json');
					echo json_encode(array("status" => TRUE));
		}
		else
		{
			redirect("dashboard");
		}
	}

	public function savepejabat()
	{
		if ( $this->logged && $this->role == '10' || $this->role == '20')
		{
					$params = (object)$this->input->post();

					$data = $this->Model_profile->savepejabat($params);
					header('Content-Type: application/json');
					echo json_encode(array("status" => TRUE));
		}
		else
		{
			redirect("dashboard");
		}
	}

	public function savepenyuluh()
	{
		if ( $this->logged && $this->role == '10' || $this->role == '20')
		{
					$params = (object)$this->input->post();

					$data = $this->Model_profile->savepenyuluh($params);
					header('Content-Type: application/json');
					echo json_encode(array("status" => TRUE));
		}
		else
		{
			redirect("dashboard");
		}
	}


	public function updatePangan()
	{
		if ( $this->logged && $this->kategori == 'admin' || $this->kategori == 'superAdmin')
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
		if ($this->logged && $this->kategori == 'admin' || $this->kategori == 'superAdmin')
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

	public function loadprovinsi()	{

			// $params = $columns = $totalRecords = $data = array();
			// $params = $_REQUEST;
			// $postData = $this->input->post('param');

			$query = $this->Model_profile->loadprovinsi();
			// foreach ($query as $key => $value) {
			// 	print_r($value);die;
			// }
			// foreach ($query as $proses) {
			// 	$x++;
			// 	$row = array();
			// 	$row['id'] = (!empty($proses->id) ? $proses->id : "NULL");
			// 	$row['name'] = (!empty($proses->name) ? $proses->name : "NULL");
			// 	$row['id_user'] = (!empty($proses->id_user) ? $proses->id_user : "NULL");
			// 	$row['judul'] = (!empty($proses->judul) ? $proses->judul : "NULL");
			// 	$row['isi'] = (!empty($proses->isi) ? $proses->isi : "NULL");
			// 	$row['create_date'] = (!empty($proses->create_date) ? $proses->create_date : "NULL");
			//
			//
			// }

	header('Content-Type: application/json');
	echo json_encode($query);
}

	public function loadkabupaten()	{

			// $params = $columns = $totalRecords = $data = array();
			// $params = $_REQUEST;
			// $postData = $this->input->post('param');

			$query = $this->Model_profile->loadkabupaten();
			// foreach ($query as $key => $value) {
			// 	print_r($value);die;
			// }
			// foreach ($query as $proses) {
			// 	$x++;
			// 	$row = array();
			// 	$row['id'] = (!empty($proses->id) ? $proses->id : "NULL");
			// 	$row['name'] = (!empty($proses->name) ? $proses->name : "NULL");
			// 	$row['id_user'] = (!empty($proses->id_user) ? $proses->id_user : "NULL");
			// 	$row['judul'] = (!empty($proses->judul) ? $proses->judul : "NULL");
			// 	$row['isi'] = (!empty($proses->isi) ? $proses->isi : "NULL");
			// 	$row['create_date'] = (!empty($proses->create_date) ? $proses->create_date : "NULL");
			//
			//
			// }

	header('Content-Type: application/json');
	echo json_encode($query);
}

	public function loadkecamatan()	{

			// $params = $columns = $totalRecords = $data = array();
			// $params = $_REQUEST;
			// $postData = $this->input->post('param');

			$query = $this->Model_profile->loadkecamatan();
			// foreach ($query as $key => $value) {
			// 	print_r($value);die;
			// }
			// foreach ($query as $proses) {
			// 	$x++;
			// 	$row = array();
			// 	$row['id'] = (!empty($proses->id) ? $proses->id : "NULL");
			// 	$row['name'] = (!empty($proses->name) ? $proses->name : "NULL");
			// 	$row['id_user'] = (!empty($proses->id_user) ? $proses->id_user : "NULL");
			// 	$row['judul'] = (!empty($proses->judul) ? $proses->judul : "NULL");
			// 	$row['isi'] = (!empty($proses->isi) ? $proses->isi : "NULL");
			// 	$row['create_date'] = (!empty($proses->create_date) ? $proses->create_date : "NULL");
			//
			//
			// }

	header('Content-Type: application/json');
	echo json_encode($query);
}

	public function loadpoktan()	{

			// $params = $columns = $totalRecords = $data = array();
			// $params = $_REQUEST;
			// $postData = $this->input->post('param');

			$query = $this->Model_profile->loadpoktan();
			// foreach ($query as $key => $value) {
			// 	print_r($value);die;
			// }
			// foreach ($query as $proses) {
			// 	$x++;
			// 	$row = array();
			// 	$row['id'] = (!empty($proses->id) ? $proses->id : "NULL");
			// 	$row['name'] = (!empty($proses->name) ? $proses->name : "NULL");
			// 	$row['id_user'] = (!empty($proses->id_user) ? $proses->id_user : "NULL");
			// 	$row['judul'] = (!empty($proses->judul) ? $proses->judul : "NULL");
			// 	$row['isi'] = (!empty($proses->isi) ? $proses->isi : "NULL");
			// 	$row['create_date'] = (!empty($proses->create_date) ? $proses->create_date : "NULL");
			//
			//
			// }

	header('Content-Type: application/json');
	echo json_encode($query);
}

	public function loadkelompok()	{

			// $params = $columns = $totalRecords = $data = array();
			// $params = $_REQUEST;
			// $postData = $this->input->post('param');

			$query = $this->Model_profile->loadkelompok();
			// foreach ($query as $key => $value) {
			// 	print_r($value);die;
			// }
			// foreach ($query as $proses) {
			// 	$x++;
			// 	$row = array();
			// 	$row['id'] = (!empty($proses->id) ? $proses->id : "NULL");
			// 	$row['name'] = (!empty($proses->name) ? $proses->name : "NULL");
			// 	$row['id_user'] = (!empty($proses->id_user) ? $proses->id_user : "NULL");
			// 	$row['judul'] = (!empty($proses->judul) ? $proses->judul : "NULL");
			// 	$row['isi'] = (!empty($proses->isi) ? $proses->isi : "NULL");
			// 	$row['create_date'] = (!empty($proses->create_date) ? $proses->create_date : "NULL");
			//
			//
			// }

	header('Content-Type: application/json');
	echo json_encode($query);
}

	public function loadanggota()	{

			$params = $columns = $totalRecords = $data = array();
			$params = $_REQUEST;
			$postData = $this->input->post('id');

			$query = $this->Model_profile->loadanggota($postData);
			// foreach ($query as $key => $value) {
			// 	print_r($value);die;
			// }
			// foreach ($query as $proses) {
			// 	$x++;
			// 	$row = array();
			// 	$row['id'] = (!empty($proses->id) ? $proses->id : "NULL");
			// 	$row['name'] = (!empty($proses->name) ? $proses->name : "NULL");
			// 	$row['id_user'] = (!empty($proses->id_user) ? $proses->id_user : "NULL");
			// 	$row['judul'] = (!empty($proses->judul) ? $proses->judul : "NULL");
			// 	$row['isi'] = (!empty($proses->isi) ? $proses->isi : "NULL");
			// 	$row['create_date'] = (!empty($proses->create_date) ? $proses->create_date : "NULL");
			//
			//
			// }

	header('Content-Type: application/json');
	echo json_encode($query);
}

	public function loadpejabat()	{

			$params = $columns = $totalRecords = $data = array();
			$params = $_REQUEST;
			$postData = $this->input->post('id');

			$query = $this->Model_profile->loadpejabat($postData);
			// foreach ($query as $key => $value) {
			// 	print_r($value);die;
			// }
			// foreach ($query as $proses) {
			// 	$x++;
			// 	$row = array();
			// 	$row['id'] = (!empty($proses->id) ? $proses->id : "NULL");
			// 	$row['name'] = (!empty($proses->name) ? $proses->name : "NULL");
			// 	$row['id_user'] = (!empty($proses->id_user) ? $proses->id_user : "NULL");
			// 	$row['judul'] = (!empty($proses->judul) ? $proses->judul : "NULL");
			// 	$row['isi'] = (!empty($proses->isi) ? $proses->isi : "NULL");
			// 	$row['create_date'] = (!empty($proses->create_date) ? $proses->create_date : "NULL");
			//
			//
			// }

	header('Content-Type: application/json');
	echo json_encode($query);
}

	public function loadpenyuluh()	{

			$params = $columns = $totalRecords = $data = array();
			$params = $_REQUEST;
			$postData = $this->input->post('id');

			$query = $this->Model_profile->loadpenyuluh($postData);
			// foreach ($query as $key => $value) {
			// 	print_r($value);die;
			// }
			// foreach ($query as $proses) {
			// 	$x++;
			// 	$row = array();
			// 	$row['id'] = (!empty($proses->id) ? $proses->id : "NULL");
			// 	$row['name'] = (!empty($proses->name) ? $proses->name : "NULL");
			// 	$row['id_user'] = (!empty($proses->id_user) ? $proses->id_user : "NULL");
			// 	$row['judul'] = (!empty($proses->judul) ? $proses->judul : "NULL");
			// 	$row['isi'] = (!empty($proses->isi) ? $proses->isi : "NULL");
			// 	$row['create_date'] = (!empty($proses->create_date) ? $proses->create_date : "NULL");
			//
			//
			// }

	header('Content-Type: application/json');
	echo json_encode($query);
}

}
