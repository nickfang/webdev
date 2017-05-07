function addInput(newInputHTML, refId) {
	var refElement = document.getElementById(refId);
	insertLocation = refElement.parentElement;

	insertLocation.insertBefore(newInputHTML, refElement);
}

function addDeleteButton(refId) {
	var deleteButton = document.createElement("button");
	deleteButton.class = "remove";
	// deleteButton.id =
}

function remove() {
	console.log("remove clicked");
	var delClass = this.getAttribute("class");
	console.log("remove: ", delClass);

	tempElements = document.getElementsByClassName(delClass);
	console.log(tempElements);
	tempElements.forEach((itr) => {
		itr.parentNode.removeChild();
	})
	// tempElement.parentNode.removeChild(tempElement);
	// tempElement = document.getElementById(id + "x");
	// tempElement.parentNode.removeChild(tempElement);
}

// this is in main.js since it is used in new.ejs and edit.ejs.
const phoneTypes = ["home", "cell", "work"];
const ethnicities = ["Caucasian", "African American", "Hispanic", "Asian", "South Asian", "Native American", "Middle Eastern", "Southeast Asian / Pacific Islander", "Ethnically Ambiguous / Mixed Race", "African Descent"];

// TODO: figure out how to reset these num variables when the page is loaded.  I think this will constantly increment otherwise.
// TODO: need to figure out when main.js is reloaded.
var numEthnicities = 0;
var numSkills = 0;

function addEthnicityInput() {
	var ethnicityInput = document.createElement("select");
	ethnicityInput.name = `ethnicities[${numEthnicities}]`;
	ethnicityInput.class = `eth${numEthnicities}`;
	ethnicities.forEach((itr) => {
		var option = document.createElement("option");
		option.value = itr;
		option.textContent = itr;
		ethnicityInput.append(option);
	});
	addInput(ethnicityInput, "ethnicitiesInput");
	var deleteButton = document.createElement("button");
	deleteButton.type = "button";
	// deleteButton.name = `eth${numEthnicities}`;
	deleteButton.class = `eth${numEthnicities}`;
	deleteButton.innerHTML = "x";
	addInput(deleteButton, "ethnicitiesInput");
	deleteButton.addEventListener("click", remove);
	numEthnicities++;
}

function addSkillInput() {
	var skillInput = document.createElement("input");
	skillInput.type = "text";
	skillInput.name = `skills[${numSkills}]`;
	skillInput.placeholder = "skill"
	addInput(skillInput, "skillsInput");
	numSkills++;
}

function addFilmInput() {
	var filmInput = document.createElement("input");
	filmInput.type = "text";
	filmInput.name = "films[]";
	filmInput.placeholder = "film"
	addInput(filmInput, "filmsInput");
}

// add two input elements.  One that is the number and one that is the type.
function addPhoneInput() {
	var phoneInput = document.createElement("input");
	phoneInput.type = "tel";
	phoneInput.name = `phones[]`; // ${numPhoneInputs}
	phoneInput.placeholder = "phone number";
	addInput(phoneInput, "phonesInput");

	var phoneTypeInput = document.createElement("select");
	phoneTypeInput.name = "phoneTypes[]";
	phoneTypes.forEach((itr) => {
		var option = document.createElement("option");
		option.value = itr;
		option.textContent = itr;
		phoneTypeInput.append(option);
	});
	addInput(phoneTypeInput, "phonesInput");
}

function addEmailInput() {
	var emailInput = document.createElement("input");
	emailInput.type = "email";
	emailInput.name = `emails[]`;
	emailInput.placeholder = "email";
	addInput(emailInput, "emailsInput");
}

function addHeadshotInput() {
	var headshotInput = document.createElement("input");
	headshotInput.type = "text";
	headshotInput.name = "headshots[]";
	headshotInput.placeholder = "headshot url";
	addInput(headshotInput, "headshotsInput");
}
