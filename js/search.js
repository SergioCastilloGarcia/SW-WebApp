
// Simular resultados de búsqueda
function search() {
    var searchTerm = $(this).val().toLowerCase();
    var searchResults = $("#searchResults");
    searchResults.empty();

    // Simulamos búsqueda, aquí debes incluir tu lógica de búsqueda real
    var results = getResultList(searchTerm);

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
function getResultList(searchTerm) {
    //TODO llamar a API
    var username = getCookie("username");
    var category = $("#category").val();
    return [
        { id: 11, title: "Kirby", img: "https://uvejuegos.com/img/caratulas/21119/Copia%20de%20kirby-mouse-attack-ds.jpg" },
        { id: 22, title: "Sonic", img: "https://images.cdn2.buscalibre.com/fit-in/360x360/71/59/7159dc0a2cf1c004783b55eff8b3481f.jpg" },
        { id: 33, title: "Pokemon Ranger", img: "https://uvejuegos.com/img/caratulas/16646/pokemon-ranger-dsG.jpg" }
    ];
}
//Obtiene los juegos de la api
function getGamesList() {
    //TODO llamar a API
    var username = getCookie("username");
    return [
        { id: 88, title: "Mario Kart", img: "https://uvejuegos.com/img/caratulas/7116/Caja_NDS_MarioKart[1].jpg", state: "todo" },
        { id: 78, title: "Mario 64", img: "https://uvejuegos.com/img/caratulas/7113/super_mario_64_ds_eur.jpg", state: "done" },
        { id: 98, title: "Mario y Luigi", img: "https://uvejuegos.com/img/caratulas/15406/BajandochemsNDS.jpg", state: "inProgress" }
    ];
}
//Obtiene y añade las categorias
function getCategories() {
    var categories = getCategoriesList();
    // Seleccionamos el elemento select
    var select = $("#category");

    // Iteramos sobre la lista
    $.each(categories, function (index, category) {
        // Creamos un elemento option con el valor y el texto correspondientes
        var option = $("<option>").attr("value", category.slug).text(category.name);

        // Agregamos el elemento option al select
        select.append(option);
    });
}
//Obtiene los juegos de la api
function getCategoriesList() {
    //TODO llamar a API
    return [
        { id: 1, name: "Plataforma", slug: "plataforma" },
        { id: 2, name: "Carreras", slug: "carreras" },
        { id: 3, name: "Deportes", slug: "deportes" }
    ];
}
//Agrega las cards
function agregarCards(games) {
    games.forEach(function (game) {
        if (!isGameAdded(game.id)) {//evitamos duplciados
            const item = $(`<div class="card" id="${game.id}">
                        <img src="${game.img}" />
                        <div class="d-none">
                            <p id="${game.id}_title">${game.title}</p>
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