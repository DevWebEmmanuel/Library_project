const myLibrary = [];

const content = document.querySelector(".content");

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
        this.status = "read";
    }
}

// Fonction qui ajoute un nouveau livre à la bibliothèque
function addBookToLibrary(title, author, pages, status, information) {
    let book = new Book(title, author, pages, status, information)
    myLibrary.push(book);
    handleReset();
    modale.close();
    return book;
}

// Processus d'ajout d'un nouveau livre dans la bibliothèque

// 1- Affichage et fermeture du modale
const modale = document.getElementById("form");
const openModale = document.querySelectorAll(".new_book");
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
const handleNewBook = function (event) {
    
   

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
    
    event.preventDefault();
    
    const book = addBookToLibrary(title, author, pages, status, information);
    const card = createBookCard(book); // Création d'une carte de livre
    content.appendChild(card); // Affichage de la carte dans la library
}

const addBook = document.querySelector("#add_book");

addBook.addEventListener("click", handleNewBook);

function createBookCard(book) {
    const bookContent = document.createElement("div"), 
        mainInformation = document.createElement("div"),
        boutonTop = document.createElement("button"),
        boutonBottom = document.createElement("button"),
        title = document.createElement("h2"),
        paragraph = document.createElement("p"),
        authorName = document.createElement("h3");
        
    bookContent.classList.add("book_content");
    bookContent.dataset.bookId = book.id;
        
    mainInformation.classList.add("main");

    boutonTop.classList.add("status");
    boutonTop.dataset.action = "toggle-status";

    boutonBottom.classList.add("remove");
    boutonBottom.dataset.action = "remove";   

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

    return bookContent;
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


content.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button || !content.contains(button)) return;

    const card = button.closest("[data-book-id]");
    const book = myLibrary.find(item => item.id === card.dataset.bookId);
    if (!book) return;

    if (button.dataset.action === "toggle-status") {
        book.updateStatus();
        button.textContent = book.status;
        if (book.status == "read") {
            button.setAttribute("style", "border: 2px solid greenyellow; background-color: greenyellow; color: black;");
        } else {
            button.setAttribute("style", "border: 2px solid red; background-color: red; color: #FBF8EF;");
        }
        // Mettre à jour le texte et la classe du bouton.
    }

    if (button.dataset.action === "remove") {
        myLibrary.splice(myLibrary.indexOf(book), 1);
        card.remove();
    }
});
