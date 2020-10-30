$( document ).ready(function() {
  console.log('You are running jQuery version: ' + $.fn.jquery);
  $('.select2').select2();

  // $('.sidenav').css('padding-top', $('.main-header').height() +'px');

  $('#pengelola').attr('class','menu-open nav-item');
  $('#pengelola > a').attr('class','nav-link active');

  $('#data-pok').attr('class','nav-link active');
  $('#data-pok > i').attr('class','far fa-circle nav-icon text-danger');

  $('#simpan-anggota').hide()
  $('#vert-tabs-anggota-tab').on('click', function(){
    $('#simpan-anggota').hide()
  })

  $('#vert-tabs-tambah-tab').on('click', function(){
    $('#simpan-anggota').show()
  })

  $('#add-gapoktan').on('click', function(){
    window.location.href='addpoktan';
  });

  $('#nama').on('change', function(){
    $('#jml_anggota').val($('option:selected', this).attr('total'));
  });

  $('#btnSave').on('click', function(){
      var data = {
        // nama : $('#nama option:selected').val(),
        id_kelompok : $('#nama option:selected').val(),
        // tahun_pembentukan : $('#tahun_pembentukan').val(),
        // alamat : $('#alamat').val(),
        // kelas : $('#kelas').val(),
        // skor : $('#skor').val(),
        // tahun_penetapan : $('#tahun_penetapan').val(),
        // jml_anggota : $('#jml_anggota').val(),
        // no : $('#no').val(),
        // nama_anggota : $('#nama_anggota').val(),
        // nik_anggota : $('#nik_anggota').val(),
        // status_anggota : $('#status_anggota').val(),
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

    $('#simpan_kelompok').on('click', function(){
      var datakelompok = {
        nama_kelompok : $('#nama_kelompok').val(),
        tahun_pembentukan_kelompok : $('#tahun_pembentukan_kelompok').val(),
        alamat_kelompok : $('#alamat_kelompok').val(),
        kelas_simluhtan_kelompok : $('#kelas_simluhtan_kelompok').val(),
        skor_kelompok: $('#skor_kelompok').val(),
        tahun_penetapan_kelompok : $('#tahun_penetapan_kelompok').val(),
        jumlah_anggota_kelompok : $('#jumlah_anggota_kelompok').val(),
      };
      savekelompoktani(datakelompok);
    });

    $('#simpan-anggota').on('click', function(){
      var dataanggota = {
        id_kelompok : $('#id_kelompok').val(),
        nama_anggota : $('#nama_anggota').val(),
        nik_anggota : $('#nik_anggota').val(),
        status_anggota : $('#status_anggota').val(),
      }

      saveanggota(dataanggota);
    });

  loadpoktan();
  loadkelompok();
  function loadpoktan(){
      $.ajax({
          type: 'post',
          dataType: 'json',
          url: 'loadpoktan',
          data : {
                  param      : '',
           },
          success: function(result){

                  var dt = $('#list-poktan').DataTable({
                      responsive: true,
                      bDestroy: true,
                      processing: true,
                      // autoWidth : true,
                      pageLength: 10,
                      lengthChange: true,
                      aaData: result,
                      aoColumns: [
                          { 'mDataProp': 'id'},
                          { 'mDataProp': 'nama_kelompok'},
                          { 'mDataProp': 'luas_sawah'},
                          { 'mDataProp': 'luas_ladang'},
                          { 'mDataProp': 'luas_sawah_ladang'},
                          { 'mDataProp': 'ip'},
                          { 'mDataProp': 'hasil'},
                          { 'mDataProp': 'produksi'},
                          { 'mDataProp': 'pola_tanam'},
                          { 'mDataProp': 'deskripsi_status_lahan'},
                          { 'mDataProp': 'id_kelompok'},
                      ],
                      // order: [[0, 'ASC']],
                      aoColumnDefs:[
                          {
                              mRender: function (data, type, row){
                                  var rowData = '';

                                  rowData +=
                                  `<div class="dropdown">
                                    <button type="button" class="btn btn-warning"><i class="fas fa-bars"></i></button>
                                    <div class="dropdown-content" style="min-width: 111px;">
                                      <a href="#" onclick="modaldetail(`+row.id+`, `+row.status_lahan+`,`+row.komoditas+`,`+row.varietas+`,`+row.bantuan+`,`+row.milik_aset+`,'`+row.jml_aset+`','`+row.tahun_perolehan+`',`+row.sumber_aset+`,'`+row.kordinat+`')"><i class="far fa-eye"></i> Detail</a>
                                      <a href="#"><i class="far fa-edit"></i> Edit</a>
                                      <a href="#"><i class="fas fa-trash-alt"></i> Hapus</a>
                                    </div>
                                  </div>`;

                                  return rowData;
                              },
                              aTargets: [10]
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

  function loadkelompok(){
      $.ajax({
          type: 'post',
          dataType: 'json',
          url: 'loadkelompok',
          data : {
                  param      : '',
           },
          success: function(result){
            var opt = '<option value="0">-Pilih status-</option>';
            for (var i = 0; i < result.length; i++) {
              opt += '<option value="'+result[i].id+'" total="'+result[i].total+'">'+result[i].nama_kelompok+'</option>';
            }
            $('#nama').html(opt);

                  var dt = $('#list-kelompok').DataTable({
                      responsive: true,
                      bDestroy: true,
                      processing: true,
                      // autoWidth : true,
                      pageLength: 10,
                      lengthChange: true,
                      aaData: result,
                      aoColumns: [
                          { 'mDataProp': 'id'},
                          { 'mDataProp': 'nama_kelompok'},
                          { 'mDataProp': 'tahun_pembentukan_kelompok'},
                          { 'mDataProp': 'alamat_kelompok'},
                          { 'mDataProp': 'kelas_simluhtan_kelompok'},
                          { 'mDataProp': 'skor_kelompok'},
                          { 'mDataProp': 'tahun_penetapan_kelompok'},
                          { 'mDataProp': 'total'},
                          { 'mDataProp': 'id'},
                      ],
                      // order: [[0, 'ASC']],
                      aoColumnDefs:[
                          {
                              mRender: function (data, type, row){
                                  var rowData = '';
                                  rowData +=
                                  `<div class="dropdown">
                                    <button type="button" class="btn btn-warning"><i class="fas fa-bars"></i></button>
                                    <div class="dropdown-content" style="min-width: 170px;">
                                      <a href="#" onclick="modalkelompok(`+row.id+`,'`+row.nama_kelompok+`')"><i class="fas fa-users"></i> Lihat Anggota</a>
                                      <a href="#"><i class="far fa-edit"></i> Edit</a>
                                      <a href="#"><i class="fas fa-trash-alt"></i> Hapus</a>
                                    </div>
                                  </div>`;

                                  return rowData;
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

function savekelompoktani(datakelompok){
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'savekelompoktani',
        data : datakelompok,
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

function saveanggota(dataanggota){
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: 'saveanggota',
        data : dataanggota,
        success: function(result){
          Swal.fire({
            title: 'Sukses!',
            text: "Berhasil Tambah Data Anggota Tani",
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

    function openNav() {
      document.getElementById("mySidenav").style.width = "250px";
    }

    function closeNav() {
      document.getElementById("mySidenav").style.width = "0";
    }

    function modalkelompok(id, nama){
      $('#modal-kelompok').modal({
        show: true
      });

      $('.modal-title').text('Nama Kelompok: '+nama);
      $('#id_kelompok').val(id);
      loadanggota(id);
    }

    function modaldetail(id,status_lahan,komoditas,varietas,bantuan,milik_aset,jml_aset,tahun_perolehan,sumber_aset,kordinat){
      $('#modal-detail').modal({
        show: true
      });

        $('#status_lahan').val(status_lahan).trigger("change");
        $('#komoditas').val(komoditas).trigger("change");
        $('#varietas').val(varietas).trigger("change");
        $('#bantuan').val(bantuan).trigger("change");
        $('#milik_aset').val(milik_aset).trigger("change");
        $('#jml_aset').val(jml_aset);
        $('#tahun_perolehan').val(tahun_perolehan);
        $('#sumber_aset').val(sumber_aset).trigger("change");
        $('#kordinat').val(kordinat);

    }

    function loadanggota(id){
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: 'loadanggota',
            data : {
                    id      : id,
             },
            success: function(result){
                    var dt = $('#list-anggota-kelompok').DataTable({
                        responsive: true,
                        bDestroy: true,
                        processing: true,
                        autoWidth : true,
                        pageLength: 10,
                        lengthChange: true,
                        aaData: result,
                        aoColumns: [
                            { 'mDataProp': 'id'},
                            { 'mDataProp': 'nama_anggota'},
                            { 'mDataProp': 'nik_anggota'},
                            { 'mDataProp': 'status_anggota'},
                            { 'mDataProp': 'id_kelompok'},
                        ],
                        // order: [[0, 'ASC']],
                        aoColumnDefs:[
                            {
                                mRender: function (data, type, row){
                                    var rowData = '';
                                    rowData +=
                                    `<button type="button" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>`;

                                    return rowData;
                                },
                                aTargets: [4]
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
