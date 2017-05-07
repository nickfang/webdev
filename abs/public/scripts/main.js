function addInput(newInputHTML, refId) {
	var refElement = document.getElementById(refId);
	insertLocation = refElement.parentElement;

	insertLocation.insertBefore(newInputHTML, refElement);
}

const phoneTypes = ["home", "cell", "work"];
const ethnicities = ["Caucasian", "African American", "Hispanic", "Asian", "South Asian", "Native American", "Middle Eastern", "Southeast Asian / Pacific Islander", "Ethnically Ambiguous / Mixed Race", "African Descent"];

function addEthnicityInput() {
	var ethnicityInput = document.createElement("select");
	ethnicityInput.name = "ethnicities[]";
	ethnicities.forEach((itr) => {
		var option = document.createElement("option");
		option.value = itr;
		option.textContent = itr;
		ethnicityInput.append(option);
	});
	addInput(ethnicityInput, "ethnicitiesInput");
}

function addSkillInput() {
	var skillInput = document.createElement("input");
	skillInput.type = "text";
	skillInput.name = "skills[]";
	skillInput.placeholder = "skill"
	addInput(skillInput, "skillsInput");
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
