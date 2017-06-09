// TODO: Disable enter button so they don't accidentally submit the form when they're not ready.
// TODO: Maybe have enter go to the next form element

function addInput(newInputHTML, idName, refId, elementLabel) {
	var refElement = document.getElementById(refId);
	refElement = refElement.parentElement.parentElement;
	// create div to contain the new form element and the delete button.
	var container = document.createElement("div");
	container.classList.add("input-group");
	container.id = idName;
	var label = document.createElement("span");
	label.classList.add("input-group-addon");
	label.innerHTML = elementLabel;
	container.append(label);
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
const ethnicities = ["Asian", "Caucasian", "African American", "Hispanic", "South Asian", "Native American", "Middle Eastern", "Southeast Asian / Pacific Islander", "Ethnically Ambiguous / Mixed Race", "African Descent"];

// TODO: figure out how to reset these num variables when the page is loaded.  I think this will constantly increment otherwise.
// TODO: need to figure out when main.js is reloaded.
var numEthnicities = 0;
var numSkills = 0;
var numFilms = 0;
var numPhones = 0;
var numEmails = 0;
var numHeadshots = 0;

function addEthnicityInput(value = "") {
	var UniqueEthnicityClassName = `eth${numEthnicities}`;
	var ethnicityInput = document.createElement("select");
	ethnicityInput.name = `ethnicities[]`;

	ethnicities.forEach((itr) => {
		var option = document.createElement("option");
		option.value = itr;
		option.textContent = itr;
		if (itr === value) {
			option.selected = true;
		}
		ethnicityInput.append(option);
	});

	addInput([ethnicityInput], UniqueEthnicityClassName, "ethnicitiesInput", "Ethnicity");
	numEthnicities++;
}

function addSkillInput(value = "") {
	var uniqueSkillClassName = `skills${numSkills}`;
	var skillInput = document.createElement("input");
	skillInput.type = "text";
	skillInput.name = "skills[]";
	skillInput.placeholder = "skill";
	skillInput.value = value;

	addInput([skillInput], uniqueSkillClassName, "skillsInput", "Skill");
	numSkills++;
}

function addFilmInput(value = "") {
	var uniqueFilmClass = `film${numFilms}`;
	var filmInput = document.createElement("input");
	filmInput.type = "text";
	filmInput.name = "filmography[]";
	filmInput.placeholder = "film";
	filmInput.value = value;

	addInput([filmInput], uniqueFilmClass, "filmsInput", "Film");
	numFilms++;
}

// add two input elements.  One that is the number and one that is the type.
function addPhoneInput(value = "", valueType = "") {
	var uniquePhoneClassName = `phone${numPhones}`;

	var phoneInput = document.createElement("input")
	phoneInput.type = "tel";
	phoneInput.name = `phoneNumbers[]`; // ${numPhoneInputs}
	phoneInput.placeholder = "phone number";
	phoneInput.value = value;

	var inputGroupDivider = document.createElement("span");
	inputGroupDivider.classList.add("input-group-btn", "hide-span");

	var phoneTypeInput = document.createElement("select");
	phoneTypeInput.name = "phoneTypes[]";
	phoneTypeInput.style.borderLeft = "0px";
	phoneTypes.forEach((itr) => {
		var option = document.createElement("option");
		option.value = itr;
		option.textContent = itr;
		if (itr == valueType) {
			option.selected = true;
		}
		phoneTypeInput.append(option);
	});

	addInput([phoneInput, inputGroupDivider, phoneTypeInput], uniquePhoneClassName, "phonesInput", "Phone Number");
	numPhones++;
}

function addEmailInput(value = "") {
	var uniqueEmailClassName = `email${numEmails}`;
	var emailInput = document.createElement("input");
	emailInput.type = "email";
	emailInput.name = `emails[]`;
	emailInput.placeholder = "email";
	emailInput.value = value;

	addInput([emailInput], uniqueEmailClassName, "emailsInput", "Email");
	numEmails++;
}

function addHeadshotInput(value = "") {
	var uniqueHeadshotClassName = `headshot${numHeadshots}`;
	var headshotInput = document.createElement("input");
	headshotInput.type = "text";
	headshotInput.name = "headshots[]";
	headshotInput.placeholder = "headshot url";
	headshotInput.value = value;

	addInput([headshotInput], uniqueHeadshotClassName, "headshotsInput", "Headshot URL");
	numHeadshots++;
}

// When a profile is edited, the data is passed in and needs to populate the form.
// The code below fills out the form elements that can be expanded, so all the current elements are displayed
profile = window.bootstrapData;
if (profile.ethnicities && profile.ethnicities.length > 0) {
	profile.ethnicities.forEach((ethnicity) => {
		addEthnicityInput(ethnicity);
	});
}

if (profile.skills && profile.skills.length > 0) {
	profile.skills.forEach((skill) => {
		addSkillInput(skill);
	});
}

if (profile.filmography && profile.filmography.length > 0) {
	profile.filmography.forEach((film) => {
		addFilmInput(film);
	});
}

if (profile.phoneNumbers && profile.phoneNumbers.length > 0) {
	profile.phoneNumbers.forEach((itr) => {
			addPhoneInput(itr.phoneNumber, itr.phoneType);
	});
}

if (profile.emails && profile.emails.length > 0) {
	profile.emails.forEach((email) => {
		addEmailInput(email);
	});
}

if (profile.headshots && profile.headshots.length > 0) {
	profile.headshots.forEach((headshot) => {
		addHeadshotInput(headshot);
	});
}