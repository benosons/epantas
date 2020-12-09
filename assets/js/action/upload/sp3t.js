$(document).ready(function(){
    $('#data_upload').attr('class','menu-open nav-item');
    $('#data_upload > a').attr('class','nav-link active');
    $('#sp3t').attr('class','nav-link active');
    $('#sp3t > i').attr('class','far fa-circle nav-icon text-danger');
  
      getData();
      function getData(){
          $.ajax({
              method:'POST',
              dataType:'JSON',
              url:'getData',
              data : { param: 'sp3t' },
              success:function(result){
                var dt = $('#list-sp3t').DataTable({
                    responsive: true,
                    bDestroy: true,
                    // processing: true,
                    autoWidth : true,
                    pageLength: 10,
                    lengthChange: true,
                    scrollX: true,
                    aaData: result,
                    aoColumns: [
                      {"mDataProp":"nomor"},
                      {"mDataProp":"provinsi"},
                      {"mDataProp":"kabupaten"},
                      {"mDataProp":"kecamatan"},
                      {"mDataProp":"desa"},
                      {"mDataProp":"gapoktan"},
                      {"mDataProp":"nama_kelompok"},
                      {"mDataProp":"ketua"},
                      {"mDataProp":"no_kontak"},
                      {"mDataProp":"tahun"},
                      {"mDataProp":"kapasitas_produksi"},
                      {"mDataProp":"jumlah_poktan_mitra_pemasok"},
                      {"mDataProp":"jumlah_pasar_yg_sudah_berjalan"},
                      {"mDataProp":"rendemen_penggilingan"},
                      {"mDataProp":"potensi_pengembangan_korporasi"},
                      {"mDataProp":"kendala_produksi"},
                      {"mDataProp":"bulan"},
                    ],
                    order: [[1, 'DESC']],
                    rowGroup: {
                        dataSrc: 'provinsi'
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
                            aTargets: [16]
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
  