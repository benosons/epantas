$( document ).ready(function() {
  console.log('You are running jQuery version: ' + $.fn.jquery);
    $('#dash > a').attr('class','nav-link active');
    // $.ajax({
    //   method:'GET',
    //   dataType:'JSON',
    //   url:'listIssue',
    //   success:function(result){
    //     var i = 0;
    //     var html = "";
    //     for(i; i<result.length; i++)
    //     {
    //       html += "<div class='col-md-6 d-flex align-items-stretch'>";
    //       html += "<div class='card' style='background-image: url('{{base_url}}"+result.file+"');'>";
    //       html += "<div class='card-body'>";
    //       html += "<h5 class='card-title'><a href=''>"+result.judul+"</a></h5>";
    //       html += "<p class='card-text'>"+result.deskripsi+"</p>";
    //       html += "<"
    //     }
    //   }
    // })
});
