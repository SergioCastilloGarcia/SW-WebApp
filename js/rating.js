$(document).ready(function () {
    $('.rating input').change(function () {
        changeStarSelect($(this));
    });
});

//Cambia el valor de la estrella seleccionada
function changeStarSelect(starSelect) {
    data = {
        userId: getCookie("userId"),
        gameId: modalGameId,
        mark: starSelect.val()

    }
    doPost(VALORATIONS, data, function (respuesta) {
        updateStarSelect();
    }, function (error) {
        alert("No se ha podido actualizar la valoracion");
    });
}
//Obtiene la valoracion de un juego y actualiza la estrella
function updateStarSelect() {
    getStarSelect().then(function (value) {
        if (value < 0) {//Deseleccionamos todos
            $('[id^="star"]').each(function () {
                $(this).prop('checked', false)
            });
        }
        $("#star" + value).prop('checked', true)
    });

    getStarMedia().then(function (value) {
        if (isNaN(value)) {
            value = 0;
        }
        $("#starMedia").text(value)
    });

}

//Obtiene la valoracion de un usuario sobre un juego
function getStarSelect() {
    var data = {
        userId: getCookie("userId"),
        gameId: modalGameId
    }

    return new Promise(function (resolve, reject) {
        doGet(VALORATIONS, data,
            function (respuesta) {
                resolve(respuesta.valoration);
            }, function (error) {
                resolve(0)
            });
    });
}


//Obtiene la valoracion general de un juego
function getStarMedia() {
    return new Promise(function (resolve, reject) {
        doGet(VALORATIONS_MEDIA + modalGameId, undefined,
            function (respuesta) {
                resolve(respuesta);
            }, function (error) {
                resolve(0)
            });
    });
}

