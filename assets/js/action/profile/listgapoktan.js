$( document ).ready(function() {
  console.log('You are running jQuery version: ' + $.fn.jquery);
  $('.select2').select2();

  $('#pengelola').attr('class','menu-open nav-item');
  $('#pengelola > a').attr('class','nav-link active');

  $('#data-pok').attr('class','nav-link active');
  $('#data-pok > i').attr('class','far fa-circle nav-icon text-danger');

  $('#add-gapoktan').on('click', function(){
    window.location.href='addpoktan';
  });

  $('#btnSave').on('click', function(){
      var data = {
        nama : $('#nama').val(),
        tahun_pembentukan : $('#tahun_pembentukan').val(),
        alamat : $('#alamat').val(),
        kelas : $('#kelas').val(),
        skor : $('#skor').val(),
        tahun_penetapan : $('#tahun_penetapan').val(),
        jml_anggota : $('#jml_anggota').val(),
        no : $('#no').val(),
        nama_anggota : $('#nama_anggota').val(),
        nik_anggota : $('#nik_anggota').val(),
        status_anggota : $('#status_anggota').val(),
        luas_sawah : $('#luas_sawah').val(),
        luas_ladang : $('#luas_ladang').val(),
        luas_sawah_ladang : $('#luas_sawah_ladang').val(),
        ip : $('#ip').val(),
        hasil : $('#hasil').val(),
        produksi : $('#produksi').val(),
        pola_tanam : $('#pola_tanam').val(),
        status_lahan : $('#status_lahan').val(),
        komoditas : $('#komoditas').val(),
        varietas : $('#varietas').val(),
        bantuan : $('#bantuan_pemerintah').val(),
        milik_aset : $('#pemilik_aset').val(),
        jml_aset : $('#jml_aset').val(),
        tahun_perolehan : $('#tahun_perolehan').val(),
        sumber_aset : $('#sumber_aset').val(),
        kordinat : $('#kordinat').val(),
      }
      savedatapoktan(data);

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

function savedatapoktan(data){
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'savedatapoktan',
        data : data,
        success: function(result){
          Swal.fire({
            title: 'Sukses!',
            text: "Berhasil Tambah Data Kelompok Tani",
            icon: 'success',
            showConfirmButton: true,
            confirmButtonText: '<i class="fas fa-check"></i>'
          }).then((result) => {
          if (result.isConfirmed) {
            window.location.href='gapoktan';
            }
          });
        }
      })
    }
