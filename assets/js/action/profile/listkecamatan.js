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

  $('#penyuluh').on('change', function(){
    $('#status_penyuluh').val($('option:selected', this).attr('status')).trigger("change");
  });

  $('#btnSave').on('click', function(){
    var data = {
      bpp: $('#bpp').val(),
      penyuluh: $('#penyuluh').val(),
      // nip_penyuluh: $('#nip_penyuluh').val(),
      // nik_penyuluh: $('#nik_penyuluh').val(),
      // status_penyuluh: $('#status_penyuluh').val(),
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

  $('#simpan_penyuluh').on('click', function(){
    var datapenyuluh = {
      nama_penyuluh : $('#nama_penyuluh').val(),
      nip_penyuluh : $('#nip_penyuluh').val(),
      nik_penyuluh : $('#nik_penyuluh').val(),
      status_penyuluh : $('#status_penyuluh').val(),
    };
    savepenyuluh(datapenyuluh);
  });

  loadkecamatan();
  loadpenyuluh();
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
                          { 'mDataProp': 'nama_penyuluh'},
                          { 'mDataProp': 'nip_penyuluh'},
                          { 'mDataProp': 'nik_penyuluh'},
                          { 'mDataProp': 'deskripsi_status_penyuluh'},
                          { 'mDataProp': 'kecamatan'},
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
                                          <div class="dropdown-content" style="min-width: 230px;">
                                            <a href="#" onclick="modaldetail_kecamatan(`+row.id+`,'`+row.luas_sawah_kec+`','`+row.luas_ladang_kec+`','`+row.luas_sawah_ladang_kec+`','`+row.ip_kec+`','`+row.hasil_kec+`','`+row.produksi_kec+`','`+row.pola_tanam_kec+`','`+row.komoditas_kec+`','`+row.varietas_kec+`','`+row.bantuan_kec+`','`+row.milik_aset_kec+`','`+row.jml_aset_kec+`','`+row.thn_perolehan_kec+`','`+row.sumber_aset_kec+`')"><i class="far fa-eye"></i> Detail Data Kecamatan</a>
                                            <a href="#" onclick="modaldetail_desa(`+row.id+`,'`+row.luas_sawah_desa+`','`+row.luas_ladang_desa+`','`+row.luas_sawah_ladang_desa+`','`+row.ip_desa+`','`+row.hasil_desa+`','`+row.produksi_desa+`','`+row.pola_tanam_desa+`','`+row.varietas_desa+`','`+row.bantuan_desa+`','`+row.milik_aset_desa+`','`+row.jml_aset_desa+`','`+row.thn_perolehan_desa+`','`+row.sumber_aset_desa+`')"><i class="far fa-eye"></i> Detail Data Desa</a>
                                            <a href="#"><i class="far fa-edit"></i> Edit</a>
                                            <a href="#"><i class="fas fa-trash-alt"></i> Hapus</a>
                                            <a href="#"><i class="fas fa-print"></i> Cetak</a>
                                          </div>
                                        </div>`;

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

    function modaldetail_kecamatan(id,luas_sawah_kec,luas_ladang_kec,luas_sawah_ladang_kec,ip_kec,hasil_kec,produksi_kec,pola_tanam_kec,komoditas_kec,varietas_kec,bantuan_kec,milik_aset_kec,jml_aset_kec,thn_perolehan_kec,sumber_aset_kec){
      $('#modal-detail-kecamatan').modal({
        show: true
      });

      $('#id').val(id);
      $('#luas_sawah_kec').val(luas_sawah_kec);
      $('#luas_ladang_kec').val(luas_ladang_kec);
      $('#luas_sawah_ladang_kec').val(luas_sawah_ladang_kec);
      $('#ip_kec').val(ip_kec);
      $('#hasil_kec').val(hasil_kec);
      $('#produksi_kec').val(produksi_kec);
      $('#pola_tanam_kec').val(pola_tanam_kec);
      $('#komoditas_kec').val(komoditas_kec).trigger("change");
      $('#varietas_kec').val(varietas_kec).trigger("change");
      $('#bantuan_kec').val(bantuan_kec).trigger("change");
      $('#milik_aset_kec').val(milik_aset_kec).trigger("change");
      $('#jml_aset_kec').val(jml_aset_kec);
      $('#thn_perolehan_kec').val(thn_perolehan_kec);
      $('#sumber_aset_kec').val(sumber_aset_kec).trigger("change");

    }

    function modaldetail_desa(id,luas_sawah_desa,luas_ladang_desa,luas_sawah_ladang_desa,ip_desa,hasil_desa,produksi_desa,pola_tanam_desa,varietas_desa,bantuan_desa,milik_aset_desa,jml_aset_desa,thn_perolehan_desa,sumber_aset_desa){
      $('#modal-detail-desa').modal({
        show: true
      });

      $('#id').val(id);
      $('#luas_sawah_desa').val(luas_sawah_desa);
      $('#luas_ladang_desa').val(luas_ladang_desa);
      $('#luas_sawah_ladang_desa').val(luas_sawah_ladang_desa);
      $('#ip_desa').val(ip_desa);
      $('#hasil_desa').val(hasil_desa);
      $('#produksi_desa').val(produksi_desa);
      $('#pola_tanam_desa').val(pola_tanam_desa);
      $('#varietas_desa').val(varietas_desa).trigger("change");
      $('#bantuan_desa').val(bantuan_desa).trigger("change");
      $('#milik_aset_desa').val(milik_aset_desa).trigger("change");
      $('#jml_aset_desa').val(jml_aset_desa);
      $('#thn_perolehan_desa').val(thn_perolehan_desa);
      $('#sumber_aset_desa').val(sumber_aset_desa).trigger("change");


    }
