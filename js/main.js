
var modalGameId;//referencia al ide del juego que abrio la modal
$(document).ready(function () {
    //Comprobamos que esta logeado
    isLogin();
    getGames();
    getCategories();
    //Funcionalidad de cada columna
    $(".kanban-column").droppable({
        accept: ".card",
        drop: function (event, ui) {
            dropTableFunction(ui, $(this))
        }
    });

    //Funcionalidad del buscador
    $("#search").on("input", search);
    //Funcionalidad de la categorias
    $("#category").on("change", search);
});

//Función que permite que las columnas acepten cards
function dropTableFunction(ui, element) {
    var targetColumn = element.children('div:first');
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

    //Actualiza las estrellas y comentarios
    updateStarSelect();
    updateComments();

    // Abrir el modal
    $("#cardModal").modal("show");
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
