$('#btn-like').click(function(e){
    e.preventDefault();
    let imgId = $(this).data('id');
    //console.log(imgId);
    $.post('/images/' + imgId + '/like')
        .done(data => {
            console.log(data);
            $('.likes-count').text(data.likes);
        });
});