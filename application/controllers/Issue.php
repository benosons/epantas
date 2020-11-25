<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Issue extends CI_Controller {

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
		$this->load->model('Model_issue');
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

    public function listIssue()
	{
		if ( $this->logged && $this->role == '10' || $this->role == '20')
		{
			$this->twig->display('admin/issue/issue.html', $this->content);
		}else{
			redirect("dashboard");
		}
	}

	public function addIssue()
	{
		if ( $this->logged && $this->role == '10' || $this->role == '20')
		{
			$this->twig->display('admin/issue/addIssue.html', $this->content);
		}else{
			redirect("dashboard");
		}
	}

	public function loadIssue()
	{
		$issue = $this->Model_issue->loadIssue();
		echo json_encode($issue);
	}

	public function createIssue()
	{
		if (isset($_FILES['file']['name'])) {
			$config['upload_path']="./assets/img/issue/";
			$config['allowed_types']='gif|jpg|png|jpeg';
			$config['encrypt_name'] = TRUE;

			$this->load->library('upload',$config);
			if($this->upload->do_upload("file")){
				$judul = $this->input->post('judul');
				$deskripsi = $this->input->post('deskripsi');
				$data = $this->upload->data();
				$file = "assets/img/issue/".$data['file_name'];

				$query = $this->Model_issue->insertIssue($judul,$file,$deskripsi);
				echo json_encode($query);
			}else{
				echo $this->upload->display_errors();
			}
		}
	}

	public function detailissue()
	{
				$this->content['ids'] = $this->input->get('ids');
				$this->content['param'] = $this->input->get('par');
				$this->twig->display('users/detailissue.html', $this->content);


	}


}
