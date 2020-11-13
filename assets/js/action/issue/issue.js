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
})