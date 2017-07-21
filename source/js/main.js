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
});
$("#on-limitation").on("click", function() {
    $(".limitation").fadeToggle();
});
$("#on-other").on("click", function() {
    $(".other").fadeToggle();
});

$(".data input").change(function() {
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
    let percent = (salary - deductions) * 13 / 100;
    let hand = salary - percent;

    let pfr = salary * 22 / 100;
    let ffoms = salary * 5.1 / 100;
    let fss = salary * 2.9 / 100;
    let fss2 = salary * 0.2 / 100;



    $("#hand").html(hand);
    $("#percent").html(percent);
    $("#pfr").html(pfr);
    $("#ffoms").html(ffoms);
    $("#fss").html(fss);
    $("#fss2").html(fss2);
});