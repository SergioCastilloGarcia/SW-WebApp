$(document).ready(function () {
    isLogin();
    $(".card").draggable({
        revert: "invalid",
        helper: "clone",
        start: function (event, ui) {
            startFunction$(this);
        },
        stop: function (event, ui) {
            stopFunction($(this));;
        }
    });
    $(".card").click(clickCard);

    $(".column").droppable({
        accept: ".card",
        drop: function (event, ui) {
            dropTableFunction(ui, $(this))
        }
    });

    //Añadimos la funcionalidad del buscador
    $("#search").on("input", search);
});

//Función que permite que las cards se muevan
function dropTableFunction(ui, element) {
    var targetColumn = element;
    var draggedCard = ui.draggable;

    // Comprobamos si la tarjeta está siendo movida entre columnas y no está ya en la columna de destino
    if (draggedCard.parent().attr('id') !== targetColumn.attr('id') && !targetColumn.find('#' + draggedCard.attr('id')).length) {
        draggedCard.detach().appendTo(targetColumn);
    }

}
// Función start de un elemento
function startFunction(element) {
    console.log("start");
    element.css('opacity', '0.5'); // Reducir la opacidad al comenzar el arrastre
}
// Función stop de un elemento
function stopFunction(element) {
    console.log("stop");
    element.css('opacity', '1'); // Restaurar la opacidad cuando se suelta la tarjeta
    var parent = element.parent();

    // Comprobamos si la tarjeta se movió fuera del tablero kanban
    if (!parent.hasClass('column')) {
        element.remove(); // Si se movió fuera del kanban, eliminar la tarjeta
    }
}

function clickCard() {
    console.log("click")
    // Obtener el texto de la tarjeta clickeada
    var cardText = $(this).text();
    // Cambiar el título del modal por el texto de la tarjeta
    $("#exampleModalLabel").text(cardText);
    // Abrir el modal
    $("#cardModal").modal("show");
}
// Simular resultados de búsqueda
function search() {
    var searchTerm = $(this).val().toLowerCase();
    var $searchResults = $("#searchResults");
    $searchResults.empty();

    // Simulamos búsqueda, aquí debes incluir tu lógica de búsqueda real
    var results = ["Tarea 1", "Tarea 2", "Tarea 3", "Tarea 4"];

    results.forEach(function (result, i) {
        if (result.toLowerCase().includes(searchTerm) && !isGameAdded(i)) {
            var resultItem = $("<div class='card' id=" + i + ">" + result + "</div>");
            resultItem.draggable({
                revert: "invalid",
                helper: "clone",
                start: function (event, ui) {
                    startFunction($(this));
                },
                stop: function (event, ui) {
                    stopFunction($(this));
                }
            });
            resultItem.click(clickCard);
            $searchResults.append(resultItem);
        }
    });
}

//Devuelve si el elemento esta ya añadido
function isGameAdded(id) {
    console.log(id)
    var isIdUnique = true;
    $(".column").each(function () {
        if ($(this).find("#" + id).length) {
            isIdUnique = false;
            return false; // Salir del bucle each si se encuentra la ID en alguna columna
        }
    });
    return !isIdUnique;
}
