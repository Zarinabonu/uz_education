
    $("#phone").inputmask({
        "mask": "+998-dd-ddd-dddd"
    });
    $("#inn").inputmask({
        "mask": "ddddddddd"
    });
    $("#passportSerial").inputmask({
        "mask": "AA ddddddd"
    });

    function dateMyFormat(date) {
        var elem = date.split('.');
        var newMyDate = elem[2] + '-' + elem[1] + '-' + elem[0];
        //console.log(newMyDate);
        if(date){
            return newMyDate;
        }else{
            return '';
        }
    }

    (function($){
        $.fn.datepicker.dates['ru'] = {
            days: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
            daysShort: ["Вск", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Суб"],
            daysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
            months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
            monthsShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
            today: "Сегодня",
            clear: "Очистить",
            format: "dd.mm.yyyy",
            weekStart: 1,
            monthsTitle: 'Месяцы'
        };
    }(jQuery));
    (function($){
        $.fn.datepicker.dates['uz-latn'] = {
            days: ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"],
            daysShort: ["Yak", "Du", "Se", "Chor", "Pay", "Ju", "Sha"],
            daysMin: ["Ya", "Du", "Se", "Cho", "Pa", "Ju", "Sha"],
            months: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"],
            monthsShort: ["Yan", "Fev", "Mar", "Apr", "May", "Iyn", "Iyl", "Avg", "Sen", "Okt", "Noy", "Dek"],
            today: "Bugun",
            clear: "O'chirish",
            format: "dd.mm.yyyy",
            weekStart: 1,
            monthsTitle: 'Oylar'
        };
    }(jQuery));

    $(function () {
      $(".datepickerFrom").datepicker({
          autoclose: true,
          language: 'ru',
          todayHighlight: true
      });
    });

    var scanCheck = false;

    $(function(){
        var wsurl = 'wss://127.0.0.1:8282/';
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

        function readUrlImage(avatar, data){
            $(`${avatar} #passportPreview`).css('background-image', 'url('+'data:image/jpg;base64,'+data +')');
            $(`${avatar} > a`).attr("href", `data:image/jpg;base64,${data}`);
            $(`${avatar} .avatar-edit input`).attr("value", `data:image/jpg;base64,${data}`);
            $(`${avatar} #passportPreview`).hide();
            $(`${avatar} #passportPreview`).fadeIn(650);
            $(`${avatar} .avatar-upload__button`).fadeOut(650);
        }

        ws.onmessage = function(e) {
            var data = JSON.parse(e.data);

            $("#fullNameEn").val(data.first_name + " " + data.last_name);
            $("#birthDate").val(new Date(data.birth_date).toShortFormat());
            $("#passportExpires").val(new Date(data.expiry_date).toShortFormat());
            $("#passportSerial").val(data.serial);
            readUrlImage('.avatar-upload', data.image);

            if (data.sex === "M") {
                $("#gender_female").attr("checked", false);
                $("#gender_male").attr("checked", true);
            } else if (data.sex === "F") {
                $("#gender_male").attr("checked", false);
                $("#gender_female").attr("checked", true);
            }

            scanCheck = true;

        };

        function readURL(input) {
            if (input.files && input.files[0]) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    $('#passportPreview').css('background-image', 'url('+e.target.result +')');
                    $(`.avatar-upload > a`).attr("href", `${e.target.result}`);
                    $('#passportPreview').hide();
                    $('#passportPreview').fadeIn(650);
                    $('.avatar-upload__button').fadeOut(650);
                };
                reader.readAsDataURL(input.files[0]);
            }
        }
        $("#passportUpload").change(function() {
            readURL(this);
            scanCheck = false;
        });

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


Date.prototype.toShortFormat = function() {

    var month_names =["01","02","03",
        "04","05","06",
        "07","08","09",
        "10","11","12"];

    var day = this.getDate();
    var month_index = this.getMonth();
    var year = this.getFullYear();

    if (day < 10) {
        day = "0" + day;
    }

    return year + "-" + month_names[month_index] + "-" + day
    // return "" + day + "-" + month_names[month_index] + "-" + year;
};

$("#formSendButton").click(function (event) {

    event.preventDefault();

    $(".holder").addClass("active");

    let formData = new FormData();

    // if ($("#sendSMS").attr("checked") !== undefined) {
    //     formData.append("send_sms", "1");
    // }
    // if ($("#sendEmail").attr("checked") !== undefined) {
    //     formData.append("send_email", "1");
    // }
    if ($("input[name='send_sms']:checked") !== undefined) {
        formData.append("send_sms", "1");
    }
    if ($("input[name='send_email']:checked") !== undefined) {
        formData.append("send_email", "1");
    }
    function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }

    if(scanCheck){
        var ImageURL  = $("#passportUpload").attr('value');
        var block = ImageURL.split(";");
        // Get the content type
        var contentType = 'image/jpg';// In this case "image/gif"
        // get the real base64 content of the file
        var realData = block[1].split(",")[1];// In this case "iVBORw0KGg...."

        // Convert to blob
        var blob = b64toBlob(realData, contentType);
        var passportCopy = new File([blob], 'passportCopy.jpg', {type: contentType});

        formData.append("passport_image", passportCopy);
    }else{
        formData.append("passport_image", $("input[name='passport_file']")[0].files[0]);
    }

    formData.append("full_name_en", $("#fullNameEn").val());
    formData.append("full_name_ru", $("#fullNameRu").val());
    formData.append("birth_date", dateMyFormat($("#birthDate").val()));
    formData.append("phone", $("#phone").val());
    formData.append("email", $("#email").val());
    formData.append("gender", $("input[name='gender']:checked").val());
    formData.append("passport_serial", $("#passportSerial").val());
    formData.append("passport_given_date", dateMyFormat($("#passportGivendate").val()));
    formData.append("passport_expires", dateMyFormat($("#passportExpires").val()));
    formData.append("inn", $("#inn").val());
    formData.append("birth_place_ru", $("#birthPlace").val());
    formData.append("living_address_ru", $("#livesAt").val());
    formData.append("register_number", $("#registerNumber").val());
    formData.append("group_id", $("#group-id").val());
    formData.append("username", $("#login").val());

    $.ajax({
        url: $(this).data('url'),
        // url: 'http://localhost:5151/create/applicant',
        data: formData,
        processData: false,
        contentType: false,
        type: "POST",
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
});

/*$("#passportUpload").change(function (event) {
    event.preventDefault();
    let formData = new FormData();

    $(".holder").addClass("active");

    formData.append("passport", $(this)[0].files[0]);

    $.ajax({
        url: "https://mrz.uzncd.com/passport-reader",
        processData: false,
        contentType: false,
        type: "POST",
        data: formData,
        success: function (data) {
            $(".holder").removeClass("active");
            console.log(data);
            console.log(typeof data);

            if (data.error) {
                alert("Accured an error while reading the passport, make sure that passport image quality is good!");
            }

            $("#fullNameEn").val(data.first_name + " " + data.last_name);
            $("#birthDate").val(new Date(data.birth_date).toShortFormat());
            $("#passportExpires").val(new Date(data.expires).toShortFormat());
            $("#passportSerial").val(data.serial_number);

            if (data.gender === "M") {
                $("#gender_female").attr("checked", false);
                $("#gender_male").attr("checked", true);
            } else if (data.gender === "F") {
                $("#gender_male").attr("checked", false);
                $("#gender_female").attr("checked", true);
            }

        },
        error: function (data) {
            console.log(data);
        }
    });

});*/



// file.addEventListener('change', function () {
//
//     formData = new FormData();
//
//     formData.append("passport_file", $("#passportUpload").files[0]);
//
//     formData.append("full_name_en", $("#full_name_en").val());
//     formData.append("full_name_ru", $("#fullNameRu").val());
//     formData.append("birth_date", $("#birthDate").val());
//     formData.append("phone", $("#phone").val());
//     formData.append("email", $("#email").val());
//     formData.append("gender", $("input[name='gender']").val());
//     formData.append("passport_serial", $("#passportSerial").val());
//     formData.append("passport_given_date", $("#passportGivendate").val());
//     formData.append("inn", $("#inn").val());
//     formData.append("birth_place", $("#birthPlace").val());
//     formData.append("lives_at", $("#livesAt").val());
//     formData.append("register_number", $("#registerNumber").val())
//
//
//     $.ajax({
//         url: "",
//         data: formData,
//         processData: false,
//         contentType: false,
//         type: "POST",
//         success: function (data) {
//             console.log("success");
//         },
//         error: function (data) {
//             console.log("error");
//         },
//     });
//
//
//
//     //
//     // f = new FormData();
//     // f.append("passport", file.files[0]);
//     //
//     // var request = new XMLHttpRequest();
//     //
//     // request.onreadystatechange = function () {
//     //     let preNew = document.querySelector('.preloader-new');
//     //     preNew.style.display = 'flex';
//     //
//     //     if (this.readyState == 4 && this.status == 200) {
//     //         var response = JSON.parse(this.responseText);
//     //         console.log(response);
//     //
//     //         var fullNameEn = document.querySelector('#fullNameEn').value = response.first_name + " " + response.last_name;
//     //         var serialNumber = document.querySelector('#serialPassport').value = response.serial_number;
//     //         var birthDate = document.querySelector('#birthDate').value = new Date(response.birth_date).toShortFormat();
//     //         var inn = document.querySelector('#inn').value = '302730670';
//     //         var expires = document.querySelector('#expires').value = new Date(response.expires).toShortFormat();
//     //         var regNumber = document.querySelector('#regNumber').value = '';
//     //         preNew.style.display = 'none';
//     //
//     //         if (response.gender === "M") {
//     //             gender_M = document.querySelector('#radio_7').checked = true;
//     //         } else if (response.gender === "F") {
//     //             gender_M = document.querySelector('#radio_8').checked = true;
//     //         }
//     //     }
//     // };
//     //
//     // request.open('POST', 'http://192.168.1.118:8082/passport-reader');
//     // request.send(f)
// });

// $(document).ready(function($){
//     let rmBtn = document.getElementById('removeBtn');
//
//     rmBtn.addEventListener('click', function () {
//         let psForm = document.querySelector('#form-passport');
//         psForm.reset();
//     })
// });

    /*
        var checkInpFields = document.querySelectorAll('.inpFields');
        var BtnSave = document.querySelector('#btnDangerForm');
        var modalWindow = document.querySelector('#modal__window');
    */

// var sendFormDate = document.querySelector('#sendFormDate').addEventListener('click', () => {
//     var errors = {};
//
//     for (var i = 0; i < checkInpFields.length; i++){
//         if (checkInpFields[i].value.length === 0) {
//             errors[checkInpFields[i].getAttribute("id")] = checkInpFields[i].getAttribute("id")
//         }else{
//             var formData = new FormData();
//             formData.append(checkInpFields[i].getAttribute("id"), checkInpFields[i].value);
//
//             // console.log(checkInpFields[i].value);
//             // dataForm.append("test", 11);
//
//         }
//     }
//     for (var key of formData.entries()) {
//         console.log(key[0] + ', ' + key[1]);
//     }
//     // request.open('POST', 'http://192.168.1.118/step-1');
//     // request.send(dataForm)
// });

// var cancelBtn = document.querySelector('#cancel').addEventListener('click', () => {
//     modalWindow.style.display = 'none';
// });

// BtnSave.addEventListener('click', () => {
//     modalWindow.style.display = 'flex';
// });

// function checkInpFields(obj){
//     for (var i = 0; i < checkInpFields.length; i++){
//         if (checkInpFields[i].value.length === 0) {
//             console.log('code stop')
//         }
//     }
// }
//
// function addApplicant(obj){
//     var tabsApplicant = document.querySelector('#tabsApplicant');
//     console.log(obj);
// }
//
// $("#passportUpload").change(function(event) {
//     alert(11);
// });
