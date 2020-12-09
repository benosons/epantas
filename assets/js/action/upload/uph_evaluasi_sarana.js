$(document).ready(function(){
    $('#data_upload').attr('class','menu-open nav-item');
    $('#data_upload > a').attr('class','nav-link active');
    $('#uph-evaluasi-sarana').attr('class','nav-link active');
    $('#uph-evaluasi-sarana > i').attr('class','far fa-circle nav-icon text-danger');
  
      getData();
      function getData(){
          $.ajax({
              method:'POST',
              dataType:'JSON',
              url:'getData',
              data : { param: 'uph-evaluasi-sarana' },
              success:function(result){
                var dt = $('#list-uph-evaluasi-sarana').DataTable({
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
                      {"mDataProp":"kecamatan"},
                      {"mDataProp":"desa"},
                      {"mDataProp":"gapoktan"},
                      {"mDataProp":"kelompok_tani"},
                      {"mDataProp":"ketua"},
                      {"mDataProp":"jenis_uph"},
                      {"mDataProp":"jumlah_bahan_baku_yang_digunakan"},
                      {"mDataProp":"jumlah_hasil_pengolahan"},
                      {"mDataProp":"rendeman"},
                      {"mDataProp":"jenis_pasar"},
                      {"mDataProp":"kuantitas_penjualan"},
                      {"mDataProp":"harga"},
                      {"mDataProp":"kendala"},
                      {"mDataProp":"solusi"},
                      {"mDataProp":"kabupaten_kota"},
                      {"mDataProp":"bulan"},
                      {"mDataProp":"tahun"},
                    ],
                    order: [[1, 'DESC']],
                    rowGroup: {
                        dataSrc: 'kecamatan'
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
  