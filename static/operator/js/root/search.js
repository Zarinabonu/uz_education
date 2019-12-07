$(function(){
   $('.selectpicker').selectpicker();

   $('.td-checkbox').click(function (e) {
       e.stopPropagation();
   });

   $(".table-row").click(function() {
       // if ()
       window.document.location = $(this).data("href");
   });
});