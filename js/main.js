//Comprobamos que esta logeado
isLogin();
var modalGameId;//referencia al ide del juego que abrio la modal
$(document).ready(function () {

    getGames();

    //Funcionalidad de cada columna
    $(".column").droppable({
        accept: ".card",
        drop: function (event, ui) {
            dropTableFunction(ui, $(this))
        }
    });

    //Funcionalidad del buscador
    $("#search").on("input", search);
});

//Función que permite que las columnas acepten cards
function dropTableFunction(ui, element) {
    var targetColumn = element;
    var draggedCard = ui.draggable;
    var targetColumnId = targetColumn.attr('id')
    var oldColumnId = draggedCard.parent().attr('id')
    // Comprobamos si la tarjeta está siendo movida entre columnas y no está ya en la columna de destino
    if (oldColumnId !== targetColumnId && !targetColumn.find('#' + draggedCard.attr('id')).length) {
        draggedCard.detach().appendTo(targetColumn);
        var gameId = draggedCard.attr('id');
        var state = targetColumn.data("state")
        changeGameState(gameId, state)
        updateColumnCount(targetColumnId);
        updateOldColumnCount(oldColumnId);
    }

}

//Actualiza el contador de una columna
function updateColumnCount(targetColumnId) {
    var gamesCount = $("#" + targetColumnId + " .card").length;
    $("#" + targetColumnId + "_count").text("(" + gamesCount + ")");
}
//Actualiza el contador de una columna  a la que se le ha eliminado una card
function updateOldColumnCount(targetColumnId) {
    var gamesCount = $("#" + targetColumnId + " .card").length;
    $("#" + targetColumnId + "_count").text("(" + (gamesCount - 1) + ")");
}
// Función start de un elemento
function startFunction(element) {
    element.css('opacity', '0.5'); // Reducir la opacidad al comenzar el arrastre
}

// Función stop de un elemento
function stopFunction(element) {
    element.css('opacity', '1'); // Restaurar la opacidad cuando se suelta la tarjeta
    var parent = element.parent();

    // Comprobamos si la tarjeta se movió fuera del tablero kanban
    if (!parent.hasClass('column')) {
        element.remove(); // Si se movió fuera del kanban, eliminar la tarjeta
    }
}

//Abre la modal de un juego
function clickCard() {
    modalGameId = $(this).attr('id');
    // Cambiar el título del modal por el texto de la tarjeta
    gameTitle = $("#" + modalGameId + "_title").text()
    $("#modalTitle").text(gameTitle);
    // Abrir el modal
    $("#cardModal").modal("show");
}

// Simular resultados de búsqueda
function search() {
    var searchTerm = $(this).val().toLowerCase();
    var searchResults = $("#searchResults");
    searchResults.empty();

    // Simulamos búsqueda, aquí debes incluir tu lógica de búsqueda real
    var results = getResultList(searchTerm);

    agregarCards(results)
}

//Hacer draggable un item
function addDraggable(item) {
    item.draggable({
        revert: "invalid",
        helper: "clone",
        start: function (event, ui) {
            startFunction($(this));
        },
        stop: function (event, ui) {
            stopFunction($(this));
        }
    });
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

//Cambia el estado de un juego
function changeGameState(gameId, state) {
    //TODO llamar a api
    var username = getCookie("username");
    console.log("Cambio de estado: %s, %s, %s ", gameId, state, username)
}

//Elimina un juego
function eliminar() {
    //TODO llamar a api
    var username = getCookie("username");
    var parentId = $("#" + modalGameId).parent().attr("id");
    $("#" + modalGameId).remove();//Eliminamos la card
    updateColumnCount(parentId);//Actualizamos el contador
    $("#cardModal").modal("hide");// Cerramos el modal

    console.log("Eliminado: %s, %s", modalGameId, username)

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