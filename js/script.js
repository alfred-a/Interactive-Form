//project 3
$("#name").focus();

$("#other-title").hide();

$("#design option")
  .eq(0)
  .hide();

$("#colors-js-puns label").html("Please select a T-shirt theme");

$("#color").hide();

$("#design").change(function() {
  let selectedValue = $(this).val();
  if (selectedValue == "js puns") {
    $(".JS Puns shirt").show();
  }
});

$("#design").change(function() {
  let selectedValue = $(this).val();
  if (selectedValue == "heart js") {
    $(".JS shirt").show();
  }
});
