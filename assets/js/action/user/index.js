$( document ).ready(function() {
  console.log('You are running jQuery version: ' + $.fn.jquery);
});


function detailissue(id){
  $('#modal-detail').modal({backdrop: 'static', keyboard: false})  

  $('#modal-detail').modal({
    show: true
  });
}
