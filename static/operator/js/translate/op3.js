$(function () {
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

FilePond.registerPlugin(

    // encodes the file as base64 data
  FilePondPluginFileEncode,

    // validates the size of the file
    FilePondPluginFileValidateSize,

    // corrects mobile image orientation
    FilePondPluginImageExifOrientation,

    // previews dropped images
  FilePondPluginImagePreview
);
FilePond.setOptions({
    instantUpload: false
});
 fEdu = new Array();
 fLang = new Array();
 fMil = new Array();
 fRec = new Array();
 fMar = new Array();
 fRel = new Array();
 fExp = new Array();

var edu_count = parseInt($("input[name='edu_count']").val());
var army_count = parseInt($("input[name='army_count']").val());
// var fam_count = parseInt($("input[name='fam_count']").val());
var reward_count = parseInt($("input[name='reward_count']").val());
var rel_count = parseInt($("input[name='rel_count']").val());
var exp_count = parseInt($("input[name='exp_cout']").val());
var lang_count = parseInt($("input[name='lang_count']").val());

// Edu files
for (let i = 1; i < edu_count + 1; i++){
    let edu_file_count = parseInt($(`.education-item__${i}`).data('files-count'));
    let file_url = new Array();
    for (let j = 1; j < edu_file_count + 1; j++) {
        file_url[j] = $(`input.filepondEducation${i}`).data(`file-url-${j}`);
    }
    fEdu[i] = FilePond.create(document.querySelector(`input.filepondEducation${i}`));
    for (let j = 1; j < edu_file_count + 1; j++) {
        console.log(file_url[j]);
        fEdu[i].addFile(file_url[j]);
    }
}
// Lang files
for (let i = 1; i < lang_count + 1; i++){
    let lang_file_count = parseInt($(`.language-item__${i}`).data('files-count'));
    let file_url = new Array();
    for (let j = 1; j < lang_file_count + 1; j++) {
        file_url[j] = $(`input.filepondLanguage${i}`).data(`file-url-${j}`);
    }
    fLang[i] = FilePond.create(document.querySelector(`input.filepondLanguage${i}`));
    for (let j = 1; j < lang_file_count + 1; j++) {
        console.log(file_url[j]);
        fLang[i].addFile(file_url[j]);
    }
}
// Army files
for (let i = 1; i < army_count + 1; i++){
    let army_file_count = parseInt($(`.military-item__${i}`).data('files-count'));
    let file_url = new Array();
    for (let j = 1; j < army_file_count + 1; j++) {
        file_url[j] = $(`input.filepondMilitary${i}`).data(`file-url-${j}`);
    }
    fMil[i] = FilePond.create(document.querySelector(`input.filepondMilitary${i}`));
    for (let j = 1; j < army_file_count + 1; j++) {
        console.log(file_url[j]);
        fMil[i].addFile(file_url[j]);
    }
}

// // Rec files
// for (let i = 1; i < army_count + 1; i++){
//     let army_file_count = parseInt($(`.military-item__${i}`).data('files-count'));
//     let file_url = new Array();
//     for (let j = 1; j < army_file_count + 1; j++) {
//         file_url[j] = "http://127.0.0.1:8000" + $(`input.filepondMilitary${i}`).data(`file-url-${j}`);
//     }
//     fMil[i] = FilePond.create(document.querySelector(`input.filepondMilitary${i}`));
//     for (let j = 1; j < army_file_count + 1; j++) {
//         console.log(file_url[j]);
//         fMil[i].addFile(file_url[j]);
//     }
// }

// Reward files
for (let i = 1; i < reward_count + 1; i++){
    let reward_file_count = parseInt($(`.received-item__${i}`).data('files-count'));
    let file_url = new Array();
    for (let j = 1; j < reward_file_count + 1; j++) {
        file_url[j] = $(`input.filepondReceived${i}`).data(`file-url-${j}`);
    }
    fRec[i] = FilePond.create(document.querySelector(`input.filepondReceived${i}`));
    for (let j = 1; j < reward_file_count + 1; j++) {
        console.log(file_url[j]);
        fRec[i].addFile(file_url[j]);
    }
}
// Family files

    let fam_file_count = parseInt($(`.marital-status-item__1`).data('files-count'));
    let file_url = new Array();
    for (let j = 1; j < fam_file_count + 1; j++) {
        file_url[j] = $(`input.filepondMarital1`).data(`file-url-${j}`);
    }
    fMar[1] = FilePond.create(document.querySelector(`input.filepondMarital1`));
    for (let j = 1; j < fam_file_count + 1; j++) {
        console.log(file_url[j]);
        fMar[1].addFile(file_url[j]);
    }


// Relatives files
for (let i = 1; i < rel_count + 1; i++){
    let rel_file_count = parseInt($(`.relatives-item__${i}`).data('files-count'));
    let file_url = new Array();
    for (let j = 1; j < rel_file_count + 1; j++) {
        file_url[j] = $(`input.filepondRelatives${i}`).data(`file-url-${j}`);
    }
    fRel[i] = FilePond.create(document.querySelector(`input.filepondRelatives${i}`));
    for (let j = 1; j < rel_file_count + 1; j++) {
        console.log(file_url[j]);
        fRel[i].addFile(file_url[j]);
    }
}

// Experience files
for (let i = 1; i < exp_count + 1; i++){
    let exp_file_count = parseInt($(`.experience-item__${i}`).data('files-count'));
    let file_url = new Array();
    for (let j = 1; j < exp_file_count + 1; j++) {
        file_url[j] = $(`input.filepondExperience${i}`).data(`file-url-${j}`);
    }
    fExp[i] = FilePond.create(document.querySelector(`input.filepondExperience${i}`));
    for (let j = 1; j < exp_file_count + 1; j++) {
        console.log(file_url[j]);
        fExp[i].addFile(file_url[j]);
    }
}

/* Materials */
var eduTypes = ``;
var LangTypes = ``;
var regionTypes = `123`;

$(function(){

    var getEduTypeUrl = $('.education').data('api');


    $.getJSON(getEduTypeUrl, function(result){
       for (let i = 0; i < result.length; i++){
           eduTypes += `<option value="${result[i].id}">${result[i].name_ru}</option>`;
       }
    });

    var getLangTypeUrl = $('.language').data('api');

    $.getJSON(getLangTypeUrl, function(result){
       for (let i = 0; i < result.length; i++){
           LangTypes += `<option value="${result[i].id}">${result[i].name_ru}</option>`;
       }
    });

    var getRegionTypeUrl = $('.military').data('api');

    $.getJSON(getRegionTypeUrl, function(result){
       for (var i=0; i<result.length; i++) {
            for (var j = 0; j < result[i].district.length; j++) {
                regionTypes += `<option value="${result[i].name_ru}, ${result[i].district[j].name_ru}">`;
            }
        }
       $(".region-list").append(regionTypes);
    });
});

$(function () {
    $("#root-employee-translate3-button").click(function (event) {

        event.preventDefault();
        /* Education */

        var educationCount = parseInt($("input[name='education_count']").val());

        for (let i = 1; i <= educationCount; i++){

           let educationTransFormData = new FormData();
           educationTransFormData.append(`name_en`, $(`input[name='edu_name_${i}']`).val());
           educationTransFormData.append(`address_en`, $(`input[name='edu_address_${i}']`).val());
           educationTransFormData.append(`specialization_en`, $(`input[name='edu_spec_${i}']`).val());
           educationTransFormData.append(`additional_en`, $(`input[name='edu_addit_${i}']`).val());

           let eduUrl = $(`.education-item__${i}`).data('api');

           $.ajax({
               url: eduUrl,
               data: educationTransFormData,
               type: "PUT",
               contentType: false,
               processData: false,
               success: function (data) {
                   //console.log(data);
               },
               error: function (data) {
                   //console.log(data);
               }
           });
        }


       /* Military */
       var militaryCount = parseInt($("input[name='military_count']").val());

       for (let i = 1; i <= militaryCount; i++){
           let militaryTransFormData = new FormData();

           militaryTransFormData.append(`name_en`, $(`input[name='mil_name_${i}']`).val());
           militaryTransFormData.append(`region_en`, $(`input[name='mil_region_${i}']`).val());
           militaryTransFormData.append(`specialization_en`, $(`input[name='mil_specialization_${i}']`).val());
           militaryTransFormData.append(`rank_en`, $(`input[name='mil_rank_${i}']`).val());

           let milUrl = $(`.military-item__${i}`).data('api');
           $.ajax({
               url: milUrl,
               data: militaryTransFormData,
               type: "PUT",
               contentType: false,
               processData: false,
               success: function (data) {
                   //console.log(data);
               },
               error: function (data) {
                   //console.log(data);
               }
           });
       }


       /* Received  */

       var receivedCount = parseInt($("input[name='received_count']").val());

       for (let i = 1; i <= receivedCount; i++){
           let receivedTransFormData = new FormData();

           receivedTransFormData.append(`name_en`, $(`input[name='rec_name_${i}']`).val());
           receivedTransFormData.append(`description_en`, $(`textarea[name='rec_comment_${i}']`).val());

           let recUrl = $(`.received-item__${i}`).data('api');
           $.ajax({
               url: recUrl,
               data: receivedTransFormData,
               type: "PUT",
               contentType: false,
               processData: false,
               success: function (data) {
                   //console.log(data);
               },
               error: function (data) {
                   //console.log(data);
               }
           });
       }



       /* Relative */

       var relativeCount = parseInt($("input[name='relative_count']").val());

       for (let i = 1; i <= relativeCount; i++){
           let relativeTransFormData = new FormData();

           relativeTransFormData.append(`level_en`, $(`select[name='rel_level_${i}']`).val());
           relativeTransFormData.append(`fullname_en`, $(`input[name='rel_name_${i}']`).val());
           relativeTransFormData.append(`study_work_place_en`, $(`input[name='rel_study_work_place_${i}']`).val());
           relativeTransFormData.append(`position_en`, $(`input[name='rel_position_${i}']`).val());
           relativeTransFormData.append(`living_address_en`, $(`input[name='rel_address_${i}']`).val());

           let relUrl = $(`.relatives-item__${i}`).data('api');
           $.ajax({
               url: relUrl,
               data: relativeTransFormData,
               type: "PUT",
               contentType: false,
               processData: false,
               success: function (data) {
                   //console.log(data);
               },
               error: function (data) {
                   //console.log(data);
               }
           });
       }


       /* Experience */

       var experienceCount = parseInt($("input[name='experience_count']").val());

       for (let i = 1; i <= experienceCount; i++){

           let experienceTransFormData = new FormData();
           experienceTransFormData.append(`organization_en`, $(`input[name='exp_org_${i}']`).val());
           experienceTransFormData.append(`position_en`, $(`input[name='exp_position_${i}']`).val());
           experienceTransFormData.append(`sub_division_en`, $(`input[name='exp_sub_division_${i}']`).val());
           experienceTransFormData.append(`address_en`, $(`input[name='exp_address_${i}']`).val());

           let expUrl = $(`.experience-item__${i}`).data('api');
           $.ajax({
               url: expUrl,
               data: experienceTransFormData,
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
                   //console.log(data);
                   var x = document.getElementById("mainError");

                   x.className = "show";
                   setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);

               }
           });
       }

    });
});


/*
$(function () {
    var edu_count = parseInt($("input[name='edu_count']").val());
    var army_count = parseInt($("input[name='army_count']").val());
    var fam_count = parseInt($("input[name='fam_count']").val());
    var reward_count = parseInt($("input[name='reward_count']").val());
    var rel_count = parseInt($("input[name='rel_count']").val());
    var exp_cout = parseInt($("input[name='exp_cout']").val());
    var lang_count = parseInt($("input[name='lang_count']").val());

    edu_files = {};
    var army_files = {};
    var fam_files = {} ;
    var reward_files = {};
    var rel_files = {} ;
    var exp_files = {} ;
    var lang_files  = {};

    for (let i = 1; i < edu_count+1; i++) {
        let file_url = $(`input.filepondEducation_${i}`).data("file-url");
        edu_files[`${i}`] = FilePond.create(document.querySelector(`input.filepondEducation_${i}`));
        console.log(file_url);
        edu_files[`${i}`].addFile(file_url);
    }
    edu_files["1"].beforeRemoveFile = function(e){
        console.log(e)
    };
    for (let i = 1; i < army_files+1; i++) {
        army_files[`${i}`] = FilePond.create(document.querySelector(`input.filepondMilitary_${i}`));
    }
    for (let i = 1; i < fam_files+1; i++) {
        fam_files[`${i}`] = FilePond.create(document.querySelector(`input.filepondMarital_${i}`));
    }
    for (let i = 1; i < reward_files+1; i++) {
        reward_files[`${i}`] = FilePond.create(document.querySelector(`input.filepondReceived_${i}`));
    }
    for (let i = 1; i < rel_files+1; i++) {
        rel_files[`${i}`] = FilePond.create(document.querySelector(`input.filepondRelatives_${i}`));
    }
    for (let i = 1; i < exp_files+1; i++) {
        exp_files[`${i}`] = FilePond.create(document.querySelector(`input.filepondExperience_${i}`));
    }
    for (let i = 1; i < lang_files+1; i++) {
        lang_files[`${i}`] = FilePond.create(document.querySelector(`input.filepondLanguage_${i}`));
    }

    $("#root-employee-update3-button").click(function (e) {
       e.preventDefault();
       let $formData = new FormData();
       let url = $(this).data("url");

       $.ajax({
           url: url,
           data: $formData,
           processData: false,
           contentType: false,
           type: "POST",
           success: function (data) {
               alert("success");
           },
           error: function (data) {
               alert("error");
           }
       });
   });
});
*/