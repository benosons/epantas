$(document).ready(function(){
  $('#data_upload').attr('class','menu-open nav-item');
  $('#data_upload > a').attr('class','nav-link active');
  $('#penerima-bantuan').attr('class','nav-link active');
  $('#penerima-bantuan > i').attr('class','far fa-circle nav-icon text-danger');

    getData();
    function getData(){
        $.ajax({
            method:'POT',
            dataType:'JSON',
            url:'getData',
            success:function(result){
              var dt = $('#list-bantuan').DataTable({
                  responsive: true,
                  bDestroy: true,
                  processing: true,
                  autoWidth : true,
                  pageLength: 10,
                  lengthChange: true,
                  scrollX: true,
                  aaData: result,
                  aoColumns: [
                    {"mDataProp":"no"},
                    {"mDataProp":"nama_kabupaten"},
                    {"mDataProp":"kelompok_tani"},
                    {"mDataProp":"kecamatan"},
                    {"mDataProp":"desa"},
                    {"mDataProp":"nama"},
                    {"mDataProp":"nik"},
                    {"mDataProp":"no_hp"},
                    {"mDataProp":"jml_anggota"},
                    {"mDataProp":"luas"},
                    {"mDataProp":"jenis_lahan"},
                    {"mDataProp":"benih"},
                    {"mDataProp":"varietas"},
                    {"mDataProp":"pupuk"},
                    {"mDataProp":"rhizobium"},
                    {"mDataProp":"herbisida"},
                    {"mDataProp":"jadwal"},
                    {"mDataProp":"provitas_existing"},
                    {"mDataProp":"provitas_target"}
                  ],
                  order: [[1, 'DESC']],
                  rowGroup: {
                      dataSrc: 'nama_kabupaten'
                  },
                  aoColumnDefs:[
                        {
                          "targets": [0],
                          "orderable": false
                        },
                  //     {
                  //         "targets": [ 5,6,7,8,9,10 ],
                  //         "visible": false
                  //     },
                  //     {
                  //         mRender: function (data, type, row){
                  //             var $rowData = '';
                  //                 $rowData += `
                  //                           <div class="row">
                  //                             <div class="col-md-4">
                  //                               <button onclick="modaldetail('`+row.namaBadanHukum+`','`+row.pimpinan+`','`+row.alamat+`','`+row.email+`','`+row.frekuensi+`','`+row.wilayahLayanan+`','`+row.kontak+`','`+row.koor+`')" type="button" class="btn btn-block btn-success btn-sm"><i class="far fa-eye"></i></button>
                  //                             </div>
                  //                             <div class="col-md-4">
                  //                               <button onclick="editlembaga(`+row.id+`,'`+param+`')" type="button" class="btn btn-block btn-warning btn-sm"><i class="far fa-edit"></i></button>
                  //                             </div>
                  //                             <div class="col-md-4">
                  //                               <button type="button" class="btn btn-block btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button>
                  //                             </div>
                  //                           </div>
                  //                             `;
                  //
                  //             return $rowData;
                  //         },
                  //         aTargets: [4]
                  //     },
                  ],


                  // fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull){
                  //     var index = iDisplayIndexFull + 1;
                  //     $('td:eq(0)', nRow).html(' '+index);
                  //     return  ;
                  // },
              });
            }
        })
    }
    console.log('You are running jQuery version: ' + $.fn.jquery);
})
