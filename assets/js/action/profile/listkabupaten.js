$( document ).ready(function() {
  console.log('You are running jQuery version: ' + $.fn.jquery);
  $('.select2').select2();

  $('#pengelola').attr('class','menu-open nav-item');
  $('#pengelola > a').attr('class','nav-link active');

  $('#data-kab').attr('class','nav-link active');
  $('#data-kab > i').attr('class','far fa-circle nav-icon text-danger');

  $('#add-kabupaten').on('click', function(){
    window.location.href='addkab';
  });

  $('#btnSave').on('click', function(){
  var data = {
      dinas_pertanian_kabupaten : $('#dinas_pertanian_kabupaten').val(),
      kecamatan : $('#kecamatan').val(),
      desa_kelurahan : $('#desa_kelurahan').val(),
      nama_pejabat : $('#nama_pejabat').val(),
      nip_pejabat : $('#nip_pejabat').val(),
      nik_pejabat : $('#nik_pejabat').val(),
      jabatan : $('#jabatan').val(),
      luas_sawah : $('#luas_sawah').val(),
      luas_ladang : $('#luas_ladang').val(),
      luas_sawah_ladang : $('#luas_sawah_ladang').val(),
      ip : $('#ip').val(),
      hasil : $('#hasil').val(),
      produksi : $('#produksi').val(),
      pola_tanam : $('#pola_tanam').val(),
      varietas : $('#varietas').val(),
      bantuan : $('#bantuan_pemerintah').val(),
      milik_aset : $('#pemilik_aset').val(),
      jml_aset : $('#jml_aset').val(),
      tahun_perolehan : $('#tahun_perolehan').val(),
      sumber_aset : $('#sumber_aset').val()
    }
    savedatakabupaten(data);
  });

  // loadsiaran();
  function loadsiaran(){

      $.ajax({
          type: 'post',
          dataType: 'json',
          url: 'listDataSiaran',
          data : {
                  param      : param,
           },
          success: function(result){
                  var dt = $('#listsiaran').DataTable({
                      responsive: true,
                      bDestroy: true,
                      processing: true,
                      autoWidth : true,
                      pageLength: 10,
                      lengthChange: true,
                      aaData: result,
                      aoColumns: [
                          { 'mDataProp': 'id'},
                          { 'mDataProp': 'namaBadanHukum'},
                          { 'mDataProp': 'sebutanDiUdara'},
                          { 'mDataProp': 'wilayahLayanan'},
                          { 'mDataProp': 'alamat'},
                          { 'mDataProp': 'pimpinan'},
                          { 'mDataProp': 'email'},
                          { 'mDataProp': 'frekuensi'},
                          { 'mDataProp': 'noIPP'},
                          { 'mDataProp': 'kontak'},
                          { 'mDataProp': 'koor'},
                      ],
                      order: [[0, 'ASC']],
                      aoColumnDefs:[
                          {
                              "targets": [ 5,6,7,8,9,10 ],
                              "visible": false
                          },
                          {
                              mRender: function (data, type, row){
                                  var $rowData = '';
                                      $rowData += `
                                                <div class="row">
                                                  <div class="col-md-4">
                                                    <button onclick="modaldetail('`+row.namaBadanHukum+`','`+row.pimpinan+`','`+row.alamat+`','`+row.email+`','`+row.frekuensi+`','`+row.wilayahLayanan+`','`+row.kontak+`','`+row.koor+`')" type="button" class="btn btn-block btn-success btn-sm"><i class="far fa-eye"></i></button>
                                                  </div>
                                                  <div class="col-md-4">
                                                    <button onclick="editlembaga(`+row.id+`,'`+param+`')" type="button" class="btn btn-block btn-warning btn-sm"><i class="far fa-edit"></i></button>
                                                  </div>
                                                  <div class="col-md-4">
                                                    <button type="button" class="btn btn-block btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button>
                                                  </div>
                                                </div>
                                                  `;

                                  return $rowData;
                              },
                              aTargets: [4]
                          },
                      ],

                      fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull){
                          var index = iDisplayIndexFull + 1;
                          $('td:eq(0)', nRow).html(' '+index);
                          return  ;
                      },

                      fnInitComplete: function () {
                          var that = this;
                          var td ;
                          var tr ;

                          this.$('td').click( function () {
                              td = this;
                          });
                          this.$('tr').click( function () {
                              tr = this;
                          });


                          $('#listproj_filter input').bind('keyup', function (e) {
                              return this.value;
                          });

                      }
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

function savedatakabupaten(data){
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'savedatakabupaten',
        data : data,
        success: function(result){
          Swal.fire({
            title: 'Sukses!',
            text: "Berhasil Tambah Data Kabupaten",
            icon: 'success',
            showConfirmButton: true,
            confirmButtonText: '<i class="fas fa-check"></i>'
          }).then((result) => {
          if (result.isConfirmed) {
            window.location.href='kabupaten';
            }
          });
        }
      })
    }
