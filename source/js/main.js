$(document).ready(function() {
    // /let deductionsCh = 0;
    $(".children input").on("click", function() {
        window.deductionsCh = $(this).attr("data-deductions");

    })
    console.log(deductionsCh);
    $(".data input").change(function() {
        let salary = $("#salary").val();






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
    })
})