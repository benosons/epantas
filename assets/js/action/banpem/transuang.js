$( document ).ready(function() {
  console.log('You are running jQuery version: ' + $.fn.jquery);
  $('.select2').select2();

  $('#banpem').attr('class','menu-open nav-item');
  $('#banpem > a').attr('class','nav-link active');

  $('#data-uang').attr('class','nav-link active');
  $('#data-uang > i').attr('class','far fa-circle nav-icon text-danger');

  $('#add-uang').on('click', function(){
    window.location.href='addtransuang';
  });

  $('#btnSave').on('click', function(){
    var data = {
      kabupaten : $('#kabupaten').val(),
      kecamatan : $('#kecamatan').val(),
      desa : $('#desa').val(),
      kelompok_tani : $('#kelompok_tani').val(),
      diterima_rupiah : $('#diterima_rupiah').val(),
      tanggal_diterima : $('#tanggal_diterima').val(),
      digunakan_rupiah : $('#digunakan_rupiah').val(),
      tanggal_digunakan : $('#tanggal_digunakan').val(),
      saldo_digunakan : $('#saldo_digunakan').val(),
      dikembalikan_rupiah : $('#dikembalikan_rupiah').val(),
      tanggal_setoran : $('#tanggal_setoran').val(),
      no_bast : $('#no_bast').val(),
      tanggal_bast : $('#tanggal_bast').val(),
      alokasi_benih_vol : $('#alokasi_benih_vol').val(),
      alokasi_benih_rp : $('#alokasi_benih_rp').val(),
      alokasi_pupuk_vol : $('#alokasi_pupuk_vol').val(),
      alokasi_pupuk_rp : $('#alokasi_pupuk_rp').val(),
      alokasi_bangunan_vol : $('#alokasi_bangunan_vol').val(),
      alokasi_bangunan_rp : $('#alokasi_bangunan_rp').val(),
      realisasi_benih_vol : $('#realisasi_benih_vol').val(),
      realisasi_benih_sertifikasi : $('#realisasi_benih_sertifikasi').val(),
      realisasi_benih_rp : $('#realisasi_benih_rp').val(),
      realisasi_benih_penyedia : $('#realisasi_benih_penyedia').val(),
      realisasi_pupuk_vol : $('#realisasi_pupuk_vol').val(),
      realisasi_pupuk_rp : $('#realisasi_pupuk_rp').val(),
      realisasi_pupuk_penyedia : $('#realisasi_pupuk_penyedia').val(),
      realisasi_bangunan_vol : $('#realisasi_bangunan_vol').val(),
      realisasi_bangunan_rp : $('#realisasi_bangunan_rp').val(),
      sisa_benih_vol : $('#sisa_benih_vol').val(),
      sisa_benih_rp : $('#sisa_benih_rp').val(),
      sisa_pupuk_vol : $('#sisa_pupuk_vol').val(),
      sisa_pupuk_rp : $('#sisa_pupuk_rp').val(),
      sisa_bangunan_vol : $('#sisa_bangunan_vol').val(),
      sisa_bangunan_rp : $('#sisa_bangunan_rp').val(),
      fisik_tanam : $('#fisik_tanam').val(),
      fisik_panen : $('#fisik_panen').val(),
      fisik_prov : $('#fisik_prov').val(),
      fisik_produksi : $('#fisik_produksi').val(),
      fisik_bangunan : $('#fisik_bangunan').val(),
      keterangan : $('#keterangan').val(),
    }
    savetransuang(data);
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

function savetransuang(data){
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'savetransuang',
        data : data,
        success: function(result){
          Swal.fire({
            title: 'Sukses!',
            text: "Berhasil Tambah Transfer Uang",
            icon: 'success',
            showConfirmButton: true,
            confirmButtonText: '<i class="fas fa-check"></i>'
          }).then((result) => {
          if (result.isConfirmed) {
            window.location.href='transuang';
            }
          });
        }
      })
    }
