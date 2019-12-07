$(function () {
    function readURL(avatar, input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            var avatar_item = '.' + avatar;
            reader.onload = function(e) {
                $(`${avatar_item} #passportPreview`).css('background-image', 'url('+e.target.result +')');
                $(`${avatar_item} #passportPreview`).hide();
                $(`${avatar_item} #passportPreview`).fadeIn(650);
                $(`${avatar_item} .avatar-upload__button`).fadeOut(650);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#photo_1ID").change(function() {
        readURL('photo_1ID', this);
    });
    $("#photo_2ID").change(function() {
        readURL('photo_2ID', this);
    });
    $("#photo_3ID").change(function() {
        readURL('photo_3ID', this);
    });
    $("#photo_4ID").change(function() {
        readURL('photo_4ID', this);
    });

    $("#root-employee-update2-submit").click(function (event) {
       event.preventDefault();
       let $formData = new FormData();
       let url = $(this).data("url");

       $formData.append("appearance", $("input[name='appearance']:checked").val());
       $formData.append("neatness", $("input[name='neatness']:checked").val());
       $formData.append("skin", $("input[name='skin']:checked").val());
       $formData.append("height", $("input[name='height']").val());
       $formData.append("weight", $("input[name='weight']").val());
       $formData.append("fatness", $("input[name='fatness']").val());
       $formData.append("blood_group", $("input[name='blood_group']:checked").val());
       $formData.append("blood_resus", $("input[name='blood_resus']:checked").val());
       $formData.append("vision_l", $("input[name='vision_l']").val().replace(',', '.'));
       $formData.append("vision_r", $("input[name='vision_r']").val().replace(',', '.'));
       $formData.append("photo_1", $("input[name='photo_1']")[0].files[0]);
       $formData.append("photo_2", $("input[name='photo_2']")[0].files[0]);
       $formData.append("photo_3", $("input[name='photo_3']")[0].files[0]);
       $formData.append("photo_4", $("input[name='photo_4']")[0].files[0]);

       $.ajax({
           url: url,
           data: $formData,
           type: "PUT",
           processData: false,
           contentType: false,
           success: function (data) {
               // $(".holder").removeClass("active");
               var x = document.getElementById("mainSuccess");
                x.className = "show";
                setTimeout(function(){
                    x.className = x.className.replace("show", "");
                    location.reload();
                }, 1500);
           },
           error: function (data) {
               // $(".holder").removeClass("active");
               var x = document.getElementById("mainError");

               x.className = "show";
               setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
           },
       });
   })
});
