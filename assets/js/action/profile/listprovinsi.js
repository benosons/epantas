$( document ).ready(function() {
  console.log('You are running jQuery version: ' + $.fn.jquery);
  $('.select2').select2();

  $('#pengelola').attr('class','menu-open nav-item');
  $('#pengelola > a').attr('class','nav-link active');

  $('#data-prov').attr('class','nav-link active');
  $('#data-prov > i').attr('class','far fa-circle nav-icon text-danger');

  $('#add-provinsi').on('click', function(){
    window.location.href='addprov';
  });

  $('#btnSave').on('click', function(){
    var data = {
          dinas_pertanian_provinsi : $('#dinas_pertanian_provinsi').val(),
          kecamatan : $('#kecamatan').val(),
          desa_kelurahan : $('#desa_kelurahan').val(),
          nama_pejabat : $('#nama_pejabat').val(),
          nip_pejabat : $('#nip_pejabat').val(),
          nik_pejabat : $('#nik_pejabat').val(),
          jabatan : $('#jabatan').val(),
          luas_sawah : $('#luas_sawah').val(),
          luas_ladang : $('#luas_ladang').val(),
          luas_ladang_sawah : $('#luas_ladang_sawah').val(),
          ip : $('#ip').val(),
          hasil : $('#hasil').val(),
          produksi : $('#produksi').val(),
          pola_tanam : $('#pola_tanam').val(),
          varietas : $('#varietas').val(),
          bantuan : $('#bantuan').val(),
          milik_aset : $('#pemilik_aset').val(),
          jml_aset : $('#jml_aset').val(),
          tahun_perolehan : $('#tahun_perolehan').val(),
          sumber_aset : $('#sumber_aset').val(),
    }

    savedataprovinsi(data);
  });

  loadprovinsi();
  function loadprovinsi(){
      $.ajax({
          type: 'post',
          dataType: 'json',
          url: 'loadprovinsi',
          data : {
                  param      : '',
           },
          success: function(result){
            console.log(result)
                  var dt = $('#list-provinsi').DataTable({
                      responsive: true,
                      bDestroy: true,
                      processing: true,
                      // autoWidth : true,
                      pageLength: 10,
                      lengthChange: true,
                      aaData: result,
                      aoColumns: [
                          { 'mDataProp': 'id'},
                          { 'mDataProp': 'dinas_pertanian_provinsi'},
                          { 'mDataProp': 'kecamatan'},
                          { 'mDataProp': 'desa_kelurahan'},
                          { 'mDataProp': 'nama_pejabat'},
                          { 'mDataProp': 'nip_pejabat'},
                          { 'mDataProp': 'nik_pejabat'},
                          { 'mDataProp': 'jabatan'},
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
                                                    <button class="btn btn-block btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button>
                                                  </div>
                                                </div>
                                                  `;

                                  return $rowData;
                              },
                              aTargets: [8]
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

function savedataprovinsi(data){
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'savedataprovinsi',
        data : data,
        success: function(result){
          Swal.fire({
            title: 'Sukses!',
            text: "Berhasil Tambah Data Provinsi",
            icon: 'success',
            showConfirmButton: true,
            confirmButtonText: '<i class="fas fa-check"></i>'
          }).then((result) => {
          if (result.isConfirmed) {
            window.location.href='provinsi';
            }
          });
        }
      })
    }
