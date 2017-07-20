$(document).ready(function(){
	$(".data input").change(function(){
		let money = $("#money").val();

		$(".children input").on("click", function(){
			let check = $(this).attr("checked");
			if (check) {
				alert("выбран");
			}
		})




		let percent = money*13/100;
		let hand = money-percent;

		let pfr = money*22/100;
		let ffoms = money*5.1/100;
		let fss = money*2.9/100;



		$("#hand").html(hand);
		$("#percentv").html(percent);
		$("#pfr").html(pfr);
		$("#ffoms").html(ffoms);
		$("#fss").html(fss);
	})
})