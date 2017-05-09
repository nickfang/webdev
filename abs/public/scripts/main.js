function addInput(newInputHTML, idName, refId) {
	var refElement = document.getElementById(refId);
	// create div to contain the new form element and the delete button.
	var container = document.createElement("div");
	container.classList.add("input-group");
	container.id = idName;
	// var label = document.createElement("label");
	// container.append(label);
	newInputHTML.forEach((itr) => {
		if (itr.nodeName.toLowerCase() !== "span") {
			itr.classList.add("form-control");
		}
		container.append(itr);
	});
	// add deleteButton and eventlistener for button
	var spanButton = document.createElement("span");
	spanButton.classList.add("input-group-btn");
	var deleteButton = document.createElement("button");
	deleteButton.classList.add("btn", "btn-default");
	deleteButton.type = "button";
	deleteButton.name = idName;
	deleteButton.innerHTML = "x";
	spanButton.append(deleteButton);
	container.append(spanButton);
	deleteButton.addEventListener("click", removeCallback);
	// add container above the button with id refId
	insertLocation = refElement.parentElement;
	insertLocation.insertBefore(container, refElement);
}

function removeCallback() {
	var idToDelete = this.getAttribute("name");
	console.log(this);
	console.log(idToDelete);
	var elementToDelete = document.getElementById(idToDelete);
	elementToDelete.parentNode.removeChild(elementToDelete);
}

// this is in main.js since it is used in new.ejs and edit.ejs.
const phoneTypes = ["home", "cell", "work"];
const ethnicities = ["Caucasian", "African American", "Hispanic", "Asian", "South Asian", "Native American", "Middle Eastern", "Southeast Asian / Pacific Islander", "Ethnically Ambiguous / Mixed Race", "African Descent"];

// TODO: figure out how to reset these num variables when the page is loaded.  I think this will constantly increment otherwise.
// TODO: need to figure out when main.js is reloaded.
var numEthnicities = 0;
var numSkills = 0;
var numFilms = 0;
var numPhones = 0;
var numEmails = 0;
var numHeadshots = 0;

function addEthnicityInput() {
	var UniqueEthnicityClassName = `eth${numEthnicities}`;
	var ethnicityInput = document.createElement("select");
	ethnicityInput.name = `ethnicities[]`;

	ethnicities.forEach((itr) => {
		var option = document.createElement("option");
		option.value = itr;
		option.textContent = itr;
		if (itr === "Asian") {
			option.selected = true;
		}
		ethnicityInput.append(option);
	});

	addInput([ethnicityInput], UniqueEthnicityClassName, "ethnicitiesInput");
	numEthnicities++;
}

function addSkillInput() {
	var uniqueSkillClassName = `skills${numSkills}`;
	var skillInput = document.createElement("input");
	skillInput.type = "text";
	skillInput.name = "skills[]";
	skillInput.placeholder = "skill";

	addInput([skillInput], uniqueSkillClassName, "skillsInput");
	numSkills++;
}

function addFilmInput() {
	var uniqueFilmClass = `film${numFilms}`;
	var filmInput = document.createElement("input");
	filmInput.type = "text";
	filmInput.name = "films[]";
	filmInput.placeholder = "film";

	addInput([filmInput], uniqueFilmClass, "filmsInput");
	numFilms++;
}

// add two input elements.  One that is the number and one that is the type.
function addPhoneInput() {
	var uniquePhoneClassName = `phone${numPhones}`;

	var phoneInput = document.createElement("input")
	phoneInput.type = "tel";
	phoneInput.name = `phones[]`; // ${numPhoneInputs}
	phoneInput.placeholder = "phone number";

	var inputGroupDivider = document.createElement("span");
	inputGroupDivider.classList.add("input-group-btn", "hide-span");

	var phoneTypeInput = document.createElement("select");
	phoneTypeInput.name = "phoneTypes[]";
	phoneTypeInput.style.borderLeft = "0px";
	phoneTypes.forEach((itr) => {
		var option = document.createElement("option");
		option.value = itr;
		option.textContent = itr;
		phoneTypeInput.append(option);
	});

	addInput([phoneInput, inputGroupDivider, phoneTypeInput], uniquePhoneClassName, "phonesInput");
	numPhones++;
}

function addEmailInput() {
	var uniqueEmailClassName = `email${numEmails}`;
	var emailInput = document.createElement("input");
	emailInput.type = "email";
	emailInput.name = `emails[]`;
	emailInput.placeholder = "email";

	addInput([emailInput], uniqueEmailClassName, "emailsInput");
	numEmails++;
}

function addHeadshotInput() {
	var uniqueHeadshotClassName = `headshot${numHeadshots}`;
	var headshotInput = document.createElement("input");
	headshotInput.type = "text";
	headshotInput.name = "headshots[]";
	headshotInput.placeholder = "headshot url";

	addInput([headshotInput], uniqueHeadshotClassName, "headshotsInput");
	numHeadshots++;
}
