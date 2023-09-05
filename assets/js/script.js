class Contact {
    constructor(name, fixPhone, celphone, img, date, mail, cep, city, instagram, github) {
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
    }
}

class ContactList {
    constructor() {
        this.contacts = [];
    }

    add(name, fixPhone, celphone, img, date, mail, cep, city, instagram, github) {
        if(emptyInputs()) {
            sendMSG("Preencha todos os campos", "error")
        } else if(!isURLValida(img)) {
            sendMSG("URL inválido", "error")
        } else {
            const contact = new Contact(name, fixPhone, celphone, img, date, mail, cep, city, instagram, github);
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
}

const contactList = new ContactList();

function showContacts() {

    document.getElementById("list").classList.remove("hidden");
    const contactJournal = document.getElementById("list");
    contactJournal.innerHTML = "";

    contactList.contacts.forEach((contact) => {
        const cardDiv = 
        `
        <button class="card">
            <img id="card-img" src="${contact.img}"><img>
            <div id="infos">
                <h3>${contact.name}</h3>
                <p>Celular: ${contact.celphone}</p>
                <p>Telefone: ${contact.fixPhone}</p>
                <p>Data de aniversário: ${contactList.formatDate(contact.date)}</p>
                <p>Idade: ${contactList.calculateAge(contact.date)}</p>
                <p>Signo: ${contactList.getZodiacSign(contact.date)}</p>
                <p>Email: ${contact.mail}</p>
                <p>CEP: ${contact.cep}</p>
                <p>Cidade: ${contact.city}</p>
                <p>Instagram: ${contact.instagram}</p>
                <p>GitHub: ${contact.github}</p>
            </div>
            <div id="social">
                <a href="https://instagram.com/${contact.instagram}" target="_blank">
                    <img class="icons" src="https://cdn-icons-png.flaticon.com/512/87/87390.png"></img>
                </a>    
                <a href="https://github.com/${contact.github}" target="_blank">
                    <img class="icons" src="https://cdn-icons-png.flaticon.com/512/25/25231.png"></img>
                </a>
            </div>
        </button>
        `
        contactJournal.innerHTML += cardDiv;
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

    if(name == "" && fixPhone == "" && celphone == "" && img == "" && date == "" && mail == "" && cep == "" && city == "" && instagram == "" && github == "") {
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
    document.getElementById("city").value= ""; 
    document.getElementById("instagram").value = ""; 
    document.getElementById("github").value = ""; 
}

function sendMSG(msg,type){  
    // Como type vai ser a class, será ou error ou success
    const msgDiv = document.getElementById("msg");
    msgDiv.innerHTML = "";

    const msgP = `
        <p class="${type}">${msg}</p>
    `;

    msgDiv.innerHTML += msgP;

    setTimeout(function(){
        msgDiv.innerHTML = "";
    }, 3000);
}

function isURLValida(url) {
    if(url.match(/\.(jpeg|jpg|gif|png)$/) != null){
        return true;
    } else {
        return false;
    }
}