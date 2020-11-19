$(document).ready(function(){
  $('#data_upload').attr('class','menu-open nav-item');
  $('#data_upload > a').attr('class','nav-link active');
  $('#rekap-kab').attr('class','nav-link active');
  $('#rekap-kab > i').attr('class','far fa-circle nav-icon text-danger');

    getData();
    function getData(){
        $.ajax({
            method:'POST',
            dataType:'JSON',
            url:'getData',
            data : { param: 'rekap' },
            success:function(result){

              var dt = $('#list-rekap').DataTable({
                  responsive: true,
                  bDestroy: true,
                  processing: true,
                  autoWidth : true,
                  pageLength: 10,
                  lengthChange: true,
                  scrollX: true,
                  aaData: result,
                  aoColumns: [
                    {"mDataProp":"id"},
                    {"mDataProp":"kabupaten"},
                    {"mDataProp":"kedelai_full_paket"},
                    {"mDataProp":"kedelai_non_phc"},
                    {"mDataProp":"kedelai_jumlah"},
                    {"mDataProp":"kacang_tanah_full_paket"},
                    {"mDataProp":"kacang_tanah_non_phc"},
                    {"mDataProp":"kacang_tanah_jumlah"},
                    {"mDataProp":"kacang_hijau_full_paket"},
                    {"mDataProp":"kacang_hijau_non_phc"},
                    {"mDataProp":"kacang_hijau_jumlah"},
                    {"mDataProp":"ubi_jalar"},
                    {"mDataProp":"jumlah_akabi"},
                  ],
                  order: [[0, 'ASC']],
                  // rowGroup: {
                  //     dataSrc: 'jenis'
                  // },
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


                  fnRowCallback: function(nRow, aData, iDisplayIndex, iDisplayIndexFull){
                      var index = iDisplayIndexFull + 1;
                      $('td:eq(0)', nRow).html(' '+index);
                      return  ;
                  },
              });
            }
        })
    }
    console.log('You are running jQuery version: ' + $.fn.jquery);
})
