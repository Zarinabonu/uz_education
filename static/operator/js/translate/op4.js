$(function () {
    $("#root-employee-translate4-button").click(function (event) {
        event.preventDefault();
        let url = $(this).data('url');
        let formData = new FormData();
        formData.append("criminal_comment_en", $("textarea[name='criminal_comment_en']").val());
        formData.append("add_spec_signs_en", $("input[name='add_spec_signs_en']").val());
        formData.append("hobby_en", $("input[name='hobby_en']").val());
        formData.append("other_en", $("textarea[name='other_en']").val());

        $.ajax({
            url: url,
            data: formData,
            type: "PUT",
            contentType: false,
            processData: false,
            success: function (data) {
                //console.log(data);
                var x = document.getElementById("mainSuccess");
                x.className = "show";
                setTimeout(function(){
                    x.className = x.className.replace("show", "");
                    location.reload();
                }, 1500);
            },
            error: function (data) {
                var x = document.getElementById("mainError");

                x.className = "show";
                setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
            }
        });
    });
});