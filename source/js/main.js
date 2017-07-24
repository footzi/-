//выбор либо снятие радио на детей
$("#on-children").on("click", function() {
    if ($(this).is(":checked")) {
        $(".children input:first").prop("checked", true);
    } else {
        $(".children input").prop("checked", false);
    }
});

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

//главная функция
function run() {
    let deductionsCh,
        deductionsDe,
        deductionsLi,
        deductionsOt,
        salary,
        deductions,
        percent,
        hand,
        pfr,
        ffoms,
        fss,
        fss2,
        totalE,
        totalA;

    //вывод вычетов с детей
    deductionsCh = 0;
    if ($(".children input").is(":checked")) {
        deductionsCh = parseInt($(".children input:checked").attr("data-deductions"));
    };

    //вывод вычетов с детей-инвалидов;
    deductionsDe = parseInt($("#disabled").val() * 12000);

    //вывод остальных вычетов
    deductionsLi = parseInt($("#limitation").val());
    deductionsOt = parseInt($("#other").val());

    //подсчет общих вычетов
    salary = $("#salary").val();
    deductions = deductionsCh + deductionsDe + deductionsLi + deductionsOt;

    //проверка вывода вычетов
    percent;
    if (deductions < salary) {
        percent = (salary - deductions) * 13 / 100;
    } else {
        percent = 0;
    };

    //расчеты зп и процентов
    hand = salary - percent;
    pfr = salary * 22 / 100;
    ffoms = salary * 5.1 / 100;
    fss = salary * 2.9 / 100;
    fss2 = salary * 0.2 / 100;
    totalE = pfr + ffoms + fss + fss2;
    totalA = percent + totalE;

    //вывод данных на страницу    
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

//выполение функции на нажатие кнопки
$(".data input").on("keyup", function() {
    run();
});
//выполение функции при изменении объектов
$(".data input").change(function() {
    run();
})