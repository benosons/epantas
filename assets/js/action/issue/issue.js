$(document).ready(function(){
    $('#add-issue').click(function(){
        window.location.href="addIssue";
    });
    ClassicEditor.create( document.querySelector( '#deskripsi' ),{
        toolbar: {
            items: [
                'heading',
                '|',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                '|',
                '|',
                'blockQuote',
                'insertTable',
                'undo',
                'redo'
            ]
        },
        language: 'en',
        table: {
            contentToolbar: [
                'tableColumn',
                'tableRow',
                'mergeTableCells'
            ]
        },
    })
    .catch( error => {
        console.error( error );
    } );

    $('#formIssue').submit(function(e){
        e.preventDefault(); 
        if ($('file').val()) {
            alert('Masukan file');
        }else{
            $.ajax({
                url:'createIssue',
                type:"post",
                data:new FormData(this),
                processData:false,
                contentType:false,
                cache:false,
                async:false,
                success: function(data){
                    Swal.fire({
                        title: 'Sukses!',
                        text: data.pesan,
                        icon: 'success',
                        showConfirmButton: true,
                        confirmButtonText: '<i class="fas fa-check"></i>'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                }
            });
        }
    });
})