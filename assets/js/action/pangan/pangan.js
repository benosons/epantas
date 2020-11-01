$( document ).ready(function() {
  $(function() {
    $('#tanggal_panen').datetimepicker({
      useCurrent: true, //Important! See issue #1075
      format: 'L',
      "setDate": new Date(),
        "autoclose": true

    });

  });
  console.log('You are running jQuery version: ' + $.fn.jquery);
  $('.select2').select2();

  $('#pangan').attr('class','menu-open nav-item');
  $('#pangan > a').attr('class','nav-link active');

  // $('#data-apbd').attr('class','nav-link active');
  // $('#data-apbd > i').attr('class','far fa-circle nav-icon text-danger');

  $('#add-pangan').on('click', function(){
    window.location.href='addpangan';
  });

  window.img = '';
  $("#foto_pangan").change(function() {
    readURL(this);
  });

  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function(e) {
        $('#blah').attr('src', e.target.result);
        window.img = e.target.result;
      }
      reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
  }

  $('#btnSave').on('click', function(){
      var img = window.img;
      var datapangan = {
        penyuluh : $('#penyuluh option:selected').val(),
        kabupaten_kota : $('#kabupaten_kota option:selected').val(),
        kecamatan : $('#kecamatan option:selected').val(),
        kelurahan : $('#kelurahan option:selected').val(),
        nama_petani : $('#nama_petani').val(),
        varietas : $('#varietas option:selected').val(),
        tanggal_panen : $('#tanggal_panen').find("input").val(),
        nama_petani : $('#nama_petani').val(),
        nama_verifikasi : $('#nama_verifikasi').val(),
        instansi_verifikasi : $('#instansi_verifikasi').val(),
        stok_pangan : $('#stok_pangan').val(),
        img : img,
        nama_file : $('#foto_pangan').val().replace(/\\/g, "|").replace('C:|fakepath|', ''),
      }
      savepangan(datapangan);
  });

  $('#simpan_penyuluh').on('click', function(){
    var datapenyuluh = {
      nama_penyuluh : $('#nama_penyuluh').val(),
      nip_penyuluh : $('#nip_penyuluh').val(),
      nik_penyuluh : $('#nik_penyuluh').val(),
      status_penyuluh : $('#status_penyuluh').val(),
    };
    savepenyuluh(datapenyuluh);
  });

  $('#kabupaten_kota').on('change', function(){
    loadparam('kec', $('option:selected', this).val());
  });

  $('#kecamatan').on('change', function(){
    loadparam('kel', $('option:selected', this).val());
  });

  // if(window.location.pathname == '/listpangan'){
    loadpangan();
  // }

  loadpenyuluh();
  loadparam('kab',0);
  function loadpangan(){
      $.ajax({
          type: 'post',
          dataType: 'json',
          url: 'loadpangan',
          data : {
                  param      : '',
           },
          success: function(result){
            console.log(result)
                  var dt = $('#list-pangan').DataTable({
                      responsive: true,
                      bDestroy: true,
                      processing: true,
                      // autoWidth : true,
                      pageLength: 10,
                      lengthChange: true,
                      aaData: result,
                      aoColumns: [
                          { 'mDataProp': 'id'},
                          { 'mDataProp': 'nama_penyuluh'},
                          { 'mDataProp': 'nama_kabupaten'},
                          { 'mDataProp': 'nama_kecamatan'},
                          { 'mDataProp': 'nama_kelurahan'},
                          { 'mDataProp': 'nama_petani'},
                          { 'mDataProp': 'nama_varietas'},
                          { 'mDataProp': 'tanggal_panen'},
                          { 'mDataProp': 'nama_verifikasi'},
                          { 'mDataProp': 'instansi_verifikasi'},
                          { 'mDataProp': 'stok_pangan'},
                          { 'mDataProp': 'foto'},
                          { 'mDataProp': 'id'},
                      ],
                      // order: [[0, 'ASC']],
                      aoColumnDefs:[
                          {
                              mRender: function (data, type, row){
                                  var $rowData = '';
                                  $rowData +=
                                  `<div class="dropdown">
                                      <button type="button" class="btn btn-warning"><i class="fas fa-bars"></i></button>
                                      <div class="dropdown-content" style="min-width: 111px;">
                                        <a href="#"><i class="far fa-eye"></i> Detail</a>
                                        <a href="#"><i class="far fa-edit"></i> Edit</a>
                                        <a href="#"><i class="fas fa-trash-alt"></i> Hapus</a>
                                        <a href="#"><i class="fas fa-print"></i> Cetak</a>
                                      </div>
                                    </div>`;

                                  return $rowData;
                              },
                              aTargets: [12]
                          },
                          {
                              mRender: function (data, type, row){
                                  var $rowData = '';
                                  $rowData +=
                                  `<img src="`+row.foto+`">`;

                                  return $rowData;
                              },
                              aTargets: [11]
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
  function loadpenyuluh(){
      $.ajax({
          type: 'post',
          dataType: 'json',
          url: 'loadpenyuluh',
          data : {
                  param      : '',
           },
          success: function(result){
            var opt = '<option value="0">-Pilih Penyuluh-</option>';
            for (var i = 0; i < result.length; i++) {
              opt += `<option value="`+result[i].id+`" status="`+result[i].status_penyuluh+`">`+result[i].nama_penyuluh+`</option>`;
            }

            $('#penyuluh').html(opt);

            var dt = $('#list-penyuluh').DataTable({
                responsive: true,
                bDestroy: true,
                processing: true,
                // autoWidth : true,
                pageLength: 10,
                lengthChange: true,
                aaData: result,
                aoColumns: [
                    { 'mDataProp': 'id'},
                    { 'mDataProp': 'nama_penyuluh'},
                    { 'mDataProp': 'nip_penyuluh'},
                    { 'mDataProp': 'nik_penyuluh'},
                    { 'mDataProp': 'deskripsi_status_penyuluh'},
                    { 'mDataProp': 'id'},
                ],
                // order: [[0, 'ASC']],
                aoColumnDefs:[
                    {
                        mRender: function (data, type, row){
                            var $rowData = '';
                            $rowData +=
                            `<div class="dropdown">
                                <button type="button" class="btn btn-warning"><i class="fas fa-bars"></i></button>
                                <div class="dropdown-content" style="min-width: 111px;">
                                  <a href="#"><i class="far fa-edit"></i> Edit</a>
                                  <a href="#"><i class="fas fa-trash-alt"></i> Hapus</a>
                                </div>
                              </div>`;
                            return $rowData;
                        },
                        aTargets: [5]
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

  function loadparam(param, id){
      $.ajax({
          type: 'post',
          dataType: 'json',
          url: 'loadparam',
          data : {
                  param      : param,
                  id      : id,
           },
          success: function(result){
            if(param == 'kab'){
              $('#kabupaten_kota').prop('disabled',true);
              var opt = '<option value="0">-Pilih Kabupaten-</option>';
              for (var i = 0; i < result.length; i++) {
                opt += `<option value="`+result[i].id+`">`+result[i].nama+`</option>`;
              }
              $('#kabupaten_kota').html(opt);
              $('#kabupaten_kota').val($('#kotakab').val()).trigger("change");


            }else if (param == 'kec'){
              $('#kecamatan').empty();
              var opt = '<option value="0">-Pilih Kecamatan-</option>';
              for (var i = 0; i < result.length; i++) {
                opt += `<option value="`+result[i].id+`">`+result[i].nama+`</option>`;
              }
              $('#kecamatan').html(opt);
              $('#kelurahan').empty();
            }else if (param == 'kel'){
              $('#kelurahan').empty();
              var opt = '<option value="0">-Pilih Kelurahan-</option>';
              for (var i = 0; i < result.length; i++) {
                opt += `<option value="`+result[i].id+`">`+result[i].nama+`</option>`;
              }
              $('#kelurahan').html(opt);
            }
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

function savepangan(data){
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'savepangan',
        data : data,
        success: function(result){
          Swal.fire({
            title: 'Sukses!',
            text: "Berhasil Tambah Pangan Berkualitas",
            icon: 'success',
            showConfirmButton: true,
            confirmButtonText: '<i class="fas fa-check"></i>'
          }).then((result) => {
          if (result.isConfirmed) {
            window.location.href='listpangan';
            }
          });
        }
      })
    }

    var sidenav = document.getElementById("mySidenav");
    if(sidenav){
      sidenav.style.width = "0";
    }

    function openNav() {
      $('#mySidenav').show();
      document.getElementById("mySidenav").style.width = "250px";
    }

    function closeNav() {
      document.getElementById("mySidenav").style.width = "0";
    }

    function savepenyuluh(data){
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: 'savepenyuluh',
            data : data,
            success: function(result){
              Swal.fire({
                title: 'Sukses!',
                text: "Berhasil Tambah Penyuluh",
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
