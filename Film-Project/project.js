const form = document.querySelector("#film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");


// UI objesini başlatma
const ui = new UI();

//Storage Objesi Üret

const storage = new Storage();


// Tüm Eventleri Yükleme

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    });

    cardBody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);
}

function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === "" || director === "" || url === ""){
         ui.displayMessages("Please Fill In All Fields! ","danger");
    }

    else {

        // Yeni Film Oluşturma

        const newFilm = new Film(title,director,url);

            ui.addFilmToUI(newFilm);
            storage.addFilmToStorage(newFilm); // Storage'a Film Ekleme
            ui.displayMessages("Movie Successfully Added","success");

    }

    ui.clearInput(titleElement,urlElement,directorElement);

    e.preventDefault();
}


function deleteFilm(e){

    if(e.target.id === "delete-film"){

        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMessages("Movie Successfuly Deleted!","warning")
    }

}

function clearAllFilms(){
    
    if(confirm("Are You Sure That?")){
        ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage();
    }
    
}