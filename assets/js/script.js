class Contact {
    constructor(id, name, fixPhone, celphone, img, date, mail, cep, city, instagram, github, favorites) {
        this.id = id;
        this.name = name;
        this.fixPhone = fixPhone;
        this.celphone = celphone;
        this.img = img;
        this.date = date;
        this.mail = mail;
        this.cep = cep;
        this.city = city;
        this.instagram = instagram;
        this.github = github;
        this.favorites = favorites;
    }
}

class ContactList {
    constructor() {
        this.contacts = [];
        this.favoriteContacts = [];
    }

    add(name, fixPhone, celphone, img, date, mail, cep, city, instagram, github, favorites) {
        if (emptyInputs()) {
            sendMSG("Preencha todos os campos", "error")
        } else if (!isURLValida(img)) {
            sendMSG("URL inválido", "error")
        } else {
            const contact = new Contact(generateId(), name, fixPhone, celphone, img, date, mail, cep, city, instagram, github, favorites = false);
            sendMSG("Parabéns, cadastro feito com sucesso!", "success")
            this.contacts.push(contact)
            cleanInputs()
        }
    }

    getZodiacSign(date) {
        let birthdate = date.split("-");
        let day = birthdate[2];
        let month = birthdate[1];
        console.log("Passou pelo getSigno() da class User");

        if ((month == 1 && day <= 20) || (month == 12 && day >= 22)) {
            return "Capricórnio ♑";
        } else if ((month == 1 && day >= 21) || (month == 2 && day <= 18)) {
            return "Aquário ♒";
        } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
            return "Peixes ♓";
        } else if ((month == 3 && day >= 21) || (month == 4 && day <= 20)) {
            return "Áries ♈";
        } else if ((month == 4 && day >= 21) || (month == 5 && day <= 20)) {
            return "Touro ♉";
        } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
            return "Gêmeos ♊";
        } else if ((month == 6 && day >= 22) || (month == 7 && day <= 22)) {
            return "Câncer ♋";
        } else if ((month == 7 && day >= 23) || (month == 8 && day <= 23)) {
            return "Leão ♌";
        } else if ((month == 8 && day >= 24) || (month == 9 && day <= 23)) {
            return "Virgem ♍";
        } else if ((month == 9 && day >= 24) || (month == 10 && day <= 23)) {
            return "Libra ♎";
        } else if ((month == 10 && day >= 24) || (month == 11 && day <= 22)) {
            return "Escorpião ♏";
        } else if ((month == 11 && day >= 23) || (month == 12 && day <= 21)) {
            return "Sagitário ♐";
        }
    }

    calculateAge(date) {
        const d = new Date();
        let year = d.getFullYear();
        let yy = date.split("-");
        let formatYear = Number(yy[0]);
        let age = (year - formatYear)
        return age
    }

    formatDate(date) {
        let d = date.split("-")
        let dd = d[2]
        let mm = d[1]
        let yy = d[0]

        return `${dd} / ${mm} / ${yy}`
    }

    favoriteContact(id) {
        this.contacts.forEach((contact) => {
            if (contact.id == id) {
                contact.favorites = true;
            }
            this.favoriteContacts.push(contact);
        });

    }

    deleteContact(id) {
        this.contacts = this.contacts.filter((contact) => contact.id !== id);
    }
}

const contactList = new ContactList();

function generateId() {
    return Math.floor(Math.random() * 3000);
}

function removeContact(id) {
    contactList.deleteContact(id);
    showDetails();
    showContacts();
}

function favoriteContact(id) {
    contactList.favoriteContact(id);
    showFavorites()
}

function showContacts() {

    document.getElementById("list").classList.remove("hidden");
    const contactJournal = document.getElementById("list");
    contactJournal.innerHTML = "";

    contactList.contacts.forEach((contact) => {
        const cardDiv =
            `
        <div id="global-list">
        <button class="card" onclick="showDetails()">
           <div id="content-card">
            <img id="card-img-detail" src="${contact.img}"><img>
            <p>Celular: ${formatedCellphone(contact.celphone)}</p>
            <p>Telefone: ${formatedCellphone(contact.fixPhone)}</p>
           </div>
           <div>
            <button class="actions-button" onclick="favoriteContact(${contact.id})">
            <i class="fa-solid fa-heart"></i>
            </button>
           </div>
        </button>
        </div>
        `
        contactJournal.innerHTML += cardDiv;
    });
}

function showFavorites() {
    document.getElementById("favorites").classList.remove("hidden");
    const favoritesList = document.getElementById("favorites");
    contactList.contacts.forEach((contact) => {
        if(contact.favorites == true) {
            const cardDiv =
                `
                <div id="global-list-favorites">
                <button class="card" onclick="showDetails()">
                   <div>
                    <img id="card-img-detail" src="${contact.img}"><img>
                    <p>Celular: ${formatedCellphone(contact.celphone)}</p>
                    <p>Telefone: ${formatedCellphone(contact.fixPhone)}</p>
                   </div>
                   <div>
                   </div>
                </button>
                </div>
                `
            favoritesList.innerHTML += cardDiv;
        }
    });
}

function showDetails() {
    console.log("Passou aqui");
    document.getElementById("details-card").classList.remove("hidden");
    const detailsContact = document.getElementById("details-card");
    detailsContact.innerHTML = "";

    contactList.contacts.forEach((contact) => {
            const divDetails =
                `
            <div id="global-detail">
                <img id="card-img-detail" src="${contact.img}"><img>
                <div id="infos-details">
                    <h3>${contact.name}</h3>
                    <p>ID: ${contact.id}</p>
                    <p>Celular: ${formatedCellphone(contact.celphone)}</p>
                    <p>Telefone: ${formatedCellphone(contact.fixPhone)}</p>
                    <p>Data de aniversário: ${contactList.formatDate(contact.date)}</p>
                    <p>Idade: ${contactList.calculateAge(contact.date)}</p>
                    <p>Signo: ${contactList.getZodiacSign(contact.date)}</p>
                    <p>Email: ${contact.mail}</p>
                    <p>CEP: ${contact.cep}</p>
                    <p>Cidade: ${contact.city}</p>
                    <p>Instagram: ${contact.instagram}</p>
                    <p>GitHub: ${contact.github}</p>
                    <p>Favorito: ${contact.favorites}</p>
                </div>
                <div id="social-details">
                    <a href="https://instagram.com/${contact.instagram}" target="_blank">
                        <img class="icons" src="https://cdn-icons-png.flaticon.com/512/87/87390.png"></img>
                    </a>    
                    <a href="https://github.com/${contact.github}" target="_blank">
                        <img class="icons" src="https://cdn-icons-png.flaticon.com/512/25/25231.png"></img>
                    </a>
                </div>
                <div id="actions">
                    <button class="actions-button" onclick="removeContact(${contact.id})">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </button>
                </div>
            </div>
            `
            detailsContact.innerHTML += divDetails;
    });
}

function createContact() {
    const name = document.getElementById("name").value;
    const fixPhone = document.getElementById("fixPhone").value;
    const celphone = document.getElementById("celphone").value;
    const img = document.getElementById("img").value;
    const date = document.getElementById("date").value;
    const mail = document.getElementById("email").value;
    const cep = document.getElementById("cep").value;
    const city = document.getElementById("city").value;
    const instagram = document.getElementById("instagram").value;
    const github = document.getElementById("github").value;

    contactList.add(name, fixPhone, celphone, img, date, mail, cep, city, instagram, github)

    showContacts()
}

function emptyInputs() {
    let name = document.getElementById("name").value;
    let fixPhone = document.getElementById("fixPhone").value;
    let celphone = document.getElementById("celphone").value;
    let img = document.getElementById("img").value;
    let date = document.getElementById("date").value;
    let mail = document.getElementById("email").value;
    let cep = document.getElementById("cep").value;
    let city = document.getElementById("city").value;
    let instagram = document.getElementById("instagram").value;
    let github = document.getElementById("github").value;

    if (name == "" && fixPhone == "" && celphone == "" && img == "" && date == "" && mail == "" && cep == "" && city == "" && instagram == "" && github == "") {
        return true
    } else if (name == "" || fixPhone == "" || celphone == "" || img == "" || date == "" || mail == "" || cep == "" || city == "" || instagram == "" || github == "") {
        return true
    } else {
        return false
    }
}

function cleanInputs() {
    document.getElementById("name").value = "";
    document.getElementById("fixPhone").value = "";
    document.getElementById("celphone").value = "";
    document.getElementById("img").value = "";
    document.getElementById("date").value = "";
    document.getElementById("email").value = "";
    document.getElementById("cep").value = "";
    document.getElementById("city").value = "";
    document.getElementById("instagram").value = "";
    document.getElementById("github").value = "";
}

function sendMSG(msg, type) {
    // Como type vai ser a class, será ou error ou success
    const msgDiv = document.getElementById("msg");
    msgDiv.innerHTML = "";

    const msgP = `
        <p class="${type}">${msg}</p>
    `;

    msgDiv.innerHTML += msgP;

    setTimeout(function () {
        msgDiv.innerHTML = "";
    }, 3000);
}

function isURLValida(url) {
    if (url.match(/\.(jpeg|jpg|gif|png)$/) != null) {
        return true;
    } else {
        return false;
    }
}

function formatedCellphone(cellphone) {
    let cellphoneArray = cellphone.split("");
    let cellphoneFormated = "(" + cellphoneArray[0] + cellphoneArray[1] + ")"
        + " " + cellphoneArray[2] + cellphoneArray[3] + cellphoneArray[4]
        + cellphoneArray[5] + cellphoneArray[6] + "-"
        + cellphoneArray[7] + cellphoneArray[8]
        + cellphoneArray[9] + cellphoneArray[10];
    return cellphoneFormated;
}