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

	public function bantuan()
	{
		if ( $this->logged && $this->role == '10' || $this->role == '20')
		{
			$this->twig->display('admin/upload/bantuan.html', $this->content);
		}else{
			redirect("dashboard");
		}
	}

	public function laporan()
	{
		if ( $this->logged && $this->role == '10' || $this->role == '20')
		{
			$this->twig->display('admin/upload/laporan-kegiatan.html', $this->content);
		}else{
			redirect("dashboard");
		}
	}

	public function rekap()
	{
		if ( $this->logged && $this->role == '10' || $this->role == '20')
		{
			$this->twig->display('admin/upload/rekap.html', $this->content);
		}else{
			redirect("dashboard");
		}
	}

	public function uph()
	{
		if ( $this->logged && $this->role == '10' || $this->role == '20')
		{
			$this->twig->display('admin/upload/uph.html', $this->content);
		}else{
			redirect("dashboard");
		}
	}

	public function uph_skoring()
	{
		if ( $this->logged && $this->role == '10' || $this->role == '20')
		{
			$this->twig->display('admin/upload/uph_skoring.html', $this->content);
		}else{
			redirect("dashboard");
		}
	}

	public function uph_evaluasi_sarana()
	{
		if ( $this->logged && $this->role == '10' || $this->role == '20')
		{
			$this->twig->display('admin/upload/uph_evaluasi_sarana.html', $this->content);
		}else{
			redirect("dashboard");
		}
	}

	public function sp3t()
	{
		if ( $this->logged && $this->role == '10' || $this->role == '20')
		{
			$this->twig->display('admin/upload/sp3t.html', $this->content);
		}else{
			redirect("dashboard");
		}
	}

	public function register_psat()
	{
		if ( $this->logged && $this->role == '10' || $this->role == '20')
		{
			$this->twig->display('admin/upload/register_psat.html', $this->content);
		}else{
			redirect("dashboard");
		}
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
		$postData = $this->input->post('param');
		$bantuan = $this->model_bantuan->getBantuan($postData);

		echo json_encode($bantuan);
	}

	public function form(){

		$data = array(); // Buat variabel $data sebagai array
		$nama_file_baru = 'data.xlsx';
		$name = strtolower(str_replace(' ', '_', $_FILES['file_data']['name']));
		$nama_file = $_POST['nama_file'];
		$bulan = $_POST['bulan'];
		$tahun = $_POST['tahun'];
		$kabupaten_kota = $_POST['kabupaten_kota'];

		if(is_file('assets/dokumen/excel/'.$name)) // Jika file tersebut ada
			unlink('assets/dokumen/excel/'.$name);
			$ext = pathinfo($_FILES['file_data']['name'], PATHINFO_EXTENSION); // Ambil ekstensi filenya apa
			$tmp_file = $_FILES['file_data']['tmp_name'];

			include APPPATH.'third_party/PHPExcel/PHPExcel.php';

			if($ext == "xlsx"){
				move_uploaded_file($tmp_file, 'assets/dokumen/excel/'.$name);
				$excelreader = new PHPExcel_Reader_Excel2007();
				$loadexcel = $excelreader->load('assets/dokumen/excel/'.$name); // Load file yang tadi diupload ke folder excel
			}

			if($ext == "xls" ){
				move_uploaded_file($tmp_file, 'assets/dokumen/excel/'.$name);
				$loadexcel = PHPExcel_IOFactory::load('assets/dokumen/excel/'.$name);
			}

			// lakukan upload file dengan memanggil function upload yang ada di SiswaModel.php

			// $upload = $this->SiswaModel->upload_file($this->filename);
			// print_r($upload);die;
			// if($upload['result'] == "success"){ // Jika proses upload sukses
				// Load plugin PHPExcel nya


				// $loadexcel = $excelreader->load('assets/dokumen/excel/'.$name); // Load file yang tadi diupload ke folder excel
				// print_r($name);die;
				if($name == 'rekap_per_kab_bantuan_pemerintah_akabi.xlsx'){
					foreach ($loadexcel->getSheetNames() as $key1 => $value1) {
						$data[$value1] = $loadexcel->getSheet($key1)->toArray(null, true, true ,true);
						foreach ($data[$value1] as $key2 => $value2) {
							if($key2 >= 6){
								if(is_float($value2['A'])){
									$datakab = [
												'id' => $value2['A'],
												'kabupaten' => $value2['B'],
												'kedelai_full_paket' => $value2['C'],
												'kedelai_non_phc' => $value2['D'],
												'kedelai_jumlah' => $value2['E'],
												'kacang_tanah_full_paket' => $value2['F'],
												'kacang_tanah_non_phc' => $value2['G'],
												'kacang_tanah_jumlah' => $value2['H'],
												'kacang_hijau_full_paket' => $value2['I'],
												'kacang_hijau_non_phc' => $value2['J'],
												'kacang_hijau_jumlah' => $value2['K'],
												'ubi_jalar' => $value2['L'],
												'jumlah_akabi' => $value2['M'],
												'bulan' => $bulan,
												'tahun' => $tahun,
											];
									$inst = $this->model_bantuan->insert_data('rekap_perkab',$datakab);
								}


							}
						}
					}

				}else if($name == 'laporan_bulanan_kegiatan_akabi.xlsx'){

					foreach ($loadexcel->getSheetNames() as $key1 => $value1) {

						if($value1 != 'Sheet5'){
							$data[$value1] = $loadexcel->getSheet($key1)->toArray(null, true, true ,true);

							foreach ($data[$value1] as $key2 => $value2) {

								if($key2 >= 9){

									if($value2['A']){
										$datakab = [
													'no' => $value2['A'],
													'jenis' => explode('. ', $value1)[1],
													'kabupaten' => $value2['B'],
													'jumlah_kec' => $value2['C'],
													'jumlah_desa' => $value2['D'],
													'jumlah_poktan' => $value2['E'],
													'sasaran_areal' => $value2['F'],
													'sk_penetapan' => $value2['G'],
													'realisasi_kontrak' => $value2['H'],
													'realisasi_distribusi' => $value2['I'],
													'apr' => $value2['J'],
													'mei' => $value2['K'],
													'juni' => $value2['L'],
													'juli' => $value2['M'],
													'ags' => $value2['N'],
													'sep' => $value2['O'],
													'okt' => $value2['P'],
													'nop' => $value2['Q'],
													'des' => $value2['R'],
													'jumlah' => $value2['S'],
													'realisasi_panen_luas' => $value2['T'],
													'realisasi_panen_produktivitas' => $value2['U'],
													'realisasi_panen_produksi' => $value2['V'],
													'tidak_dilaksanakan' => $value2['W'],
													'provitas_sebelum' => $value2['X'],
													'ket' => $value2['Y'],
													'bulan' => $bulan,
													'tahun' => $tahun,
												];
										$inst = $this->model_bantuan->insert_data('laporan_bulanan_kegiatan',$datakab);
										// print_r($inst);die;
									}


								}
							}
						}
					}
				}else if($name == 'penerima_bantuan_pemerintah_akabi.xlsx'){
						// $sheet = $loadexcel->getSheetNames(); //ambil nama sheet
						// $sheet = $loadexcel->getActiveSheet()->toArray(null, true, true ,true);
						// $sheet_1 = $loadexcel->getSheet(0)->toArray(null, true, true ,true); //ambil dengan index
						foreach ($loadexcel->getSheetNames() as $key1 => $value1) {
								$data[$value1] = $loadexcel->getSheet($key1)->toArray(null, true, true ,true);
								foreach ($data[$value1] as $key2 => $value2) {
									// code...

									if($key2 >= 7){
										$names;
										if($value2['A']){
											if(!is_numeric($value2['A'])){
												$explode = explode(". ",$value2['A']);

												$id = $explode[0];
												$name = $explode[1];
												$datakab = [
															'jenis_bantuan' => $value1,
															'id_kabupaten' => $id,
															'nama_kabupaten' => $name
														];
												$names = $name;
												// $insert = $this->SiswaModel->insert_data('bantuan_kabupaten', $datakab);
												// if($insert){
												// 	$ids = $id;
												// }
											}else{

												$data = [
																'jenis_bantuan' => $value1,
																'nama_kabupaten' => $names,
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
																'create_by' => '',
																'bulan' => $bulan,
																'tahun' => $tahun,
												];

												$insert = $this->model_bantuan->insert_data('bantuan', $data);
											}
										}
									}
								}
						}
					}else if($name == 'database_uph.xls'){
						foreach ($loadexcel->getSheetNames() as $key1 => $value1) {
							$data[$value1] = $loadexcel->getSheet($key1)->toArray(null, true, true ,true);

							foreach ($data[$value1] as $key2 => $value2) {
								if($key2 >= 7){
									$kota;

									if(is_numeric($value2['A'])){

										$datauph = [
											'nomor' => $value2['A'],
											'kabupaten_kota' => $value2['B'],
											'no_kelompok' => $value2['C'],
											'nama_kelompok' => $value2['D'],
											'ketua' => $value2['E'],
											'desa' => $value2['F'],
											'kecamatan' => $value2['G'],
											'jenis_olahan' => $value2['H'],
											'tahun' => $value2['I'],
										];
										$kota = $value2['B'];

										$insert = $this->model_bantuan->insert_data('uph', $datauph);
										// print_R('$data[$value1]');die;
									}else if($value2['A'] == NULL){
										if($value2['C']){
											$datauph = [
												'nomor' => NULL,
												'kabupaten_kota' => $kota,
												'no_kelompok' => $value2['C'],
												'nama_kelompok' => $value2['D'],
												'ketua' => $value2['E'],
												'desa' => $value2['F'],
												'kecamatan' => $value2['G'],
												'jenis_olahan' => $value2['H'],
												'tahun' => $value2['I'],
											];

											$insert = $this->model_bantuan->insert_data('uph', $datauph);
										}
									}

								}
							}

						}
					}else if($name == 'rekapan_uph_skoring.xlsx'){
						foreach ($loadexcel->getSheetNames() as $key1 => $value1) {
							$data[$value1] = $loadexcel->getSheet($key1)->toArray(null, true, true ,true);

							foreach ($data[$value1] as $key2 => $value2) {
								if($key2 >= 5){
									if(is_numeric($value2['A'])){
										$data = [
											'no' => $value2['A'],
											'kabupaten' => $value2['B'],
											'nama_poktan' => $value2['C'],
											'nama_ketua' => $value2['D'],
											'alamat' => $value2['E'],
											'organisasi_dikukuhkan' => $value2['F'],
											'luas_lahan_kelompok' => $value2['G'],
											'luas_lahan_sawah_desa' => $value2['H'],
											'pola_tanam' => $value2['I'],
											'rata_rata_produksi' => $value2['J'],
											'ketersediaan_bahan_baku_olahan' => $value2['K'],
											'ketersediaan_unit_olahan_pakan_ternak' => $value2['L'],
											'ketersediaan_lahan_utk_bangunan' => $value2['M'],
											'luas_lahan_yg_tersedia' => $value2['N'],
											'status_kepemilikan_lahan' => $value2['O'],
											'lokasi_bangunan_tidak_tercemar' => $value2['P'],
											'lokasi_bangunan_terpisah_dari_rumah_tinggal' => $value2['Q'],
											'kesiapan_kelompok_mencari_bahan_baku' => $value2['R'],
											'ketersediaan_listrik' => $value2['S'],
											'ketersediaan_modal' => $value2['T'],
											'usaha_yg_dimiliki_poktan' => $value2['U'],
											'bersedia_memanfaatkan_mengelola_dan_mengoptimalkan_bantuan' => $value2['V'],
											'bersedia_menyusun_ruk_dan_rab' => $value2['W'],
											'bersedia_swadaya_apabila_anggaran_untuk_bangunan_kurang' => $value2['X'],
											'bersedia_menerapkan_gmp' => $value2['Y'],
											'bersedia_menggunakan_bahan_baku_dari_poktan' => $value2['Z'],
											'bersedia_menyampaikan_laporan_harian' => $value2['AA'],
											'nilai' => $value2['AB'],
											'foto_open_camera_calon_lokasi' => $value2['AC'],
											'keterangan' => $value2['AD'] .'-'. $value2['AE'],
											'bulan' => $bulan,
											'tahun' => $tahun,
										];

										$insert = $this->model_bantuan->insert_data('uph_skoring', $data);
										// print_r($data);die;
									}

								}
							}
						}

					}else if($name == 'evaluasi_pemanfaatan_sarana_uph.xlsx'){
						foreach ($loadexcel->getSheetNames() as $key1 => $value1) {
							$data[$value1] = $loadexcel->getSheet($key1)->toArray(null, true, true ,true);

							foreach ($data[$value1] as $key2 => $value2) {
								if($key2 >= 9){
									if(is_numeric($value2['A'])){
										$data = [
											'nomor' => $value2['A'],
											'kecamatan' => $value2['B'],
											'desa' => $value2['C'],
											'gapoktan' => $value2['D'],
											'kelompok_tani' => $value2['E'],
											'ketua' => $value2['F'],
											'jenis_uph' => $value2['G'],
											'jumlah_bahan_baku_yang_digunakan' => $value2['H'],
											'jumlah_hasil_pengolahan' => $value2['I'],
											'rendeman' => $value2['J'],
											'jenis_pasar' => $value2['K'],
											'kuantitas_penjualan' => $value2['L'],
											'harga' => $value2['M'],
											'kendala' => $value2['N'],
											'solusi' => $value2['O'],
											'kabupaten_kota' => $kabupaten_kota,
											'bulan' => $bulan,
											'tahun' => $tahun,
										];
										$insert = $this->model_bantuan->insert_data('uph_evaluasi_sarana', $data);

									}
								}
							}
						}

					}else if($name == 'jabar-sp3t.xlsx'){

						foreach ($loadexcel->getSheetNames() as $key1 => $value1) {
							$data[$value1] = $loadexcel->getSheet($key1)->toArray(null, true, true ,true);
							// print_r($data[$value1]);die;
							foreach ($data[$value1] as $key2 => $value2) {
								if($key2 >= 6){
									if(is_numeric($value2['B'])){

										$data = [
											'nomor' => $value2['B'],
											'provinsi' => $value2['C'],
											'kabupaten' => $value2['D'],
											'kecamatan' => $value2['E'],
											'desa' => $value2['F'],
											'gapoktan' => $value2['G'],
											'nama_kelompok' => $value2['H'],
											'ketua' => $value2['I'],
											'no_kontak' => $value2['J'],
											'tahun' => $value2['K'],
											'kapasitas_produksi' => $value2['L'],
											'jumlah_poktan_mitra_pemasok' => $value2['M'],
											'jumlah_pasar_yg_sudah_berjalan' => $value2['N'],
											'rendemen_penggilingan' => $value2['O'],
											'potensi_pengembangan_korporasi' => $value2['P'],
											'kendala_produksi' => $value2['Q'],
											'bulan' => $bulan,
										];

										$insert = $this->model_bantuan->insert_data('SP3T', $data);

									}
								}
							}
						}

					}else if($name == 'rekap_register_psat.xlsx'){
						foreach ($loadexcel->getSheetNames() as $key1 => $value1) {
							$data[$value1] = $loadexcel->getSheet($key1)->toArray(null, true, true ,true);
							// print_r($data[$value1]);die;
							foreach ($data[$value1] as $key2 => $value2) {
								if($key2 >= 6){
									$nom;
									$poktan;
									$alamat;
									if(is_numeric($value2['A'])){
										$nom = $value2['A'];
										$poktan = $value2['B'];
										$alamat = $value2['C'];
										$data = [
											'nomor' => $value2['A'],
											'poktan_gapoktan' => $value2['B'],
											'alamat' => $value2['C'],
											'total' => $value2['D'],
											'nama_pangan' => $value2['E'],
											'nama_dagang' => $value2['F'],
											'no_register' => $value2['G'],
											'tgl_dikeluarkan' => $value2['H'],
											'berlaku' => $value2['I'],
										];
										
										$insert = $this->model_bantuan->insert_data('register_psat', $data);

									}else{
										$data = [
											'nomor' => $nom,
											'poktan_gapoktan' => $poktan,
											'alamat' => $alamat,
											'total' => $value2['D'],
											'nama_pangan' => $value2['E'],
											'nama_dagang' => $value2['F'],
											'no_register' => $value2['G'],
											'tgl_dikeluarkan' => $value2['H'],
											'berlaku' => $value2['I'],
										];
										$insert = $this->model_bantuan->insert_data('register_psat', $data);

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

		// redirect("upload");
		echo json_encode(array("status" => TRUE));
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

	public function deletedata()
	{

		$params = (object)$this->input->post();
		$this->model_bantuan->deletedata($params);
		header('Content-Type: application/json');
		echo json_encode(array("status" => TRUE));
	}

}
