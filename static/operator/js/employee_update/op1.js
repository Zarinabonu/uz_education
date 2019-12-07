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

$(function () {
    $("#phone").inputmask({
        "mask": "+998-dd-ddd-dddd"
    });
    $("#inn").inputmask({
        "mask": "ddddddddd"
    });
    $("#passportSerial").inputmask({
        "mask": "AA ddddddd"
    });
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
    });

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

    $("#adminEmployeeUpdate1SubmitButton").click(function (event) {
        event.preventDefault();
        let $formData = new FormData();
        let url = $(this).data("url");
        $formData.append("full_name_en", $("input[name='full_name_en']").val());
        $formData.append("full_name_ru", $("input[name='full_name_ru']").val());
        $formData.append("passport_serial", $("input[name='passport_serial']").val());
        $formData.append("passport_given_date", dateMyFormat($("input[name='passport_given_date']").val()));
        $formData.append("passport_expires", dateMyFormat($("input[name='passport_expires']").val()));
        $formData.append("passport_image", $("input[name='passport_file']")[0].files[0]);
        $formData.append("birth_date", dateMyFormat($("input[name='birth_date']").val()));
        $formData.append("birth_place_ru", $("input[name='birth_place']").val());
        $formData.append("lives_at_ru", $("input[name='lives_at']").val());
        $formData.append("gender", $("input[name='gender']:checked").val());
        $formData.append("inn", $("input[name='inn']").val());
        $formData.append("phone", $("input[name='phone']").val());
        $formData.append("email", $("input[name='email']").val());
        $formData.append("register_number", $("input[name='register_number']").val());

        $.ajax({
            url: url,
            data: $formData,
            type: "PUT",
            contentType: false,
            processData: false,
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
});
