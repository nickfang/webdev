function addInput(newInputHTML, refId) {
	var refElement = document.getElementById(refId);
	insertLocation = refElement.parentElement;

	insertLocation.insertBefore(newInputHTML, refElement);
}

var numPhoneInputs = 0;
var numEmailInputs = 0;

function addPhoneInput() {
	var newInput = document.createElement("input");
	newInput.type = "text";
	newInput.name = `phone[${numPhoneInputs}]`;
	newInput.placeholder = `phone ${numPhoneInputs}`;

	var refId = "phoneInput";
	addInput(newInput, refId);

	numPhoneInputs++;
}

function addEmailInput() {
	var newInput = document.createElement("input");
	newInput.type = "text";
	newInput.name = `email[${numEmailInputs}]`;
	newInput.placeholder = `email ${numEmailInputs}`;

	var refId = "emailInput";
	addInput(newInput, refId);

	numEmailInputs++;
}