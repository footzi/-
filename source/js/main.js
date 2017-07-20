//выбор либо снятия редио на детей
$("#on-children").on("click", function() {
    if($(this).is(":checked")) {
        $(".children input:first").prop("checked", true);
    } else {
        $(".children input").prop("checked", false);
    }
});

//
$(".children input").on("click", function() {
    $("#on-children").prop("checked", true);
});
$("#on-invalid").on("click", function() {
    $(".invalid").fadeToggle();
});

$(".data input").change(function() {
    var test = $(".children input").is(":checked");
    var deductionsCh=0;
    if(test) {
        deductionsCh = $(".children input:checked").attr("data-deductions");

    };

    console.log(deductionsCh);
    
    // if($("#on-children").is(":checked")) {
            
    //     let radio = $(".children input");
    //     for (var i=1; i<radio.length; i++) {
    //         deductionsCh = $(this).prop("data-deductions");
    //         console.log(deductionsCh);
    //     } 

     


    



    let salary = $("#salary").val()-deductionsCh;
    let percent = salary * 13 / 100;
    let hand = salary - percent;

    let pfr = salary * 22 / 100;
    let ffoms = salary * 5.1 / 100;
    let fss = salary * 2.9 / 100;



    $("#hand").html(hand);
    $("#percent").html(percent);
    $("#pfr").html(pfr);
    $("#ffoms").html(ffoms);
    $("#fss").html(fss);
});