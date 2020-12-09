$(document).ready(function(){
    $('#data_upload').attr('class','menu-open nav-item');
    $('#data_upload > a').attr('class','nav-link active');
    $('#uph-skoring').attr('class','nav-link active');
    $('#uph-skoring > i').attr('class','far fa-circle nav-icon text-danger');
  
      getData();
      function getData(){
          $.ajax({
              method:'POST',
              dataType:'JSON',
              url:'getData',
              data : { param: 'uph-skoring' },
              success:function(result){
                var dt = $('#list-uph-skoring').DataTable({
                    responsive: true,
                    bDestroy: true,
                    processing: true,
                    autoWidth : true,
                    pageLength: 10,
                    lengthChange: true,
                    scrollX: true,
                    aaData: result,
                    aoColumns: [
                      {"mDataProp":"no"},
                      {"mDataProp":"kabupaten"},
                      {"mDataProp":"nama_poktan"},
                      {"mDataProp":"nama_ketua"},
                      {"mDataProp":"alamat"},
                      {"mDataProp":"organisasi_dikukuhkan"},
                      {"mDataProp":"luas_lahan_kelompok"},
                      {"mDataProp":"luas_lahan_sawah_desa"},
                      {"mDataProp":"pola_tanam"},
                      {"mDataProp":"rata_rata_produksi"},
                      {"mDataProp":"ketersediaan_bahan_baku_olahan"},
                      {"mDataProp":"ketersediaan_unit_olahan_pakan_ternak"},
                      {"mDataProp":"ketersediaan_lahan_utk_bangunan"},
                      {"mDataProp":"luas_lahan_yg_tersedia"},
                      {"mDataProp":"status_kepemilikan_lahan"},
                      {"mDataProp":"lokasi_bangunan_tidak_tercemar"},
                      {"mDataProp":"lokasi_bangunan_terpisah_dari_rumah_tinggal"},
                      {"mDataProp":"kesiapan_kelompok_mencari_bahan_baku"},
                      {"mDataProp":"ketersediaan_listrik"},
                      {"mDataProp":"ketersediaan_modal"},
                      {"mDataProp":"usaha_yg_dimiliki_poktan"},
                      {"mDataProp":"bersedia_memanfaatkan_mengelola_dan_mengoptimalkan_bantuan"},
                      {"mDataProp":"bersedia_menyusun_ruk_dan_rab"},
                      {"mDataProp":"bersedia_swadaya_apabila_anggaran_untuk_bangunan_kurang"},
                      {"mDataProp":"bersedia_menerapkan_gmp"},
                      {"mDataProp":"bersedia_menggunakan_bahan_baku_dari_poktan"},
                      {"mDataProp":"bersedia_menyampaikan_laporan_harian"},
                      {"mDataProp":"nilai"},
                      {"mDataProp":"foto_open_camera_calon_lokasi"},
                      {"mDataProp":"keterangan"},
                      {"mDataProp":"bulan"},
                      {"mDataProp":"tahun"},
                    ],
                    order: [[1, 'DESC']],
                    rowGroup: {
                        dataSrc: 'kabupaten'
                    },
                    aoColumnDefs:[
                          {
                            "targets": [0],
                            "orderable": false
                          },
                    //     {
                    //         "targets": [ 5,6,7,8,9,10 ],
                    //         "visible": false
                    //     },
                        {
                            mRender: function (data, type, row){
  
                              const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
                                "Juli", "Agustus", "September", "Oktober", "November", "Desember"
                              ];
  
                                var $rowData = monthNames[row.bulan - 1];
  
                                return $rowData;
                            },
                            aTargets: [30]
                        },
                    ],
  
  
                    // fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull){
                    //     var index = iDisplayIndexFull + 1;
                    //     $('td:eq(0)', nRow).html(' '+index);
                    //     return  ;
                    // },
                });
              }
          })
      }
      console.log('You are running jQuery version: ' + $.fn.jquery);
  
      $('#ok-delete').on('click', function(){
          const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          });
  
          swalWithBootstrapButtons.fire({
            title: 'Anda Yakin, hapus Data ini?',
            text: "",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '<i class="fas fa-check"></i> Ya',
            cancelButtonText: '<i class="fas fa-times"></i> Tidak',
            reverseButtons: true
          }).then((result) => {
          if (result.isConfirmed) {
            $.ajax({
              type: 'post',
              dataType: 'json',
              url: 'deletedata',
              data : {
                      table    : 'bantuan',
                      bulan    : $('#bulan').val(),
                      tahun    : $('#tahun').val(),
                    },
              success: function(data)
              {
                Swal.fire({
                  title: 'Sukses!',
                  text: 'Hapus Data',
                  icon: 'success',
                  showConfirmButton: false,
                  timer: 1500
                });
                getData();
              }
            });
          }
        })
  
      });
  });
  
  
  function modalhapus(){
    $('#modal-delete').modal({
      show: true
    });
  
  }
  