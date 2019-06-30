// PROJECT 3

$("#name").focus(); // focus on Name

$("#other-title").hide(); // Hides the 'Your Job Role'

$("#title").on("change", function() {
  if ($(this).val() === "other") {
    $("#other-title").show(); // Show the 'Your Job Role'
  } else {
    $("#other-title").hide(); // Keep input text field hidden if anything else selected
  }
});

// T-SHIRT INFO SECTION

$("#colors-js-puns").hide(); // Hides all color options
$("#design").on("change", function() {
  $("#color").html(" ");
  if ($(this).val() === "js puns") {
    // If 'js puns' theme is selected show only js pun options

    $("#color").append(
      '<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>'
    );
    $("#color").append(
      '<option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option>'
    );
    $("#color").append(
      '<option value="gold">Gold (JS Puns shirt only)</option>'
    );
    $("#colors-js-puns").show();
  } else if ($(this).val() === "heart js") {
    // If 'I <3 js' theme is selected show only I <3 options

    $("#color").append(
      '<option value="tomato">Tomato (I &#9829; JS shirt only)</option>'
    );
    $("#color").append(
      '<option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option>'
    );
    $("#color").append(
      '<option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>'
    );
    $("#colors-js-puns").show();
  } else {
    $("#colors-js-puns").hide(); // Keep all color options hidden
  }
});

//ACTIVITY REGISTRATION SECTION

let totalCost = 0; // Setting initial total cost
$(".activities").append("<label>Total Cost: $0</label>"); // label for total cost

$('[type="checkbox"]').change(e => {
  if (e.target.name === "js-frameworks") {
    $(`input[name="express"]`).attr("disabled", true); // Disable 'express' if 'js-frameworks' checked
  }

  if (e.target.name === "js-libs") {
    $(`input[name="node"]`).attr("disabled", true); // Disable 'node' if 'js-libs' checked
  }

  if (e.target.name === "express") {
    $(`input[name="js-frameworks"]`).attr("disabled", true); // Disable 'js-frameworks' if 'express' is checked
  }

  if (e.target.name === "node") {
    $(`input[name="js-libs"]`).attr("disabled", true); // Disable 'js-libs' if 'node' checked
  }

  // TOTAL COST CALCULATION

  let selected = e.target; // Targets which activity checked
  let selectedText = selected.parentNode.textContent; // Gets all text content
  let costIndex = selectedText.indexOf("$"); // Gets $ index value
  let cost = selectedText.slice(costIndex + 1); // returns the number value

  if (selected.checked) {
    totalCost += parseInt(cost); // Add the activity cost to the total cost
  } else {
    totalCost -= parseInt(cost); // If unchecked subtract the activity cost
  }
  $(".activities label")
    .last()
    .text("Total Cost: $" + totalCost); // Displays the total cost in the created label
});

//PAYMENT INFO SECTION

const $payOptions = $("#payment");
const $creditPayment = $payOptions.next(); // Selecting siblings under payOptions
const $paypalPayment = $payOptions.next().next();
const $bitcoinPayment = $payOptions
  .next()
  .next()
  .next();
const $creditCard = $("#credit-card");
const $ccNum = $("#cc-num");
const $zipCode = $("#zip");
const $cvv = $("#cvv");

//Hiding paypal and bitcoin details initially
$("#payment option:eq(0)").attr("hidden", true);
$paypalPayment.hide();
$bitcoinPayment.hide();

$payOptions.change(function() {
  // payment options eventlistener

  if ($(this).val() === "credit card") {
    // If credit card option selected

    $creditPayment.prop("selected", true); // Keep credit card details available
    $creditCard.attr("hidden", false);
    $paypalPayment.hide();
    $bitcoinPayment.hide();
  } else if ($(this).val() === "paypal") {
    // If paypal option selected

    $paypalPayment.prop("selected", true);
    $creditCard.attr("hidden", true);
    $paypalPayment.show();
    $bitcoinPayment.hide();
  } else if ($(this).val() === "bitcoin") {
    // If bitcoin option selected

    $bitcoinPayment.prop("selected", true);
    $creditCard.attr("hidden", true);
    $paypalPayment.hide();
    $bitcoinPayment.show();
  }
});

//VALIDATION

// create and hide error messages

$('label[for="name"]').before(
  '<label class="error" id="name-error"><font color="red">Name field cannot be empty</font></label>'
);
$('label[for="mail"]').before(
  '<label class="error" id="email-error"><font color="red">Please enter a valid email</font></label>'
);
$(".activities legend").before(
  '<label class="error" id="activity-error"><font color="red">Please select at least one activity</font></label>'
);
$("#credit-card").before(
  '<label class="error" id="cc-empty-error"><font color="red">Credit Card Number is empty</font></label>'
);
$("#credit-card").before(
  '<label class="error" id="cc-number-error"><font color="red">Please enter a valid credit card number</font></label>'
);
$("#credit-card").before(
  '<label class="error" id="cc-zip-error"><font color="red">Please enter a 5 digit ZIP code</font></label>'
);
$("#credit-card").before(
  '<label class="error" id="cc-cvv-error"><font color="red">Please enter a 3 digit CVV number</font></label>'
);
$(".error").hide();

// Name validation function
const validName = name => {
  let valid = /^\S/.test(name); // Testing for valid name
  if (valid) {
    $("#name-error").hide();
    return true;
  } else {
    $("#name-error").show(); // Show error message if no valid name is entered
    return false;
  }
};

// Real-time name validation
$("#name").on("input", e => {
  if ($("#name").val() == "") {
    validName($("#name").val()); // Call validation function
  } else {
    $("#name-error").hide(); // Otherwise hide error message
  }
});

// Email validation function
const validEmail = email => {
  let valid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email); // Testing for valid email

  if (valid) {
    $("#email-error").hide();
    return true;
  } else {
    $("#email-error").show(); // If email is not valid, show error message
    return false;
  }
};

// Real-time validation of email
$("#mail").on("input", () => {
  if ($("#mail").val() !== "") {
    validEmail($("#mail").val()); // Call validation function
  } else {
    $("#email-error").hide();
  }
});

// Activities validation function
const validActivities = () => {
  if ($(".activities input:checked").length > 0) {
    $("#activity-error").hide();
    return true;
  } else {
    $("#activity-error").show();
    return false;
  }
};

// Real-time validation of activities
$(".activities").on("input", () => {
  validActivities();
});

$("#payment").on("change", function() {
  if ($("#payment").val() === "paypal" || $("#payment").val() === "bitcoin") {
    $("#cc-cvv-error").hide();
    $("#cc-zip-error").hide();
    $("#cc-number-error").hide();
    $("#cc-empty-error").hide();
  }
});

const validCardNumber = creditCd => {
  if ($("#payment").val() === "credit card") {
    let valid = /^\d{13,16}$/.test(creditCd); // Test credit card is 13 to 16 digits

    if (valid) {
      $("#cc-number-error").hide();
      $("#cc-empty-error").hide();
      return true;
    } else if (creditCd !== "") {
      $("#cc-empty-error").hide();
      $("#cc-number-error").show();
    } else {
      $("#cc-number-error").hide();
      $("#cc-empty-error").show();
      return false;
    }
  }
};

// Real-time validation of credit card
$("#cc-num").on("input", () => {
  if ($("#cc-num").val() !== "") {
    validCardNumber($("#cc-num").val());
  } else if ($("#cc-num").val() == "") {
    $("#cc-empty-error").show();
  } else {
    $("#cc-number-error").show();
  }
});

// Zip code validation function
const validZip = zip => {
  if ($("#payment").val() === "credit card") {
    let valid = /^\d{5}$/.test(zip); // Testing if zip code is a 5 digits

    if (valid) {
      $("#cc-zip-error").hide();
      return true;
    } else {
      $("#cc-zip-error").show();
      return false;
    }
  }
};

// Real-time validation of zip code
$("#zip").on("input", () => {
  if ($("#zip").val() !== "") {
    validZip($("#zip").val());
  } else {
    $("#cc-zip-error").hide();
  }
});

// Cvv validation function
const validCVV = cvv => {
  if ($("#payment").val() === "credit card") {
    let valid = /^\d{3}$/.test(cvv); // Testing if cvv is 3 digits

    if (valid) {
      $("#cc-cvv-error").hide();
      return true;
    } else {
      $("#cc-cvv-error").show();
      return false;
    }
  }
};

// Real-time validation of cvv
$("#cvv").on("input", () => {
  if ($("#cvv").val() !== "") {
    validCVV($("#cvv").val());
  } else {
    $("#cc-cvv-error").hide();
  }
});

const isValid = () => {
  if ($("#payment").val() === "credit card") {
    if (
      validName($("#name").val()) &&
      validEmail($("#mail").val()) &&
      validActivities() &&
      validCardNumber($("#cc-num").val()) &&
      validZip($("#zip").val()) &&
      validCVV($("#cvv").val())
    ) {
      return true; // Returns true if all forms are valid
    } else {
      validName($("#name").val());
      validEmail($("#mail").val());
      validActivities();
      validCardNumber($("#cc-num").val());
      validZip($("#zip").val());
      validCVV($("#cvv").val());
      return false; // Returns false if any form is invalid
    }
  } else {
    if (
      validName($("#name").val()) &&
      validEmail($("#mail").val()) &&
      validActivities()
    ) {
      return true;
    } else {
      validName($("#name").val());
      validEmail($("#mail").val());
      validActivities();
      return false;
    }
  }
};
// Prevents default action of form submitting if any errors present
$("form").on("submit", e => {
  if (isValid() === true) {
    window.location.reload(); // Submit button only works if all forms are valid
  } else {
    e.preventDefault();
  }
});
