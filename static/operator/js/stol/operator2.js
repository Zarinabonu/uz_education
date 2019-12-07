var  fileP1,fileP2,fileP3,fileP4;
$(function(){


    var avatar = 'noneAvatar';
    var wsurl = 'wss://127.0.0.1:8181';

    var ws = new WebSocket(wsurl);
    ws.onopen = function (data) {
        var x = document.getElementById("wsSuccess");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
    };
    ws.onerror = function(){
        var x = document.getElementById("wsError");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 5000);
    };


    $(".humanUpload1Button").click(function() {
        avatar = '.humanAvatar1';
        $('.avatar-upload__button label').removeClass('active');
        $('.humanCameraEdit__icon').removeClass('active');
        $(".humanUpload1Button").addClass('active');
        $(`.avatar-upload__button .pasport-icon img`).removeClass('pulse-anime');
        $(`${avatar} .avatar-upload__button .pasport-icon img`).addClass('pulse-anime');
    });
    $(".humanUpload2Button").click(function() {
        avatar = '.humanAvatar2';
        $('.avatar-upload__button label').removeClass('active');
        $('.humanCameraEdit__icon').removeClass('active');
        $(".humanUpload2Button").addClass('active');
        $(`.avatar-upload__button .pasport-icon img`).removeClass('pulse-anime');
        $(`${avatar} .avatar-upload__button .pasport-icon img`).addClass('pulse-anime');
    });
    $(".humanUpload3Button").click(function() {
        avatar = '.humanAvatar3';
        $('.avatar-upload__button label').removeClass('active');
        $('.humanCameraEdit__icon').removeClass('active');
        $(".humanUpload3Button").addClass('active');
        $(`.avatar-upload__button .pasport-icon img`).removeClass('pulse-anime');
        $(`${avatar} .avatar-upload__button .pasport-icon img`).addClass('pulse-anime');
    });
    $(".humanUpload4Button").click(function() {
        avatar = '.humanAvatar4';
        $('.avatar-upload__button label').removeClass('active');
        $('.humanCameraEdit__icon').removeClass('active');
        $(".humanUpload4Button").addClass('active');
        $(`.avatar-upload__button .pasport-icon img`).removeClass('pulse-anime');
        $(`${avatar} .avatar-upload__button .pasport-icon img`).addClass('pulse-anime');
    });
    function readUrlImage(avatar, data){
        $(`${avatar} #passportPreview`).css('background-image', 'url('+'data:image/jpg;base64,'+data +')');
        $(`${avatar} > a`).attr("href", `data:image/jpg;base64,${data}`);
        $(`${avatar} .avatar-edit input`).attr("value", `data:image/jpg;base64,${data}`);
        $(`${avatar} #passportPreview`).hide();
        $(`${avatar} .humanCameraEdit__icon`).fadeIn(650);
        $(`${avatar} #passportPreview`).fadeIn(650);
        $(`${avatar} .avatar-upload__button`).fadeOut(650);
    }
    ws.onmessage = function(e) {
        var data = e.data;
        //console.log(e.data);
        var image = new Image();
        base64_string = 'data:image/jpg;base64,'+e.data;
        image.src = 'data:image/jpg;base64,'+e.data;
        readUrlImage(avatar, e.data);
        //document.body.appendChild(image);
        const url = base64_string;
        var input = undefined;
        fetch(url)
            .then(res => res.blob())
            .then(blob => {
                var file;
                switch (avatar) {

                    case '.humanAvatar1':
                        file = new File([blob], "photo_1.jpg", {type: 'image/jpeg'});
                        fileP1 = file;
                        break;
                    case '.humanAvatar2':
                        file = new File([blob], "photo_2.jpg", {type: 'image/jpeg'});
                        fileP2 = file;
                        break;
                    case '.humanAvatar3':
                        file = new File([blob], "photo_3.jpg", {type: 'image/jpeg'});
                        fileP3 = file;
                        break;
                    case '.humanAvatar4':
                        file = new File([blob], "photo_4.jpg", {type: 'image/jpeg'});
                        fileP4 = file;
                        break;
                }

            // $("#photo_1ID").files[0];
            console.log(file);
        });
    };

    function readURL(avatarcha, input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            var avatar_item = '.' + avatarcha;
            reader.onload = function(e) {
                $(`${avatar_item} #passportPreview`).css('background-image', 'url('+e.target.result +')');
                $(`${avatar_item} > a`).attr("href", `${e.target.result}`);
                $(`${avatar_item} #passportPreview`).hide();
                $(`${avatar_item} .humanCameraEdit__icon`).fadeIn(650);
                $(`${avatar_item} #passportPreview`).fadeIn(650);
                $(`${avatar_item} .avatar-upload__button`).fadeOut(650);
            };
            reader.readAsDataURL(input.files[0]);
            switch (avatarcha) {
                case 'humanAvatar1': fileP1 = input.files[0]; break;
                case 'humanAvatar2': fileP2 = input.files[0]; break;
                case 'humanAvatar3': fileP3 = input.files[0]; break;
                case 'humanAvatar4': fileP4 = input.files[0]; break;

            }
        }
    }
    $("#photo_1ID").change(function() {
        readURL('humanAvatar1', this);
    });
    $("#photo_2ID").change(function() {
        readURL('humanAvatar2', this);
    });
    $("#photo_3ID").change(function() {
        readURL('humanAvatar3', this);
    });
    $("#photo_4ID").change(function() {
        readURL('humanAvatar4', this);
    });

    $(document).ready(function(){
        $("#search").focus(function() {
            $(".search-box").addClass("border-searching");
            $(".search-icon").addClass("si-rotate");
        });
        $("#search").blur(function() {
            $(".search-box").removeClass("border-searching");
            $(".search-icon").removeClass("si-rotate");
        });
        $("#search").keyup(function() {
            if($(this).val().length > 0) {
                $(".go-icon").addClass("go-in");
            }
            else {
                $(".go-icon").removeClass("go-in");
            }
        });
        $(".go-icon").click(function(){
            $(".search-form").submit();
        });
    });

    const MONTHS = {
        0: 'Jan',
        1: 'Feb',
        2: 'Mar',
        3: 'Apr',
        4: 'May',
        5: 'Jun',
        6: 'Jul',
        7: 'Aug',
        8: 'Sep',
        9: 'Oct',
        10: 'Nov',
        11: 'Dec'
    };
    let showTime = true;

    function addZero(val) {
        return val < 10 ? '0' + val : val;
    }

    function refresh() {
        let now = new Date();
        if (showTime) {
            let time = [now.getHours(), now.getMinutes(), now.getSeconds()];
            time.forEach(function(val, index, arr) {
                arr[index] = addZero(val);
            });

            let time_str = time.join(":");
            //document.title = time_str;
            document.getElementById('time').innerHTML = time_str;
        } else {
            let date = [addZero(now.getDay()), MONTHS[now.getMonth()], now.getFullYear().toString().slice(2, 4)];
            let date_str = date.join(" ");
            //document.title = date_str;
            document.getElementById('time').innerHTML = date_str;
        }
    }

    refresh();
    setInterval(refresh, 1000);

    document.getElementById('time').addEventListener('click', function() {
        showTime = !showTime;
        refresh();
    });
});
$(function () {
   $("#operator-2-submit").click(function (event) {
       event.preventDefault();
       let formData = new FormData();
       formData.append("appearance", $("input[name='appearance']:checked").val());
       formData.append("neatness", $("input[name='neatness']:checked").val());
       formData.append("skin", $("input[name='skin']:checked").val());
       formData.append("height", $("#heightID").val());
       formData.append("weight", $("#weightID").val());
       formData.append("fatness", $("#fatnessID").val());
       formData.append("blood_group", $("input[name='blood_group']:checked").val());
       formData.append("blood_resus", $("input[name='blood_resus']:checked").val());
       formData.append("vision_l", $("#vision_lID").val());
       formData.append("vision_r", $("#vision_rID").val());
       formData.append("photo_1", fileP1);
       formData.append("photo_2", fileP2);
       formData.append("photo_3", fileP3);
       formData.append("photo_4", fileP4);
       $.ajax({
           url: $("#operator-2-submit").data("url"),
           data: formData,
           type: "PUT",
           contentType: false,
           processData: false,
           success: function (data) {
               var x = document.getElementById("mainSuccess");
               x.className = "show";
               setTimeout(function(){
                   x.className = x.className.replace("show", "");
                   window.location.href = '/operator/2/1op';
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
