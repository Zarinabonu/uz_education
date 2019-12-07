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
$(function () {



   $("#form4Send").click(function (event) {
       event.preventDefault();

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

       let formData = new FormData();
       formData.append("wages", $("input[name='wages']:checked").val());
       formData.append("is_ready_for_universitet", $("input[name='to_university']:checked").val());
       formData.append("criminal_number", $("input[name='criminal_number']").val());
       formData.append("criminal_issue", dateMyFormat($("input[name='criminal_issue']").val()));
       formData.append("criminal_comment_ru", $("textarea[name='criminal_comment']").val());
       formData.append("add_spec_signs_ru", $("input[name='add_spec_signs']").val());
       formData.append("hobby_ru", $("input[name='hobby']").val());
       formData.append("other_ru", $("textarea[name='other']").val());
       formData.append("country", $("select[name='des_countries']").val());
       formData.append("psycholog", $("input[name='psixolog']:checked").val());
       formData.append("level", $("input[name='level']:checked").val());


       if(scanCheck){
           var ImageURL  = $("#fingerPrint").attr('value');
           var block = ImageURL.split(";");
           // Get the content type
           var contentType = 'image/jpg';// In this case "image/gif"
           // get the real base64 content of the file
           var realData = block[1].split(",")[1];// In this case "iVBORw0KGg...."

           // Convert to blob
           var blob = b64toBlob(realData, contentType);
           var fingerPrint = new File([blob], 'fingerPrint.jpg', {type: contentType});

           formData.append("fingerprint", fingerPrint);
       }else{

       }
       /*var countries = $("input[name='des_countries']:checked");

       for (let i = 0; i < countries.length; i++) {
           formData.append("country", countries[i].value);
       }*/
       // console.log($(this).data("url"));
       $.ajax({
           url: $(this).data("url"),
           data: formData,
           type: "PUT",
           contentType: false,
           processData: false,
           success: function (data) {
               var x = document.getElementById("mainSuccess");
               x.className = "show";
               setTimeout(function(){
                   x.className = x.className.replace("show", "");
                   window.location.href = '/operator/4/3op';
               }, 1500);
           },
           error: function (data) {
               //console.log(data);
               var x = document.getElementById("mainError");

               x.className = "show";
               setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
           }
       });
   });
});