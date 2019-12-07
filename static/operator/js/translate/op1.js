$(function () {
            $("#formSendButton").click(function (event) {

                event.preventDefault();

                $(".holder").addClass("active");

                let formData = new FormData();

                formData.append("birth_place_en", $("#birthPlace").val());
                formData.append("living_address_en", $("#livesAt").val());

                $.ajax({
                    url: $(this).data("url"),
                    data: formData,
                    processData: false,
                    contentType: false,
                    type: "PUT",
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