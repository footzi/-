//выбор либо снятие радио на детей
$("#on-children").on("click", function() {
    if ($(this).is(":checked")) {
        $(".children input:first").prop("checked", true);
    } else {
        $(".children input").prop("checked", false);
    }
});

//
$(".children input").on("click", function() {
    $("#on-children").prop("checked", true);
});

//скрытие/открытие полей
$("#on-disabled").on("click", function() {
    $(".disabled").fadeToggle();
    $("#disabled").val(0);
});
$("#on-limitation").on("click", function() {
    $(".limitation").fadeToggle();
    $("#limitation").val(0);
});
$("#on-other").on("click", function() {
    $(".other").fadeToggle();
    $("#other").val(0);
});


//кнопки

$("#clear").on("click", function() {
    $("input:not(.accident)").val(0);
    $(".data input").prop("checked", false);
    $(".result").empty();
});
function run() {
    //вывод вычетов с детей
    let deductionsCh,
        deductionsDe,
        deductionsLi,
        deductionsOt;

    deductionsCh = 0;
    if ($(".children input").is(":checked")) {
        deductionsCh = parseInt($(".children input:checked").attr("data-deductions"));
    };

    //вывод вычетов с детей-инвалидов;
    deductionsDe = parseInt($("#disabled").val() * 12000);

    //вывод остальных вычетов
    deductionsLi = parseInt($("#limitation").val());
    deductionsOt = parseInt($("#other").val());


    let salary = $("#salary").val();
    let deductions = deductionsCh + deductionsDe + deductionsLi + deductionsOt;

    console.log("общий=" + deductions);
    console.log("дети=" + deductionsCh);
    console.log("инвалиды=" + deductionsDe);
    console.log("ограничения=" + deductionsLi);
    console.log("другие=" + deductionsOt);

    let percent;
    if (deductions<salary) {
        percent = (salary - deductions) * 13 / 100;
    } else {
        percent = 0;
    };


    let hand = salary - percent;
    let pfr = salary * 22 / 100;
    let ffoms = salary * 5.1 / 100;
    let fss = salary * 2.9 / 100;
    let fss2 = salary * 0.2 / 100;
    let totalE = pfr + ffoms + fss + fss2;
    let totalA = percent + totalE;



    $("#hand").html(hand.toFixed(0));
    $("#percent").html(percent.toFixed(0));
    $("#pfr").html(pfr.toFixed(0));
    $("#ffoms").html(ffoms.toFixed(0));
    $("#fss").html(fss.toFixed(0));
    $("#fss2").html(fss2.toFixed(0));
    $("#totalE").html(totalE);
    $("#totalA").html(totalA);
};
run();

$(".data input").on("keyup", function() {
    run();
});
$(".data input").change(function() {
    run();
})