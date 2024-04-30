const $buttonAdd = document.querySelector(".button-add");
const $buttonSave = document.querySelector(".button-save");
const $buttonEdit = document.querySelector(".button-edit");
const $buttonDelete = document.querySelector(".button-delete");
const $inputCompany = document.querySelector(".js-input-company");
const $inputContact = document.querySelector(".js-input-contact");
const $clientId = document.querySelector(".js-client-id");
const $selectCountry = document.querySelector("#select-country");
const $tableList = document.querySelector(".js-tablelist");

const clients = [];
let id = 1;

function buttonDeleteClick() {
  $buttonDelete.disabled = false;
  $buttonDelete.classList.remove("bg-gray-500");
}

function buttonDeleteNonClick() {
  $buttonDelete.disabled = true;
  $buttonDelete.classList.add("bg-gray-500");
}

buttonDeleteNonClick();

function buttonSaveClick() {
  $buttonSave.disabled = false;
  $buttonSave.classList.remove("bg-gray-500");
}

function buttonSaveNonClick() {
  $buttonSave.disabled = true;
  $buttonSave.classList.add("bg-gray-500");
}

buttonSaveNonClick();

function buttonEditClick() {
  $buttonEdit.disabled = false;
  $buttonEdit.classList.remove("bg-gray-500");
}

function buttonEditNonClick() {
  $buttonEdit.disabled = true;
  $buttonEdit.classList.add("bg-gray-500");
}

buttonEditNonClick();

function buttonAddClick() {
  $buttonAdd.disabled = false;
  $buttonAdd.classList.remove("bg-gray-500");
}

function buttonAddNonClick() {
  $buttonAdd.disabled = true;
  $buttonAdd.classList.add("bg-gray-500");
}

function makeEditable() {
  $inputCompany.removeAttribute("disabled");
  $inputContact.removeAttribute("disabled");
  $selectCountry.removeAttribute("disabled");
}

function nonEditable() {
  $inputCompany.setAttribute("disabled", true);
  $inputContact.setAttribute("disabled", true);
  $selectCountry.setAttribute("disabled", true);
}

$buttonAdd.addEventListener("click", function () {
  makeEditable();
  buttonSaveClick();
  buttonAddNonClick();
  clearFields();
  $clientId.value = id;
});

$buttonSave.addEventListener("click", function () {
  const company = $inputCompany.value;
  const contact = $inputContact.value;
  const country = $selectCountry.options[$selectCountry.selectedIndex].value;

  if (
    $selectCountry.value === "Country" ||
    $inputCompany.value === "" ||
    $inputContact.value === ""
  ) {
    alert("Please fill the mandatories fields");
  } else {
    addClient(id, company, contact, country);

    alert("Client added sucesfully");
    renderList(clients);
    clearFields();
    nonEditable();
    buttonSaveNonClick();
    buttonAddClick();
    id++;
  }
});

function clearFields() {
  $inputCompany.value = "";
  $inputContact.value = "";
  $selectCountry.value = "Country";
  $clientId.value = "";
}

function addClient(id, company, contact, country) {
  const newClient = {
    id: id,
    company: company,
    contact: contact,
    country: country,
  };

  clients.push(newClient);
}
function renderList(clients) {
  let result = "";

  for (let index = 0; index < clients.length; index++) {
    const currentClient = clients[index];
    result += getTemplate(
      currentClient.id,
      currentClient.company,
      currentClient.contact,
      currentClient.country,
      index
    );
  }
  $tableList.innerHTML = result;
}

function getTemplate(id, company, contact, country, index) {
  return `<tr class="table-row js-table-line hover:bg-sky-600  hover:cursor-pointer bg-gray-${
    index % 2 === 0 ? 500 : 400
  }" data-index="${index}" onclick="loadClients(${index})">
  <td class="">${id}</td>
  <td class="">${company}</td>
  <td class="">${contact}</td>
  <td class="">${country}</td>
  </tr>`;
}

let currentIndex;

function loadClients(index) {
  if ($buttonAdd.disabled === true) {
    alert("adding mode, please finish your record");
    return;
  }
  currentIndex = index;
  $clientId.value = clients[index].id;
  $inputCompany.value = clients[index].company;
  $inputContact.value = clients[index].contact;
  $selectCountry.value = clients[index].country;
  makeEditable();
  buttonEditClick();
  buttonDeleteClick();
  buttonAddNonClick();
}

$buttonEdit.addEventListener("click", function () {
  if (currentIndex !== null) {
    clients[currentIndex].company = $inputCompany.value;
    clients[currentIndex].contact = $inputContact.value;
    clients[currentIndex].country = $selectCountry.value;

    renderList(clients);
    clearFields();
    nonEditable();
    buttonSaveNonClick();
    buttonEditNonClick();
    buttonDeleteNonClick();
    buttonAddClick();
    alert("Client edited sucesfully");
  }
});

$buttonDelete.addEventListener("click", function () {
  if (currentIndex !== null && currentIndex < clients.length) {
    const deletedCompany = clients[currentIndex].company;
    clients.splice(currentIndex, 1);
    alert(`Client ${deletedCompany} has been deleted`);
    renderList(clients);
    clearFields();
    nonEditable();
    currentIndex = null;
    buttonAddClick();
    buttonEditNonClick();
    buttonDeleteNonClick();
  }
});

renderList(clients);
