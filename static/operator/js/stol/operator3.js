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

fEdu[1] = FilePond.create(document.querySelector('input.filepondEducation'));
fLang[1] = FilePond.create(document.querySelector('input.filepondLanguage'));
fMil[1] = FilePond.create(document.querySelector('input.filepondMilitary'));
fRec[1] = FilePond.create(document.querySelector('input.filepondReceived'));
fMar[1] = FilePond.create(document.querySelector('input.filepondMarital'));
fRel[1] = FilePond.create(document.querySelector('input.filepondRelatives'));
fExp[1] =  FilePond.create(document.querySelector('input.filepondExperience'));


/* Materials */
var eduTypes = ``;
var LangTypes = ``;
var regionTypes = ``;

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
/* Educations */
var edu = 1;

$('body').on('click', '.add-education', function(event){

    event.preventDefault();
    edu++;

    var objTo = document.getElementById('education_fields')
    var divtest = document.createElement("div");
  	divtest.setAttribute("class", "removeEduClass"+edu);
  	var rdiv = 'removeEduClass'+edu;
    divtest.innerHTML = `
                          <div class="education-item">
                            <div class="row">
                              <div class="col-md-4">
                                <div class="form-group">
                                    <label for="eduType${edu}">Тип/вид учебного заведения</label>
                                    <select class="form-control selectpicker show-tick" name="edu_type_${edu}" id="eduType${edu}">
                                        <option value="">Выберите</option>
                                        ` + eduTypes + `
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="eduName${edu}">Учебное заведение</label>
                                    <input name="edu_name_${edu}" type="text" class="form-control" id="eduName${edu}">
                                </div>
                                <div class="form-group">
                                    <label for="eduAddress${edu}">Адрес учебного заведения</label>                                    
                                    <input name="edu_address_${edu}" list="eduRegion_list${edu}" type="text" class="form-control" id="eduAddress${edu}" autocomplete="off">
                                    <datalist class="region-list" id="eduRegion_list${edu}">
                                        ` + regionTypes + `
                                    </datalist>
                                </div>
                                <div class="form-group">
                                    <label for="eduSpec${edu}">Специальность</label>
                                    <input name="edu_spec_${edu}" type="text" class="form-control" id="eduSpec${edu}">
                                </div>
                                    </div>
                                    <div class="col-md-4">
                                      <div class="form-group">
                                    <label for="eduStartDate${edu}">Дата начала обучения</label>
                                    <input name="edu_start_date_${edu}" type="text" class="datepickerFrom form-control" data-date-format="dd.mm.yyyy" id="eduStartDate${edu}">
                                </div>
                                <div class="form-group">
                                    <label for="eduGradDate${edu}">Дата окончания обучения</label>
                                    <input name="edu_grad_date_${edu}" type="text" class="datepickerFrom form-control" data-date-format="dd.mm.yyyy" id="eduGradDate${edu}">
                                </div>
                                <div class="form-group">
                                    <label for="eduAddit${edu}">Прочие данные об учебе</label>
                                    <input name="edu_addit_${edu}" type="text" class="form-control" id="eduAddit${edu}">
                                </div>
                              </div>
                              <div class="col-md-4">
                                <div class="education-file__upload op3-file__upload form-group">
                                    <label for="">Файлы <i>(не обязательно)</i></label>
                                    <input type="file"
                                       class="filepondEducation_${edu}"
                                       name="filepond_education_${edu}"
                                       label-idle="Загрузить файл"
                                       multiple
                                       data-max-file-size="3MB"
                                       data-max-files="4" />
                                </div>
                              </div>
                            </div>
                             <div class="remove-button">
                                  <a href="javascript:void(null)"  class="remove-education" onclick="remove_education_fields(`+ edu +`);">Удалить</a>
                            </div> 
                          </div>
                         `;


    objTo.appendChild(divtest);
    $('.selectpicker').selectpicker();
    fEdu[edu] = FilePond.create(document.querySelector(`input.filepondEducation_${edu}`));
    $('#educationCount').val(`${edu}`);
    $(".datepickerFrom").datepicker({
          autoclose: true,
          language: 'ru',
          todayHighlight: true
    });
});
function remove_education_fields(rid) {
  $('.removeEduClass'+rid).remove();
  edu--;
  $('#educationCount').val(`${edu}`);
}

/* Languages */
var lang = 1;

$('body').on('click', '.add-language', function(event){

    event.preventDefault();
    lang++;
    var objTo = document.getElementById('language_fields')
    var divtest = document.createElement("div");
    divtest.setAttribute("class", "removeLangClass"+lang);
    var rdiv = 'removeLangClass'+lang;
    divtest.innerHTML = `
                        <div class="language-item">
                          <div class="row">
                            <div class="col-md-4">
                              <div class="form-group">
                                  <label for="langName${lang}">Название языка</label>
                                  <select class="form-control selectpicker show-tick" name="lang_name_${lang}" id="langName${lang}">
                                    <option value="">Выберите</option>
                                    ` + LangTypes + `
                                  </select>
                              </div>
                              <div class="form-group">
                                  <label for="langLevel${lang}">Уровень знания</label>
                                  <select class="form-control selectpicker show-tick" name="lang_level_${lang}" id="langLevel${lang}">
                                    <option value="">Выберите</option>
                                    <option value="1">Отлично</option>
                                    <option value="2">Хорошо</option>
                                    <option value="3">Удовлетворительное</option>
                                  </select>
                              </div>
                              <div class="form-group">
                                <input name="lang_required_${lang}" type="checkbox" class="form-control" id="langRequired${lang}">
                                <label for="langRequired${lang}">Необходимо проверить</label>
                              </div>
                            </div>
                            <div class="col-md-4">
                              <div class="language-file__upload op3-file__upload form-group">
                                <label for="">Файлы <i>(не обязательно)</i></label>
                                <input type="file"
                                   class="filepondLanguage_${lang}"
                                   name="filepond_language_${lang}"
                                   label-idle="Загрузить файл"
                                   multiple
                                   data-max-file-size="3MB"
                                   data-max-files="4" />
                              </div>
                            </div>
                          </div>
                              
                          <div class="remove-button">
                                  <a href="javascript:void(null)" class="remove-education" onclick="remove_language_fields(`+ lang +`);">Удалить</a>
                          </div> 
                        </div>
                         `;

    
    objTo.appendChild(divtest);
    $('.selectpicker').selectpicker();
    fLang[lang] = FilePond.create(document.querySelector(`input.filepondLanguage_${lang}`));
    $('#languageCount').val(`${lang}`);
});
function remove_language_fields(rid) {
  $('.removeLangClass'+rid).remove();
  lang--;
  $('#languageCount').val(`${lang}`);
}


/* Military */
var mil = 1;

$('body').on('click', '.add-military', function(event){

    event.preventDefault();
    mil++;
    var objTo = document.getElementById('military_fields')
    var divtest = document.createElement("div");
    divtest.setAttribute("class", "removeMilClass"+mil);
    var rdiv = 'removeMilClass'+mil;
    divtest.innerHTML = `
                        <div class="military-item">
                          <div class="row">
                            <div class="col-md-12">
                                <div class="row">
                                    <div class="col-md-8">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="milName${mil}">Наименование военной части</label>
                                                    <input name="mil_name_${mil}" type="text" class="form-control" id="milName${mil}">
                                                </div>
                                                <div class="form-group">
                                                    <label for="milRegion${mil}">Регион</label>
                                                    <input name="mil_region_${mil}" list="milRegion_list${mil}" type="text" class="form-control" id="milRegion${mil}" autocomplete="off">
                                                    <datalist class="region-list" id="milRegion_list${mil}">
                                                        ` + regionTypes + `
                                                    </datalist>
                                                </div>
                                                <div class="form-group">
                                                    <label for="milSpecialization${mil}">Специальность</label>
                                                    <input name="mil_specialization_${mil}" type="text" class="form-control" id="milSpecialization${mil}">
                                                </div>
                                            </div>
                                            <div class="col-md-6">
                                                <div class="form-group">
                                                    <label for="milDateStarted${mil}">Дата начала службы</label>
                                                    <input name="mil_date_started_${mil}" type="text" class="datepickerFrom form-control" data-date-format="dd.mm.yyyy" id="milDateStarted${mil}">
                                                </div>
                                                <div class="form-group">
                                                    <label for="milDateGraduated${mil}">Дата окончания службы</label>
                                                    <input name="mil_date_graduated_${mil}" type="text" class="datepickerFrom form-control" data-date-format="dd.mm.yyyy" id="milDateGraduated${mil}">
                                                </div>
                                                <div class="form-group">
                                                    <label for="milRank${mil}">Звание</label>
                                                    <input name="mil_rank_${mil}" type="text" class="form-control" id="milRank${mil}">
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div class="col-md-4">
                                        <div class="military-file__upload op3-file__upload form-group">
                                            <label for="">Файлы <i>(не обязательно)</i></label>
                                            <input type="file"
                                               class="filepondMilitary_${mil}"
                                               name="filepond_military_${mil}"
                                               label-idle="Загрузить файл"
                                               multiple
                                               data-max-file-size="3MB"
                                               data-max-files="4" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                              
                          <div class="remove-button">
                            <a href="javascript:void(null)" class="remove-education" onclick="remove_military_fields(`+ mil +`);">Удалить</a>
                          </div> 
                        </div>
                        `;

    
    objTo.appendChild(divtest);
    $('.selectpicker').selectpicker();
    fMil[mil] = FilePond.create(document.querySelector(`input.filepondMilitary_${mil}`));
    $('#armyCount').val(`${mil}`);
    $(".datepickerFrom").datepicker({
          autoclose: true,
          language: 'ru',
          todayHighlight: true
    });
});
function remove_military_fields(rid) {
  $('.removeMilClass'+rid).remove();
  mil--;
  $('#armyCount').val(`${mil}`);
}


/* Received */
var rec = 1;
$('body').on('click', '.add-received', function(event){

    event.preventDefault();
    rec++;
    var objTo = document.getElementById('received_fields')
    var divtest = document.createElement("div");
    divtest.setAttribute("class", "removeRecClass"+rec);
    var rdiv = 'removeRecClass'+rec;
    divtest.innerHTML = `
                        <div class="received-item">
                          <div class="row">
                            <div class="col-md-8">
                              <div class="form-group">
                                  <label for="recName${rec}">Награда</label>
                                  <input name="rec_name_${rec}" type="text" class="form-control" id="recName${rec}">
                              </div>
                              <div class="form-group">
                                  <label for="recComment${rec}">Комментарий</label>
                                  <textarea name="rec_comment_${rec}" rows="8" class="form-control" id="recComment${rec}"></textarea>
                              </div>
                            </div>
                                  
                            <div class="col-md-4">
                                <div class="received-file__upload op3-file__upload form-group">
                                    <label for="">Файлы <i>(не обязательно)</i></label>
                                    <input type="file"
                                       class="filepondReceived_${rec}"
                                       name="filepond_receiveds_${rec}"
                                       label-idle="Загрузить файл"
                                       multiple
                                       data-max-file-size="3MB"
                                       data-max-files="4" />
                                </div>
                            </div>
                          </div>

                          <div class="remove-button">
                                  <a href="javascript:void(null)" class="remove-education" onclick="remove_received_fields(`+ rec +`);">Удалить</a>
                          </div> 
                        </div>
                         `;

    
    objTo.appendChild(divtest);
    $('.selectpicker').selectpicker();
    fRec[rec] = FilePond.create(document.querySelector(`input.filepondReceived_${rec}`));
    $('#rewardCount').val(`${rec}`);
});
function remove_received_fields(rid) {
  $('.removeRecClass'+rid).remove();
  rec--;
  $('#rewardCount').val(`${rec}`);
}





/* Relatives Status */
var rel = 1;
$('body').on('click', '.add-relatives', function(event){

    event.preventDefault();
    rel++;
    var objTo = document.getElementById('relatives_fields')
    var divtest = document.createElement("div");
    divtest.setAttribute("class", "removeRelClass"+rel);
    var rdiv = 'removeRelClass'+rel;
    divtest.innerHTML = `
                        <div class="relatives-item">
                          <div class="row">
                            <div class="col-md-8">
                              <div class="row">
                                <div class="col-md-6">
                                  <div class="form-group">
                                      <label for="relLevel${rel}">Степень родства</label>
                                      <select class="form-control selectpicker show-tick" name="rel_level_${rel}" id="relLevel${rel}">
                                        <option value="">Выберите</option>
                                        <option value="1">жена</option>
                                        <option value="2">муж</option>
                                        <option value="3">мать</option>
                                        <option value="4">отец</option>
                                        <option value="5">сын</option>
                                        <option value="6">дочь</option>
                                        <option value="7">бабушка</option>
                                        <option value="8">дедушка</option>
                                      </select>
                                  </div>
                                  <div class="form-group">
                                      <label for="relName${rel}">Ф.И.О. родственника</label>
                                      <input name="rel_name_${rel}" type="text" class="form-control" id="relName${rel}">
                                  </div>
                                  <div class="form-group">
                                      <label for="relBirthDate${rel}">Год рождения</label>
                                      <input name="rel_birth_date_${rel}" type="text" class="datepickerFrom form-control" data-date-format="dd.mm.yyyy" id="relBirthDate${rel}">
                                  </div>  
                                </div>
                                <div class="col-md-6">
                                  <div class="form-group">
                                      <label for="relStudyWorkPlace${rel}">Место учебы, работы</label>
                                      
                                      <input name="rel_study_work_place_${rel}" list="relStudyRegion_list${rel}" type="text" class="form-control" id="relStudyWorkPlace${rel}" autocomplete="off">
                                      <datalist class="region-list" id="relStudyRegion_list${rel}">
                                        ` + regionTypes + `
                                      </datalist>
                                  </div>
                                  <div class="form-group">
                                      <label for="relPosition${rel}">Должность</label>
                                      <input name="rel_position_${rel}" type="text" class="form-control" id="relPosition${rel}">
                                  </div>
                                  <div class="form-group">
                                      <label for="relAddress${rel}">Адрес проживания</label>
                                      <input name="rel_address_${rel}" list="relAddressRegion_list${rel}" type="text" class="form-control" id="relAddress${rel}" autocomplete="off">
                                      <datalist class="region-list" id="relAddressRegion_list${rel}">
                                        ` + regionTypes + `
                                      </datalist>
                                  </div>  
                                </div>
                              </div>
                                      
                            </div>
                                  
                            <div class="col-md-4">
                                <div class="relatives-file__upload op3-file__upload form-group">
                                    <label for="">Файлы <i>(не обязательно)</i></label>
                                    <input type="file"
                                       class="filepondRelatives_${rel}"
                                       name="filepond_relatives_${rel}"
                                       label-idle="Загрузить файл"
                                       multiple
                                       data-max-file-size="3MB"
                                       data-max-files="4" />
                                </div>
                            </div>
                          </div>
                          
                          <div class="remove-button">
                                  <a href="javascript:void(null)" class="remove-education" onclick="remove_relatives_fields(`+ rel +`);">Удалить</a>
                          </div> 
                        </div>
                         `;

    
    objTo.appendChild(divtest);
    $('.selectpicker').selectpicker();
    fRel[rel] = FilePond.create(document.querySelector(`input.filepondRelatives_${rel}`));
    $('#relativeCount').val(`${rel}`);

    $(".datepickerFrom").datepicker({
          autoclose: true,
          language: 'ru',
          todayHighlight: true
    });
});
function remove_relatives_fields(rid) {
  $('.removeRelClass'+rid).remove();
  rel--;
  $('#relativeCount').val(`${rel}`);
}


/* Experience */
var exp = 1;
$('body').on('click', '.add-experience', function(event){

    event.preventDefault();
    exp++;
    var objTo = document.getElementById('experience_fields')
    var divtest = document.createElement("div");
    divtest.setAttribute("class", "removeExpClass"+exp);
    var rdiv = 'removeExpClass'+exp;
    divtest.innerHTML = `
                        <div class="experience-item">
                          <div class="row">
                            <div class="col-md-8">
                              <div class="row">
                                <div class="col-md-6">
                                  <div class="form-group">
                                      <label for="expOrg${exp}">Организация</label>
                                      <input name="exp_org_${exp}" type="text" class="form-control" id="expOrg${exp}">
                                  </div>
                                  <div class="form-group">
                                      <label for="expDateStarted${exp}">Дата начала работы</label>
                                      <input name="exp_date_started_${exp}" type="text" class="datepickerFrom form-control" data-date-format="dd.mm.yyyy" id="expDateStarted${exp}">
                                  </div>
                                  <div class="form-group">
                                      <label for="expDateFinished${exp}">Дата окончания работы</label>
                                      <input name="exp_date_finished_${exp}" type="text" class="datepickerFrom form-control" data-date-format="dd.mm.yyyy" id="expDateFinished${exp}">
                                  </div>    
                                </div>
                                <div class="col-md-6">
                                  <div class="form-group">
                                      <label for="expPosition${exp}">Должность</label>
                                      <input name="exp_position_${exp}" type="text" class="form-control" id="expPosition${exp}">
                                  </div>
                                  <div class="form-group">
                                      <label for="expSubDivision${exp}">Подразделение</label>
                                      <input name="exp_sub_division_${exp}" type="text" class="form-control" id="expSubDivision${exp}">
                                  </div>
                                  
                                  <div class="form-group">
                                      <label for="expAddress${exp}">Место нахождения/адресс</label>
                                      
                                      <input name="exp_address_${exp}" list="expAddressRegion_list${exp}" type="text" class="form-control" id="expAddress${exp}" autocomplete="off">
                                      <datalist class="region-list" id="expAddressRegion_list${exp}">
                                        ` + regionTypes + `
                                      </datalist>
                                  </div>
                                </div>
                              </div>
                            </div>
                                  
                            <div class="col-md-4">
                                <div class="experience-file__upload op3-file__upload form-group">
                                    <label for="">Файлы <i>(не обязательно)</i></label>
                                    <input type="file"
                                       class="filepondExperience_${exp}"
                                       name="filepond_experience_${exp}"
                                       label-idle="Загрузить файл"
                                       multiple
                                       data-max-file-size="3MB"
                                       data-max-files="4" />
                                </div>    
                            </div>
                          </div>
                          <div class="remove-button">
                                  <a href="javascript:void(null)" class="remove-education" onclick="remove_experience_fields(`+ exp +`);">Удалить</a>
                          </div> 
                        </div>
                         `;

    
    objTo.appendChild(divtest);
    $('.selectpicker').selectpicker();
    fExp[exp] = FilePond.create(document.querySelector(`input.filepondExperience_${exp}`));
    $('#experienceCount').val(`${exp}`);

    $(".datepickerFrom").datepicker({
          autoclose: true,
          language: 'ru',
          todayHighlight: true
    });
});
function remove_experience_fields(rid) {
  $('.removeExpClass'+rid).remove();
  exp--;
  $('#experienceCount').val(`${exp}`);
}





// Send FORM

$(function () {
   $("#form3SendButton").click(function (event) {
       event.preventDefault();
       url = $(this).data("url");

       /* Education */
       let educationFormData = new FormData();
       var educationCount = parseInt($("input[name='education_count']").val());

       educationFormData.append("type", 'education');
       educationFormData.append("amount", $("input[name='education_count']").val());

       for (let i = 1; i <= educationCount; i++){

           educationFormData.append(`type_${i}`, $(`select[name='edu_type_${i}']`).val());
           educationFormData.append(`name_${i}`, $(`input[name='edu_name_${i}']`).val());
           educationFormData.append(`address_${i}`, $(`input[name='edu_address_${i}']`).val());
           educationFormData.append(`specialization_${i}`, $(`input[name='edu_spec_${i}']`).val());
           educationFormData.append(`date_started_${i}`, dateMyFormat($(`input[name='edu_start_date_${i}']`).val()));
           educationFormData.append(`date_finished_${i}`, dateMyFormat($(`input[name='edu_grad_date_${i}']`).val()));
           educationFormData.append(`additional_${i}`, $(`input[name='edu_addit_${i}']`).val());
           var educationCountFile = fEdu[i].getFiles().length;
           for (var j = 0; j < educationCountFile; j++) {
               educationFormData.append(`file_${i}`, fEdu[i].getFiles()[j].file);
           }
       }

       // educationFormData.append("skin", $("#nput[name='skin']").val());
       // educationFormData.append("height", $("#heightID").val());
       // educationFormData.append("weight", $("#weightID").val());
       // educationFormData.append("fatness", $("#fatnessID").val());
       // educationFormData.append("blood_group", $("input[name='blood_group']").val());
       // educationFormData.append("blood_resus", $("input[name='blood_resus']").val());
       // educationFormData.append("vision_l", $("#vision_lID").val());
       // educationFormData.append("vision_r", $("#vision_rID").val());
       // educationFormData.append("photo_1", $("#photo_1ID")[0].files[0]);
       // educationFormData.append("photo_2", $("#photo_2ID")[0].files[0]);
       // educationFormData.append("photo_3", $("#photo_3ID")[0].files[0]);
       // educationFormData.append("photo_4", $("#photo_4ID")[0].files[0]);
       id = location.search.split('id=')[1];
       $.ajax({
           url: url,
           data: educationFormData,
           type: "POST",
           contentType: false,
           processData: false,
           success: function (data) {
               //console.log(data);
           },
           error: function (data) {
               //console.log(data);
           }
       });

       /* Language */
       let languageFormData = new FormData();
       var languageCount = parseInt($("input[name='language_count']").val());

       languageFormData.append("type", 'language');
       languageFormData.append("amount", $("input[name='language_count']").val());

       for (let i = 1; i <= languageCount; i++){
           let is_check = 'off';

           if($(`input[name='lang_required_${i}']:checked`).val() == 'on'){
               is_check = 'on';
           }
           languageFormData.append(`language_${i}`, $(`select[name='lang_name_${i}']`).val());
           languageFormData.append(`level_${i}`, $(`select[name='lang_level_${i}']`).val());
           languageFormData.append(`is_required_to_check_${i}`, is_check);

           var languageCountFile = fLang[i].getFiles().length;
           for (var j = 0; j < languageCountFile; j++) {
               languageFormData.append(`file_${i}`, fLang[i].getFiles()[j].file);
           }
       }
       $.ajax({
           url: url,
           data: languageFormData,
           type: "POST",
           contentType: false,
           processData: false,
           success: function (data) {
               //console.log(data);
           },
           error: function (data) {
               //console.log(data);
           }
       });

       /* Military */
       let militaryFormData = new FormData();
       var militaryCount = parseInt($("input[name='military_count']").val());

       militaryFormData.append("type", 'army');
       militaryFormData.append("military_duty", ($("input[name='military_duty']:checked").val()));
       militaryFormData.append("amount", $("input[name='military_count']").val());

       if($("input[name='military_duty']:checked").val() == 'true'){
           for (let i = 1; i <= militaryCount; i++){

               militaryFormData.append(`name_${i}`, $(`input[name='mil_name_${i}']`).val());
               militaryFormData.append(`region_${i}`, $(`input[name='mil_region_${i}']`).val());
               militaryFormData.append(`specialization_${i}`, $(`input[name='mil_specialization_${i}']`).val());
               militaryFormData.append(`date_started_${i}`, dateMyFormat($(`input[name='mil_date_started_${i}']`).val()));
               militaryFormData.append(`date_finished_${i}`, dateMyFormat($(`input[name='mil_date_graduated_${i}']`).val()));
               militaryFormData.append(`rank_${i}`, $(`input[name='mil_rank_${i}']`).val());


               var militaryCountFile = fMil[i].getFiles().length;
               for (let j = 0; j < militaryCountFile; j++) {
                   militaryFormData.append(`file_${i}`, fMil[i].getFiles()[j].file);
               }
           }
       }
       $.ajax({
           url: url,
           data: militaryFormData,
           type: "POST",
           contentType: false,
           processData: false,
           success: function (data) {
               //console.log(data);
           },
           error: function (data) {
               //console.log(data);
           }
       });


       /* Received  */
       let receivedFormData = new FormData();
       var receivedCount = parseInt($("input[name='received_count']").val());

       receivedFormData.append("type", 'reward');
       receivedFormData.append("amount", $("input[name='received_count']").val());

       for (let i = 1; i <= receivedCount; i++){
           receivedFormData.append(`name_${i}`, $(`input[name='rec_name_${i}']`).val());
           receivedFormData.append(`description_${i}`, $(`textarea[name='rec_comment_${i}']`).val());
           var receivedCountFile = fRec[i].getFiles().length;
           for (var j = 0; j < receivedCountFile; j++) {
               receivedFormData.append(`file_${i}`, fRec[i].getFiles()[j].file);
           }
       }
       $.ajax({
           url: url,
           data: receivedFormData,
           type: "POST",
           contentType: false,
           processData: false,
           success: function (data) {
               //console.log(data);
           },
          error: function (data) {
               //console.log(data);
           }
       });

       /* Marital */
       let maritalFormData = new FormData();
       var maritalCount = parseInt($("input[name='marital_count']").val());

       maritalFormData.append("type", 'family');
       maritalFormData.append("amount", $("input[name='marital_count']").val());

       for (let i = 1; i <= maritalCount; i++){

           maritalFormData.append(`status_${i}`, $(`select[name='mar_status_${i}']`).val());
           maritalFormData.append(`children_amount_${i}`, $(`select[name='children_amount_${i}']`).val());


           var maritalCountFile = fMar[i].getFiles().length;
           for (let j = 0; j < maritalCountFile; j++) {
               maritalFormData.append(`file_${i}`, fMar[i].getFiles()[j].file);
           }
       }
       $.ajax({
           url: url,
           data: maritalFormData,
           type: "POST",
           contentType: false,
           processData: false,
           success: function (data) {
               //console.log(data);
           },
           error: function (data) {
               //console.log(data);
           }
       });

       /* Relative */
       let relativeFormData = new FormData();
       var relativeCount = parseInt($("input[name='relative_count']").val());

       relativeFormData.append("type", 'relative');
       relativeFormData.append("amount", $("input[name='relative_count']").val());

       for (let i = 1; i <= relativeCount; i++){

           relativeFormData.append(`level_${i}`, $(`select[name='rel_level_${i}']`).val());
           relativeFormData.append(`fullname_${i}`, $(`input[name='rel_name_${i}']`).val());
           relativeFormData.append(`birth_date_${i}`, dateMyFormat($(`input[name='rel_birth_date_${i}']`).val()));
           relativeFormData.append(`study_work_place_${i}`, $(`input[name='rel_study_work_place_${i}']`).val());
           relativeFormData.append(`position_${i}`, $(`input[name='rel_position_${i}']`).val());
           relativeFormData.append(`living_address_${i}`, $(`input[name='rel_address_${i}']`).val());


           var relativeCountFile = fRel[i].getFiles().length;
           for (let j = 0; j < relativeCountFile; j++) {
               relativeFormData.append(`file_${i}`, fRel[i].getFiles()[j].file);
           }
       }
       $.ajax({
           url: url,
           data: relativeFormData,
           type: "POST",
           contentType: false,
           processData: false,
           success: function (data) {
               //console.log(data);
           },
           error: function (data) {
               //console.log(data);
           }
       });

       /* Experience */
       let experienceFormData = new FormData();
       var experienceCount = parseInt($("input[name='experience_count']").val());

       experienceFormData.append("type", 'experience');
       experienceFormData.append("amount", $("input[name='experience_count']").val());

       for (let i = 1; i <= experienceCount; i++){

           experienceFormData.append(`organization_${i}`, $(`input[name='exp_org_${i}']`).val());
           experienceFormData.append(`date_started_${i}`, dateMyFormat($(`input[name='exp_date_started_${i}']`).val()));
           experienceFormData.append(`date_finished_${i}`, dateMyFormat($(`input[name='exp_date_finished_${i}']`).val()));
           experienceFormData.append(`position_${i}`, $(`input[name='exp_position_${i}']`).val());
           experienceFormData.append(`sub_division_${i}`, $(`input[name='exp_sub_division_${i}']`).val());
           experienceFormData.append(`address_${i}`, $(`input[name='exp_address_${i}']`).val());


           var experienceCountFile = fExp[i].getFiles().length;
           for (let j = 0; j < experienceCountFile; j++) {
               experienceFormData.append(`file_${i}`, fExp[i].getFiles()[j].file);
           }
       }
       $.ajax({
           url: url,
           data: experienceFormData,
           type: "POST",
           contentType: false,
           processData: false,
           success: function (data) {
               // var x = document.getElementById("mainSuccess");
               // x.className = "show";
               // setTimeout(function(){
               //     x.className = x.className.replace("show", "");
               //     window.location.href = '/operator/3/2op';
               // }, 1500);
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
