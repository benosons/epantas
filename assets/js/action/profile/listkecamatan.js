$( document ).ready(function() {
  console.log('You are running jQuery version: ' + $.fn.jquery);
  $('.select2').select2();

  $('#pengelola').attr('class','menu-open nav-item');
  $('#pengelola > a').attr('class','nav-link active');

  $('#data-kec').attr('class','nav-link active');
  $('#data-kec > i').attr('class','far fa-circle nav-icon text-danger');

  $('#add-kecamatan').on('click', function(){
    window.location.href='addkec';
  });

  $('#btnSave').on('click', function(){
    var data = {
      bpp: $('#bpp').val(),
      penyuluh: $('#penyuluh').val(),
      nip_penyuluh: $('#nip_penyuluh').val(),
      nik_penyuluh: $('#nik_penyuluh').val(),
      status_penyuluh: $('#status_penyuluh').val(),
      kecamatan: $('#kecamatan').val(),
      luas_sawah_kec: $('#luas_sawah_kec').val(),
      luas_ladang_kec: $('#luas_ladang_kec').val(),
      luas_sawah_ladang_kec: $('#luas_sawah_ladang_kec').val(),
      ip_kec: $('#ip_kec').val(),
      hasil_kec: $('#hasil_kec').val(),
      produksi_kec: $('#produksi_kec').val(),
      pola_tanam_kec: $('#pola_tanam_kec').val(),
      komoditas_kec: $('#komoditas_kec').val(),
      varietas_kec: $('#varietas_kec').val(),
      bantuan_kec: $('#bantuan_kec').val(),
      milik_aset_kec: $('#milik_aset_kec').val(),
      jml_aset_kec: $('#jml_aset_kec').val(),
      thn_perolehan_kec: $('#thn_perolehan_kec').val(),
      sumber_aset_kec: $('#sumber_aset_kec').val(),
      luas_sawah_desa: $('#luas_sawah_desa').val(),
      luas_ladang_desa: $('#luas_ladang_desa').val(),
      luas_sawah_ladang_desa: $('#luas_sawah_ladang_desa').val(),
      ip_desa: $('#ip_desa').val(),
      hasil_desa: $('#hasil_desa').val(),
      produksi_desa: $('#produksi_desa').val(),
      pola_tanam_desa: $('#pola_tanam_desa').val(),
      varietas_desa: $('#varietas_desa').val(),
      bantuan_desa: $('#bantuan_desa').val(),
      milik_aset_desa: $('#milik_aset_desa').val(),
      jml_aset_desa: $('#jml_aset_desa').val(),
      thn_perolehan_desa: $('#thn_perolehan_desa').val(),
      sumber_aset_desa: $('#sumber_aset_desa').val()
    }

    savedatakecamatan(data);
  });

  loadkecamatan();
  function loadkecamatan(){
      $.ajax({
          type: 'post',
          dataType: 'json',
          url: 'loadkecamatan',
          data : {
                  param      : '',
           },
          success: function(result){
            console.log(result)
                  var dt = $('#list-kecamatan').DataTable({
                      responsive: true,
                      bDestroy: true,
                      processing: true,
                      // autoWidth : true,
                      pageLength: 10,
                      lengthChange: true,
                      aaData: result,
                      aoColumns: [
                          { 'mDataProp': 'id'},
                          { 'mDataProp': 'bpp'},
                          { 'mDataProp': 'penyuluh'},
                          { 'mDataProp': 'nip_penyuluh'},
                          { 'mDataProp': 'nik_penyuluh'},
                          { 'mDataProp': 'status_penyuluh'},
                          { 'mDataProp': 'kecamatan'},
                          { 'mDataProp': 'id'},
                      ],
                      // order: [[0, 'ASC']],
                      aoColumnDefs:[
                          {
                              mRender: function (data, type, row){
                                  var $rowData = '';
                                      $rowData += `
                                                <div class="row">
                                                  <div class="col-md-4">
                                                    <button type="button" class="btn btn-block btn-success btn-sm"><i class="far fa-eye"></i></button>
                                                  </div>
                                                  <div class="col-md-4">
                                                    <button type="button" class="btn btn-block btn-warning btn-sm"><i class="far fa-edit"></i></button>
                                                  </div>
                                                  <div class="col-md-4">
                                                    <button type="button" class="btn btn-block btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button>
                                                  </div>
                                                </div>
                                                  `;

                                  return $rowData;
                              },
                              aTargets: [7]
                          },
                      ],

                      fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull){
                          var index = iDisplayIndexFull + 1;
                          $('td:eq(0)', nRow).html(' '+index);
                          return  ;
                      },

                  });

              }
      });
  }

});

function modaldetail(nama, pimpinan, alamat, email, frekuensi, wilayah, kontak, koor){

    $('#modal-default').modal({
      show: true
    });

    $('.modal-title').html('<b>'+nama+'</b>');
    $('#pimpinan').val(pimpinan);
    $('#koor').val(koor);
    $('#email').val(email);
    $('#frekuensi').val(frekuensi);
    $('#alamat').val(alamat);
    $('#kontak').val(kontak);
    $('#maps').html(`<iframe width="100%" height="200" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
      src = "https://maps.google.com/maps?q=`+koor+`&hl=es;z=14&amp;output=embed"></iframe>`
    );

}

function editlembaga(id, param){
  window.location.href='editlembaga?ids='+id+'&par='+param;
}

function savedatakecamatan(data){
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'savedatakecamatan',
        data : data,
        success: function(result){
          Swal.fire({
            title: 'Sukses!',
            text: "Berhasil Tambah Data Kecamatan",
            icon: 'success',
            showConfirmButton: true,
            confirmButtonText: '<i class="fas fa-check"></i>'
          }).then((result) => {
          if (result.isConfirmed) {
            window.location.href='kecamatan';
            }
          });
        }
      })
    }
