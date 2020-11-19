$(document).ready(function(){
  $('#data_upload').attr('class','menu-open nav-item');
  $('#data_upload > a').attr('class','nav-link active');
  $('#laporan-kegiatan').attr('class','nav-link active');
  $('#laporan-kegiatan > i').attr('class','far fa-circle nav-icon text-danger');

    getData();
    function getData(){
        $.ajax({
            method:'POST',
            dataType:'JSON',
            url:'getData',
            data : { param: 'laporan' },
            success:function(result){

              var dt = $('#list-kegiatan').DataTable({
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
                    {"mDataProp":"jenis"},
                    {"mDataProp":"kabupaten"},
                    {"mDataProp":"jumlah_kec"},
                    {"mDataProp":"jumlah_desa"},
                    {"mDataProp":"jumlah_poktan"},
                    {"mDataProp":"sasaran_areal"},
                    {"mDataProp":"sk_penetapan"},
                    {"mDataProp":"realisasi_kontrak"},
                    {"mDataProp":"realisasi_distribusi"},
                    {"mDataProp":"apr"},
                    {"mDataProp":"mei"},
                    {"mDataProp":"juni"},
                    {"mDataProp":"juli"},
                    {"mDataProp":"ags"},
                    {"mDataProp":"sep"},
                    {"mDataProp":"okt"},
                    {"mDataProp":"nop"},
                    {"mDataProp":"des"},
                    {"mDataProp":"jumlah"},
                    {"mDataProp":"realisasi_panen_luas"},
                    {"mDataProp":"realisasi_panen_produktivitas"},
                    {"mDataProp":"realisasi_panen_produksi"},
                    {"mDataProp":"tidak_dilaksanakan"},
                    {"mDataProp":"provitas_sebelum"},
                    {"mDataProp":"ket"},
                  ],
                  order: [[1, 'DESC']],
                  rowGroup: {
                      dataSrc: 'jenis'
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
