<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Upload extends CI_Controller {
	private $filename = "import_data"; // Kita tentukan nama filenya

	public function __construct(){
		parent::__construct();

		$this->load->model('model_bantuan');
		$this->logs = $this->session->all_userdata();
		$this->logged = $this->session->userdata('userLogged');
		$this->kategori = $this->session->userdata('kategori');
		$this->role = $this->session->userdata('role');
		$this->username = $this->session->userdata('username');
		$this->kotaKab = $this->session->userdata('kotaKab');
		$this->name = $this->session->userdata('name');
		$this->foto = $this->session->userdata('foto');
		$this->id 	= $this->session->userdata('id');
		$this->notelp 	= $this->session->userdata('notelp');
		$this->email 	= $this->session->userdata('email');
		$this->content = array(
			"base_url" => base_url(),
			"logs" => $this->session->all_userdata(),
			"username" => $this->username,
			"role" => $this->role,
			"name" => $this->name,
			"foto" => $this->foto,
			"kategori" => $this->kategori,
			"notelp" => $this->notelp,
			"email" => $this->email,
			"id" => $this->id
		);
	}

	public function upload(){

		// $data['siswa'] = $this->SiswaModel->view();
		// $this->load->view('upload', $data);
		$this->twig->display("upload.html", $this->content);
	}

	public function siswa(){

		$data['siswa'] = $this->SiswaModel->view();

		$this->load->view('upload', $data);
		// $this->twig->display("upload.html", $this->content);
	}

	public function getData()
	{
		$bantuan = $this->model_bantuan->getBantuan();
		
		echo json_encode($bantuan);
	}

	public function form(){
		$data = array(); // Buat variabel $data sebagai array
		$nama_file_baru = 'data.xlsx';
		if(is_file('assets/dokumen/excel/'.$nama_file_baru)) // Jika file tersebut ada
			unlink('assets/dokumen/excel/'.$nama_file_baru);
			$ext = pathinfo($_FILES['files']['name'][0], PATHINFO_EXTENSION); // Ambil ekstensi filenya apa
			$tmp_file = $_FILES['files']['tmp_name'][0];

		if($ext == "xlsx"){
			move_uploaded_file($tmp_file, 'assets/dokumen/excel/'.$nama_file_baru);
		}

		if(isset($_POST['preview'])){ // Jika user menekan tombol Preview pada form
			// lakukan upload file dengan memanggil function upload yang ada di SiswaModel.php

			// $upload = $this->SiswaModel->upload_file($this->filename);
			// print_r($upload);die;
			// if($upload['result'] == "success"){ // Jika proses upload sukses
				// Load plugin PHPExcel nya
				include APPPATH.'third_party/PHPExcel/PHPExcel.php';

				$excelreader = new PHPExcel_Reader_Excel2007();
				$loadexcel = $excelreader->load('assets/dokumen/excel/'.$nama_file_baru); // Load file yang tadi diupload ke folder excel
				echo '<pre>';
				// $sheet = $loadexcel->getSheetNames(); //ambil nama sheet
				// $sheet = $loadexcel->getActiveSheet()->toArray(null, true, true ,true);
				// $sheet_1 = $loadexcel->getSheet(0)->toArray(null, true, true ,true); //ambil dengan index

				foreach ($loadexcel->getSheetNames() as $key1 => $value1) {
						$data[$value1] = $loadexcel->getSheet($key1)->toArray(null, true, true ,true);
						foreach ($data[$value1] as $key2 => $value2) {
							// code...
							if($key2 >= 7){
								if($value2['A']){
									$ids;
									if(!is_numeric($value2['A'])){
										$explode = explode(". ",$value2['A']);

										$id = $explode[0];
										$name = $explode[1];
										$datakab = [
													'jenis_bantuan' => $value1,
													'id_kabupaten' => $id,
													'nama_kabupaten' => $name
												];

										$insert = $this->SiswaModel->insert_data('bantuan_kabupaten', $datakab);
										if($insert){
											$ids = $id;
										}
									}else{
										$data = [
														'jenis_bantuan' => $value1,
														'id_kabupaten' => $ids,
														'no' => $value2['A'],
														'kelompok_tani' => $value['B'],
														'kecamatan' => $value2['C'],
														'desa' => $value2['D'],
														'nama' => $value2['E'],
														'nik' => $value2['F'],
														'no_hp' => $value2['G'],
														'jml_anggota' => $value2['H'],
														'luas' => $value2['I'],
														'jenis_lahan' => $value2['J'],
														'benih' => $value2['K'],
														'varietas' => $value2['L'],
														'pupuk' => $value2['M'],
														'rhizobium' => $value2['N'],
														'herbisida' => $value2['O'],
														'jadwal' => $value2['P'],
														'provitas_existing' => $value2['Q'],
														'provitas_target' => $value2['R'],
														'create_date' => date("Y-m-d H:i:s"),
														'update_date' => date("Y-m-d H:i:s"),
														'create_by' => ''
										];
										$insert = $this->SiswaModel->insert_data('bantuan', $data);
									}
								}
							}
						}
				}

				// Masukan variabel $sheet ke dalam array data yang nantinya akan di kirim ke file form.php
				// Variabel $sheet tersebut berisi data-data yang sudah diinput di dalam excel yang sudha di upload sebelumnya


			// }else{ // Jika proses upload gagal
			// 	$data['upload_error'] = $upload['error']; // Ambil pesan error uploadnya untuk dikirim ke file form dan ditampilkan
			// }
		}

		redirect("upload");
	}

	public function import(){
		// Load plugin PHPExcel nya
		include APPPATH.'third_party/PHPExcel/PHPExcel.php';

		$excelreader = new PHPExcel_Reader_Excel2007();
		$loadexcel = $excelreader->load('excel/'.$this->filename.'.xlsx'); // Load file yang telah diupload ke folder excel
		$sheet = $loadexcel->getActiveSheet()->toArray(null, true, true ,true);

		// Buat sebuah variabel array untuk menampung array data yg akan kita insert ke database
		$data = array();

		$numrow = 1;
		foreach($sheet as $row){
			// Cek $numrow apakah lebih dari 1
			// Artinya karena baris pertama adalah nama-nama kolom
			// Jadi dilewat saja, tidak usah diimport
			if($numrow > 1){
				// Kita push (add) array data ke variabel data
				array_push($data, array(
					'nis'=>$row['A'], // Insert data nis dari kolom A di excel
					'nama'=>$row['B'], // Insert data nama dari kolom B di excel
					'jenis_kelamin'=>$row['C'], // Insert data jenis kelamin dari kolom C di excel
					'alamat'=>$row['D'], // Insert data alamat dari kolom D di excel
				));
			}

			$numrow++; // Tambah 1 setiap kali looping
		}

		// Panggil fungsi insert_multiple yg telah kita buat sebelumnya di model
		$this->SiswaModel->insert_multiple($data);

		redirect("Siswa"); // Redirect ke halaman awal (ke controller siswa fungsi index)
	}
}
