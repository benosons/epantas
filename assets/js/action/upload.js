$('.select2').select2();
$('#nama_file').on('change', function() {
    if(this.value == 'evaluasi_pemanfaatan_sarana_uph.xlsx'){
      $('#kabupaten_kota').attr('disabled', false);
    }else{
      $('#kabupaten_kota').attr('disabled', true);
    }
  });

$(document).ready(function(){




$('.fileinput-upload').on('click', function(){
  var formData = new FormData();
  var files = $('#file-4')[0].files;

  formData.append('file_data',files[0]);
  formData.append('nama_file',$('#nama_file').val());
  formData.append('bulan', $('#bulan').val());
  formData.append('tahun',$('#tahun').val());
  formData.append('kabupaten_kota',$('#kabupaten_kota').val());
  console.log(files[0]['name'].split(' ').join('_').toLowerCase());
  if($('#nama_file').val() == '0'){
    Swal.fire(
        'Pilih Nama File.',
        'Silahkan Pilih Sesuai Nama yang ditentukan.',
        'question'
      );
      return;
  };

  if($('#bulan').val() == '0'){
    Swal.fire(
        'Pilih Bulan Data.',
        'Silahkan Pilih Sesuai Bulan.',
        'question'
      );
      return;
  };

  if($('#tahun').val() == ""){
    Swal.fire(
        'Pilih Tahun Data.',
        'Silahkan Pilih Sesuai Tahun.',
        'question'
      );
      return;
  };

  if(files[0]['name'].split(' ').join('_').toLowerCase() != $('#nama_file').val() ){
    Swal.fire(
        'Nama File Tidak Sesuai.',
        'Silahkan Pilih Sesuai Nama yang ditentukan.',
        'question'
      );
      return;
  };


  $.ajax({
      url:'form',
      type: 'post',
      data: formData,
      contentType: false,
      processData: false,
      success:function(result){
        Swal.fire({
          title: 'Sukses!',
          text: "Berhasil Upload Excell",
          icon: 'success',
          showConfirmButton: true,
          confirmButtonText: '<i class="fas fa-check"></i>'
        }).then((result) => {
        if (result.isConfirmed) {
          location.reload();
          }
        });
      }
  })
});

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
});
