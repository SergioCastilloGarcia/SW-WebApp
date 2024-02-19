// Simular resultados de búsqueda
function search() {
    var searchResults = $("#searchResults");
    searchResults.empty();

    // Simulamos búsqueda, aquí debes incluir tu lógica de búsqueda real
    var results = getResultList();

    agregarCards(results)
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
    var searchTerm = $("#search").val();
    var category = $("#category").val();
    return [
        { id: 11, title: "Kirby", img: "https://uvejuegos.com/img/caratulas/21119/Copia%20de%20kirby-mouse-attack-ds.jpg", starMedia: "3.9", category: "plataforma" },
        { id: 22, title: "Sonic", img: "https://images.cdn2.buscalibre.com/fit-in/360x360/71/59/7159dc0a2cf1c004783b55eff8b3481f.jpg", starMedia: "1.2", category: "deportes" },
        { id: 33, title: "Pokemon Ranger", img: "https://uvejuegos.com/img/caratulas/16646/pokemon-ranger-dsG.jpg", starMedia: "5", category: "carreras" }
    ];
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
    //TODO llamar a API
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
        if (!isGameAdded(game.id)) {//evitamos duplciados
            const item = $(`<div class="card" id="${game.id}">
                        <img src="${game.img}" />
                        <div class="d-none">
                            <p id="${game.id}_title">${game.title}</p>
                            <p id="${game.id}_category">${game.category}</p>
                            <p id="${game.id}_starMedia">${game.starMedia}</p>
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