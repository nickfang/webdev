function addInput(newInputHTML, refId) {
	var refElement = document.getElementById(refId);
	insertLocation = refElement.parentElement;

	insertLocation.insertBefore(newInputHTML, refElement);
}

const phoneTypes = ["home", "cell", "work"];

var numPhoneInputs = 0;
var numEmailInputs = 0;

// add two input elements.  One that is the number and one that is the type.
function addPhoneInput() {
	var refId = "phoneInput";

	var phoneInput = document.createElement("input");
	phoneInput.type = "tel";
	phoneInput.name = `phone[${numPhoneInputs}]`;
	phoneInput.placeholder = `phone ${numPhoneInputs}`;
	addInput(phoneInput, refId);

	var phoneTypeInput = document.createElement("select");
	phoneTypeInput.name = "phoneTypes";
	phoneTypes.forEach((itr) => {
		var element = document.createElement("option");
		element.value = itr;
		element.textContent = itr;
		phoneTypeInput.append(element);
	});

	addInput(phoneTypeInput, refId);

	numPhoneInputs++;
}

function addEmailInput() {
	var refId = "emailInput";
	var newInput = document.createElement("input");
	newInput.type = "email";
	newInput.name = `email[${numEmailInputs}]`;
	newInput.placeholder = `email ${numEmailInputs}`;

	addInput(newInput, refId);

	numEmailInputs++;
}