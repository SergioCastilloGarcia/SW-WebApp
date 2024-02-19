$(document).ready(function () {
    $('.rating input').change(function () {
        changeStarSelect($(this));
    });
});

//Cambia el valor de la estrella seleccionada
function changeStarSelect(starSelect) {
    //TODO llamar a api
    var value = starSelect.val()
    var userId = getCookie("userId");
    console.log("Valoracion de %s cambiada por %s a %s", modalGameId, userId, value)
}
//Obtiene la valoracion de un juego y actualiza la estrella
function updateStarSelect() {
    var value = getStarSelect();
    $("#star" + value).prop('checked', true)

    var media = getStarMedia();
    $("#starMedia").text(media);
}

//Obtiene la valoracion de un usuario sobre un juego
function getStarSelect() {
    var userId = getCookie("userId");
    console.log("Consulta de valoracion de %s por %s", modalGameId, userId)
    //TODO llamar a api
    return 2;
}


//Obtiene la valoracion general de un juego
function getStarMedia() {
    var starMedia = $("#" + modalGameId + "_starMedia").text()
    return starMedia;
}

