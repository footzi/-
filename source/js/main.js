//функционал кнопок
let flag = 0;
$("#open").on("click", function() {
    if (flag == 0) {
        $(".main").fadeIn().css({ "display": "flex" });
        $(this).width(50);
        $(this).children("img").attr("src", "./images/icon4.png");
        $(this).children("span")
            .empty()
            .css({ "margin": "0" });
        flag = 1;
    } else {
        clear();
    };
});
$("#open").hover(function() {
    if (flag == 1) {
        $(this).width(190);
        $(this).children("span")
            .html("ОЧИСТИТЬ")
            .css({ "margin-left": "15px" });
    }
});

//выбор либо снятие радио на детей
$("#on-children").on("click", function() {
    if ($(this).is(":checked")) {
        $(".children input:first").prop("checked", true);
    } else {
        $(".children input").prop("checked", false);
    }
});

$(".children input").on("click", () => {
    $("#on-children").prop("checked", true);
});

//скрытие/открытие полей
$(".disabled, .limitation, .other").hide();
$("#on-disabled").on("click", () => {
    $(".disabled").fadeToggle();
    $("#disabled").val(0);
});
$("#on-limitation").on("click", () => {
    $(".limitation").fadeToggle();
    $("#limitation").val(0);
});
$("#on-other").on("click", () => {
    $(".other").fadeToggle();
    $("#other").val(0);
});

//очистка
function clear() {
    $("#salary").val(0);
    $(".data input:not(.option input)").prop("checked", false);
    $(".result").empty();
}

//главная функция
function run() {
    let deductionsCh,
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
    if (salary !== salary) {
        salary = 0;
    }

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
        $(".salary p").html("Введите сумму зарплаты до налогообложения");
        $("#hand-text").html("Сумма зарплаты на руки");
        direct();

    }
    if ($("#option2").is(":checked")) {
        $(".salary p").html('Введите сумму зарплаты полученную на "руки"');
        $("#hand-text").html("Cумма зарплаты до налогооблажения");
        reverse();
    };

    //прямой расчет
    function direct() {
        hand = salary - percent;
    };

    //обратный расчет
    function reverse() {
        percent = (salary - deductions) * 13 / 100;
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
    $("#hand").html(Math.round(hand) + " .-");
    if (percent > 0) {
        $("#percent").html(Math.round(percent) + " .-");
    } else {
        $("#percent").html("0");
    }
    $("#pfr").html(Math.round(pfr) + " .-");
    $("#ffoms").html(Math.round(ffoms) + " .-");
    $("#fss").html(Math.round(fss) + " .-");
    $("#fss2").html(Math.round(fss2) + " .-");
    $("#totalE").html(Math.round(totalE) + " .-");
    $("#totalA").html(Math.round(totalA) + " .-");
};
run();

//выполение функции на нажатие кнопки
$(".data input").on("keyup", () => {
    run();
});
//выполение функции при изменении объектов
$(".data input").change(() => {
    run();
})