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

  $('#nama_pejabat').on('change', function(){
    $('#jabatan').val($('option:selected', this).attr('jabatan')).trigger("change");
  });

  $('#btnSave').on('click', function(){
    var data = {
          dinas_pertanian_provinsi : $('#dinas_pertanian_provinsi').val(),
          kecamatan : $('#kecamatan').val(),
          desa_kelurahan : $('#desa_kelurahan').val(),
          nama_pejabat : $('#nama_pejabat option:selected').val(),
          // nip_pejabat : $('#nip_pejabat').val(),
          // nik_pejabat : $('#nik_pejabat').val(),
          jabatan : $('#jabatan option:selected').val(),
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

  $('#simpan_pejabat').on('click', function(){
    var datapejabat = {
      nama_pejabat : $('#nama_pejabat').val(),
      nip_pejabat : $('#nip_pejabat').val(),
      nik_pejabat : $('#nik_pejabat').val(),
      jabatan : $('#jabatan').val(),
    };
    savepenyuluh(datapejabat);
  });

  loadprovinsi();
  loadpejabat();
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
                          { 'mDataProp': 'deskripsi_jabatan'},
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
                                        <a href="#" onclick="modaldetail(`+row.id+`,`+row.varietas+`,`+row.bantuan+`,`+row.milik_aset+`,'`+row.jml_aset+`','`+row.tahun_perolehan+`',`+row.sumber_aset+`)"><i class="far fa-eye"></i> Detail</a>
                                        <a href="#"><i class="far fa-edit"></i> Edit</a>
                                        <a href="#"><i class="fas fa-trash-alt"></i> Hapus</a>
                                        <a href="#"><i class="fas fa-print"></i> Cetak</a>
                                      </div>
                                    </div>`;
                                  // `
                                  // <div class="row">
                                  // <div class="col-md-4">
                                  // <button type="button" class="btn btn-block btn-success btn-sm"><i class="far fa-eye"></i></button>
                                  // </div>
                                  // <div class="col-md-4">
                                  // <button type="button" class="btn btn-block btn-warning btn-sm"><i class="far fa-edit"></i></button>
                                  // </div>
                                  // <div class="col-md-4">
                                  // <button class="btn btn-block btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button>
                                  // </div>
                                  // </div>
                                  // `;

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

  function loadpejabat(){
      $.ajax({
          type: 'post',
          dataType: 'json',
          url: 'loadpejabat',
          data : {
                  param      : '',
           },
          success: function(result){
            var opt = '<option value="0">-Pilih Pejabat-</option>';
            for (var i = 0; i < result.length; i++) {
              opt += `<option value="`+result[i].id+`" jabatan="`+result[i].jabatan+`">`+result[i].nama_pejabat+`</option>`;
            }

            $('#nama_pejabat').html(opt);

                  var dt = $('#list-pejabat').DataTable({
                      responsive: true,
                      bDestroy: true,
                      processing: true,
                      // autoWidth : true,
                      pageLength: 10,
                      lengthChange: true,
                      aaData: result,
                      aoColumns: [
                          { 'mDataProp': 'id'},
                          { 'mDataProp': 'nama_pejabat'},
                          { 'mDataProp': 'nip_pejabat'},
                          { 'mDataProp': 'nik_pejabat'},
                          { 'mDataProp': 'deskripsi_jabatan'},
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
                window.location.href='provinsi';
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

    function modaldetail(id,varietas,bantuan,milik_aset,jml_aset,tahun_perolehan,sumber_aset,kordinat){
      $('#modal-detail').modal({
        show: true
      });

        $('#varietas').val(varietas).trigger("change");
        $('#bantuan_pemerintah').val(bantuan).trigger("change");
        $('#milik_aset').val(milik_aset).trigger("change");
        $('#jml_aset').val(jml_aset);
        $('#tahun_perolehan').val(tahun_perolehan);
        $('#sumber_aset').val(sumber_aset).trigger("change");
        $('#kordinat').val(kordinat);

    }
