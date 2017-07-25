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

//очистка
function clear() {
    //$("input:not(.accident)").val(0);
    $(".data input:not(.option input)").prop("checked", false);
    $(".result").empty();
}
$("#salary").one("click", function() {
    clear();
})

//кнопки
$("#clear").on("click", function() {
    clear();
});

//главная функция
function run() {
    var deductionsCh,
        deductionsDe,
        deductionsLi,
        deductionsOt,
        salary,
        accident,
        deductions,
        percent,
        hand,
        pfr,
        ffoms,
        fss,
        fss2,
        totalE,
        totalA;

    //получение inputов
    salary = parseInt($("#salary").val());
    accident = $("#accident").val();

    //получение вычетов с детей
    deductionsCh = 0;
    if ($(".children input").is(":checked")) {
        deductionsCh = parseInt($(".children input:checked").attr("data-deductions"));
    };

    //получение остальных вычетов;
    deductionsDe = parseInt($("#disabled").val() * 12000);
    deductionsLi = parseInt($("#limitation").val());
    deductionsOt = parseInt($("#other").val());

    //подсчет общих вычетов
    deductions = deductionsCh + deductionsDe + deductionsLi + deductionsOt;

    //проверка вывода вычетов
    if (deductions < salary) {
        percent = (salary - deductions) * 13 / 100;
    } else {
        percent = 0;
    };



    //выбор режима расчета
    if ($("#option1").is(":checked")) {
        $("#hand-text").html("зп на руки");
        direct();

    }
    if ($("#option2").is(":checked")) {
        $("#hand-text").html("зп грязными");
        reverse();
    };

    //прямой расчет
    function direct() {
        hand = salary - percent;
    };

    //обратный расчет
    function reverse() {
        percent = (salary - deductions) * 14.94 / 100; //изменить процент

        // if (percent<0) {
        //         console.log("menshe");
        // };
        //     console.log(percent);
        salary = salary + percent;
        hand = salary;
    }

    //расчеты зп и процентов
    pfr = salary * 22 / 100;
    ffoms = salary * 5.1 / 100;
    fss = salary * 2.9 / 100;
    fss2 = salary * accident / 100;
    totalE = pfr + ffoms + fss + fss2;
    totalA = percent + totalE;


    //вывод данных на страницу    
    $("#hand").html(Math.round(hand));
    if (percent > 0) {
        $("#percent").html(Math.round(percent));
    } else {
        $("#percent").html("0");
    }
    $("#pfr").html(Math.round(pfr));
    $("#ffoms").html(Math.round(ffoms));
    $("#fss").html(Math.round(fss));
    $("#fss2").html(Math.round(fss2));
    $("#totalE").html(Math.round(totalE));
    $("#totalA").html(Math.round(totalA));
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