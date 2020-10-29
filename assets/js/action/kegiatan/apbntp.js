$( document ).ready(function() {
  console.log('You are running jQuery version: ' + $.fn.jquery);
  $('.select2').select2();

  $('#kegiatan').attr('class','menu-open nav-item');
  $('#kegiatan > a').attr('class','nav-link active');

  $('#data-apbn').attr('class','nav-link active');
  $('#data-apbn > i').attr('class','far fa-circle nav-icon text-danger');

  $('#add-apbn').on('click', function(){
    window.location.href='addapbntp';
  });

  $('#btnSave').on('click', function(){
    var data = {
      kegiatan : $('#kegiatan').val(),
      prov_kab_kot : $('#prov_kab_kot').val(),
      satuan : $('#satuan').val(),
      target_vol : $('#target_vol').val(),
      target_rp : $('#target_rp').val(),
      realis_vol : $('#realis_vol').val(),
      realis_persen_1 : $('#realis_persen_1').val(),
      realis_rp : $('#realis_rp').val(),
      realis_persen_2 : $('#realis_persen_2').val(),
      permasalahan : $('#permasalahan').val(),
      tindak_lanjut : $('#tindak_lanjut').val(),
      no_proposal : $('#no_proposal').val(),
      opd : $('#opd').val(),
      sektor : $('#sektor').val(),
      kegiatan_proposal : $('#kegiatan_proposal').val(),
      output : $('#output').val(),
      komponen : $('#komponen').val(),
      sub_komponen : $('#sub_komponen').val(),
      komoditas : $('#komoditas').val(),
      usulan : $('#usulan').val(),
      total_usulan : $('#total_usulan').val(),
      penerima : $('#penerima').val(),
      kecmatan : $('#kecmatan').val(),
      desa : $('#desa').val(),
      alamat : $('#alamat').val(),
      skcpl : $('#skcpl').val(),
      kontrak : $('#kontrak').val(),
      tanam : $('#tanam').val(),
    };
    
    saveapbntp(data);

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

function saveapbntp(data){
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'saveapbntp',
        data : data,
        success: function(result){
          Swal.fire({
            title: 'Sukses!',
            text: "Berhasil Tambah APBN TP",
            icon: 'success',
            showConfirmButton: true,
            confirmButtonText: '<i class="fas fa-check"></i>'
          }).then((result) => {
          if (result.isConfirmed) {
            window.location.href='apbntp';
            }
          });
        }
      })
    }
