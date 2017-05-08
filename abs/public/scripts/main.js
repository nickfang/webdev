function addInput(newInputHTML, refId) {
	var refElement = document.getElementById(refId);
	insertLocation = refElement.parentElement;
	insertLocation.insertBefore(newInputHTML, refElement);
}

function addDeleteButton(className, refId) {
	var deleteButton = document.createElement("button");
	deleteButton.type = "button";
	deleteButton.classList.add(className);
	deleteButton.innerHTML = "x";
	addInput(deleteButton, refId);
	deleteButton.addEventListener("click", remove);
}

function remove() {
	var delClass = this.getAttribute("class");
	tempElements = document.getElementsByClassName(delClass);
	console.log(tempElements);
	// this work around is because tempElement changes everytime a parentNode.removeChild is called.
	var len = tempElements.length;
	for (var i = 0; i < len; i++) {
		tempElements[0].parentNode.removeChild(tempElements[0]);
	}
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
	var ethnicityInput = document.createElement("select");
	ethnicityInput.name = `ethnicities[]`;
	ethnicityInput.classList.add(`eth${numEthnicities}`);
	ethnicities.forEach((itr) => {
		var option = document.createElement("option");
		option.value = itr;
		option.textContent = itr;
		ethnicityInput.append(option);
	});
	addInput(ethnicityInput, "ethnicitiesInput");
	addDeleteButton(`eth${numEthnicities}`, "ethnicitiesInput");
	numEthnicities++;
}

function addSkillInput() {
	var skillInput = document.createElement("input");
	skillInput.type = "text";
	skillInput.name = "skills[]";
	skillInput.classList.add(`skills${numSkills}`);
	skillInput.placeholder = "skill"
	addInput(skillInput, "skillsInput");
	addDeleteButton(`skills${numSkills}`, "skillsInput");
	numSkills++;
}

function addFilmInput() {
	var filmInput = document.createElement("input");
	filmInput.type = "text";
	filmInput.name = "films[]";
	filmInput.classList.add(`film${numFilms}`);
	filmInput.placeholder = "film"
	addInput(filmInput, "filmsInput");
	addDeleteButton(`film${numFilms}`, "filmsInput");
	numFilms++;
}

// add two input elements.  One that is the number and one that is the type.
function addPhoneInput() {
	var phoneInput = document.createElement("input");
	phoneInput.type = "tel";
	phoneInput.name = `phones[]`; // ${numPhoneInputs}
	phoneInput.classList.add(`phone${numPhones}`);
	phoneInput.placeholder = "phone number";
	addInput(phoneInput, "phonesInput");

	var phoneTypeInput = document.createElement("select");
	phoneTypeInput.name = "phoneTypes[]";
	phoneTypeInput.classList.add(`phone${numPhones}`);
	phoneTypes.forEach((itr) => {
		var option = document.createElement("option");
		option.value = itr;
		option.textContent = itr;
		phoneTypeInput.append(option);
	});
	addInput(phoneTypeInput, "phonesInput");
	addDeleteButton(`phone${numPhones}`, "phonesInput")
	numPhones++;
}

function addEmailInput() {
	var emailInput = document.createElement("input");
	emailInput.type = "email";
	emailInput.name = `emails[]`;
	emailInput.classList.add(`email${numEmails}`);
	emailInput.placeholder = "email";
	addInput(emailInput, "emailsInput");
	addDeleteButton(`email${numEmails}`, "emailsInput");
	numEmails++;
}

function addHeadshotInput() {
	var headshotInput = document.createElement("input");
	headshotInput.type = "text";
	headshotInput.name = "headshots[]";
	headshotInput.classList.add(`headshot${numHeadshots}`);
	headshotInput.placeholder = "headshot url";
	addInput(headshotInput, "headshotsInput");
	addDeleteButton(`headshot${numHeadshots}`, "headshotsInput");
	numHeadshots++;
}
