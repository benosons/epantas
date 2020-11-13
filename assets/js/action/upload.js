$(document).ready(function(){
    getData();
    function getData(){
        $.ajax({
            method:'GET',
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
    $('#list-pangan').DataTable({
        responsive: true
    });
    new $.fn.dataTable.FixedHeader( table );
    console.log('You are running jQuery version: ' + $.fn.jquery);
})