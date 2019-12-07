$(function () {
    $('.deleteButton').click(function (e) {
        e.preventDefault();

        let f = new FormData();
        f.append('model_name', $(this).data('model-name'));
        f.append('model_id', $(this).data('model-id'));
        let url = $(this).data('url');
        $.ajax({
            url: url,
            type: 'POST',
            data: f,
            processData: false,
            contentType: false,
            success: successDeleted,
            error: unsuccessDeleted
        });
    });
});

function successDeleted(data) {
    window.location.reload(true);
}

function unsuccessDeleted(data) {
    window.location.reload(true);
}
