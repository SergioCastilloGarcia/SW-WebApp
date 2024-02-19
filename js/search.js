// Simular resultados de búsqueda
function search() {
    var searchResults = $("#searchResults");
    searchResults.empty();
    getResultList();
}

//Devuelve si el elemento esta ya añadido
function isGameAdded(id) {
    var isIdUnique = true;
    $(".column").each(function () {
        if ($(this).find("#" + id).length) {
            isIdUnique = false;
            return false; // Salir del bucle each si se encuentra la ID en alguna columna
        }
    });
    return !isIdUnique;
}

//Obtiene los juegos y los pinta
function getGames() {
    var games = getGamesList();
    agregarCards(games);
}
//Obtiene los juegos de la api
function getResultList() {
    //TODO llamar a API
    var category = $("#category").val();
    var data = {
        gameName: $("#search").val()
    }
    doGet(RAWG_GAMES, data,
        function (respuesta) {
            agregarCards(respuesta.results)
        }, function (error) {
            alert("No se han podido conseguir los juegos: " + error);
        });
}
//Obtiene los juegos de la api
function getGamesList() {
    //TODO llamar a API
    var userId = getCookie("userId");
    return [
        { id: 88, title: "Mario Kart", img: "https://uvejuegos.com/img/caratulas/7116/Caja_NDS_MarioKart[1].jpg", state: "todo", starMedia: "0", category: "carreras" },
        { id: 78, title: "Mario 64", img: "https://uvejuegos.com/img/caratulas/7113/super_mario_64_ds_eur.jpg", state: "done", starMedia: "1.1", category: "plataforma" },
        { id: 98, title: "Mario y Luigi", img: "https://uvejuegos.com/img/caratulas/15406/BajandochemsNDS.jpg", state: "inProgress", starMedia: "2.3", category: "deportes" }
    ];
}
//Obtiene las categorias de la api y los añade
function getCategories() {
    doGet(RAWG_CATEGORIES, undefined,
        function (respuesta) {
            agregarCategorias(respuesta.results);
        }, function (error) {
            alert("No se han podido conseguir las categorias: " + error);
        });
}
//Añade las categorias
function agregarCategorias(categories) {

    var select = $("#category");
    var filterSelect = $("#categoryFilter");

    // Iteramos sobre la lista
    $.each(categories, function (index, category) {
        // Creamos un elemento option con el valor y el texto correspondientes
        var option = $("<option>").attr("value", category.name).text(category.name);

        // Agregamos el elemento option al select de busqueda y filtrado
        select.append(option);
        filterSelect.append(option.clone());
    });

}
//Agrega las cards
function agregarCards(games) {
    games.forEach(function (game) {
        if (!isGameAdded(game.id)) {//evitamos duplciados//todo starmedia
            const item = $(`<div class="card" id="${game.id}">
                        <img src="${game.background_image}" />
                        <div class="d-none">
                            <p id="${game.id}_title">${game.name}</p>
                            <p id="${game.id}_category">${game.genres?.map(g => g.name).join(';')}</p>
                        </div>
                        
                    </div>`);

            addDraggable(item);
            item.click(clickCard);

            //lo añade a la columa con el state necesario, por defecto en el buscador
            const elementoDestino = $("#" + (game.state ? game.state : "searchResults"));
            if (elementoDestino.length > 0) {
                elementoDestino.append(item);

                updateColumnCount(elementoDestino.attr("id"));
            } else {
                console.error(`No se encontró el elemento destino para el estado ${game.state ? game.state : "searchResults"}`);
            }
        }
    });
}