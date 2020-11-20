$(document).ready(function(){

  $('#upload > a').attr('class','nav-link active');

    function getData(){
        $.ajax({
            method:'POT',
            dataType:'JSON',
            url:'getData',
            success:function(result){
                $('#list-pangan').DataTable({
                    responsive: true,
                    data: result
                });
                console.log(result);
                new $.fn.dataTable.FixedHeader( table );
            // $('#list-pangan').html($html);
            }
        })
    }

    console.log('You are running jQuery version: ' + $.fn.jquery);
})
