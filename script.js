const myLibrary = [
    {
        title:"L'AUTOROUTE du Millionnaire",
        author:"MJ DEMARCO",
        pages: 480,
        status: "No read",
        information: "No information",
        id: crypto.randomUUID()
    },
    {
        title: "L'INVESTISSEUR INTELLIGENT",
        author: "BENJAMIN GRAHAM",
        pages: 679,
        status: "read",
        information: `C'est un classique considéré comme la bible de l'investissement dans la valeur.
                    Le livre enseigne aux lecteurs à distinguer investissement et spéculation. Graham
                     y développe des concepts fondamentaux comme la marge de sécurité, l'analyse de la 
                    valeur intrinsèque d'une entreprise, et la nécéssité de séparer le prix d'une action 
                    de sa valeur réelle.`,
        id: crypto.randomUUID()
    }
];

function Book(title, author, pages, status, information) { // Constructor  
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.information = information;
    this.id = crypto.randomUUID();

}

Book.prototype.updateStatus = function () {
    if (this.status == "read") {
        this.status = "No read";
    } else {
        this.status = "read"
    }
}

function updateStatus(book) {
    if (book.status == "read") {
        book.status = "No read";
    } else {
        book.status = "read";
    }
}

// Fonction qui ajoute un nouveau livre à la bibliothèque
function addBookToLibrary(title, author, pages, status, information) {

    myLibrary.push(new Book(title, author, pages, status, information));
    modale.close();
}

// Processus d'ajout d'un nouveau livre dans la bibliothèque

// 1- Affichage et fermeture du modale
const modale = document.getElementById("form");
const openModale = document.querySelectorAll("#new_book");
const closeModale = document.getElementById("close_form");

openModale.forEach(button => {
    button.addEventListener("click", () => {
        modale.showModal();
    })
})

closeModale.addEventListener("click", () => {
    modale.close();
})

// 2- Récupération des informations saisis, création et ajout d'un nouveau livre à la bibliothèque.
const handleNewBook = function () {

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = parseInt(document.getElementById("pages").value);
    const information = document.getElementById("information").value;

    const radios = document.querySelectorAll("input[name='book_status']");

    let status;
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            status = radios[i].value;
            break
        }
    } 
    addBookToLibrary(title, author, pages, status, information);
    removeAllChild(); // Réinitialise l'espace d'affichage des livres pour ajouter le nouveau.
    handleReset(); // Réinitialise le formulaire
    showAllBook(); // Affiche les livres présent dans la bibliothèque
    associateObjectsToElementsDOM(); // Pour associer chaque élément représentant un livre au livre correspondant
}

const addBook = document.querySelectorAll("#add_book");

addBook.forEach(button => {
    button.addEventListener("click", handleNewBook);
})

        
// 3- Affichage des livre dans la page web.
const content = document.querySelector(".content");
const fragment = document.createElement("div");

function showAllBook() {
 
    fragment.classList.add("book_container");
    
    for (let book of myLibrary) {
        const bookContent = document.createElement("div"), 
            mainInformation = document.createElement("div"),
            boutonTop = document.createElement("button"),
            boutonBottom = document.createElement("button"),
            title = document.createElement("h2"),
            paragraph = document.createElement("p"),
            authorName = document.createElement("h3");
        

        bookContent.classList.add("book_content");
         
        mainInformation.classList.add("main");
        boutonTop.classList.add("status");

        boutonBottom.classList.add("remove");

        title.textContent = book.title;
        paragraph.textContent = `Contient ${book.pages} pages et écrit par`;
        authorName.textContent = book.author;
        boutonTop.textContent = book.status;
        if (book.status == "read") {
            boutonTop.setAttribute("style", "border: 2px solid greenyellow; background-color: greenyellow; color: black;");
        } else {
            boutonTop.setAttribute("style", "border: 2px solid red; background-color: red; color: #FBF8EF;");
        } 
        boutonBottom.textContent = "Remove";

        mainInformation.appendChild(title);
        mainInformation.appendChild(paragraph);
        mainInformation.appendChild(authorName);

        bookContent.appendChild(boutonTop);
        bookContent.appendChild(mainInformation);
        bookContent.appendChild(boutonBottom);

        fragment.appendChild(bookContent);
    }
    content.appendChild(fragment);
}

showAllBook();

// Association de chaque éléments à l'objet livre correspondant.
function associateObjectsToElementsDOM() {
    const statusButton = document.querySelectorAll(".status");
    const removeButton = document.querySelectorAll(".remove");

    statusButton.forEach((button, index) => {
        let object = myLibrary[index];
        if (object) {
            button.theBook = object;
        }
    })

    removeButton.forEach((button, index) => {
        let object = myLibrary[index];
        if (object) {
            button.theBook = object;
        }
    })
}

associateObjectsToElementsDOM();

// Mise à jour de l'espace d'affichage des livres.
function removeAllChild() {
    while (fragment.firstChild) {
        fragment.firstChild.remove();
    }
    content.removeChild(fragment);
}


// Bouton rafraichir
function handleReset() {
    let title = document.getElementById("title");
    let author = document.getElementById("author");
    let pages = document.getElementById("pages");
    let information = document.getElementById("information");

    title.value = '';
    author.value = '';
    pages.value = '';
    information.value = 'No information';

    let radios = document.querySelectorAll("input[name='book_status']");
    radios.forEach(radio => {radio.checked = false});
}

const resetButton = document.querySelector("#reset");
resetButton.addEventListener("click", handleReset);


// 4- Changement de status d'un livre
const changeStatus = document.querySelectorAll(".status");

changeStatus.forEach(button => {
    button.addEventListener("click", (e) => {
        const book = e.currentTarget.theBook;
        updateStatus(book); // Mise à jour de la status d'un livre.
        removeAllChild();
        showAllBook();
        associateObjectsToElementsDOM();
    })
})

// 5- Suppression d'un livre de la file
const removeBook = document.querySelectorAll(".remove");

removeBook.forEach(button => {
    button.addEventListener("click", e => {
        const book = e.currentTarget.theBook;
        const index = myLibrary.indexOf(book);
        myLibrary.splice(index, 1);
        removeAllChild();
        showAllBook();
        associateObjectsToElementsDOM();
    })
})

