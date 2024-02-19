$(document).ready(function () {
    $("#commentForm").submit(loginFormComment);
});

//Formulario para enviar un comentario
function loginFormComment(event) {
    event.preventDefault();
    var data = {
        userId: getCookie("userId"),
        comment: $("#comment").val(),
        gameId: modalGameId
    }
    doPost(COMMENTS, data, function (respuesta) {
        updateComments();
    }, function (error) {
        alert("No se ha podido comentar: " + error);
    });

}
//Cambia los comentarios de un juego
function updateComments() {
    comments = getComments();

    getComments().then(function (comments) {
        // Limpiar el contenido del div #comentarios
        $('#comentarios').empty();

        // Agregar caja de comentario para cada elemento en el array de comentarios
        comments.forEach(function (comentario) {
            var cajaComentario = $('<div class="comentario">');
            //cajaComentario.append('<h4><strong>' + comentario.username + ':</strong> </h4>');
            cajaComentario.append('<p>' + comentario.comment + '</p>');
            cajaComentario.append('<span>' + formatDate(comentario.lastUpdated) + '</span>');
            $('#comentarios').append(cajaComentario);
        });
    });

}
//Obtiene los comentarios de un juego
function getComments() {
    var data = {
        userId: modalGameId
    }
    return new Promise(function (resolve, reject) {
        doGet(COMMENTS, data, function (respuesta) {
            resolve(respuesta);
        }, function (error) {
            resolve(undefined);
        });
    });
}

//Formatea la fecha
function formatDate(fechaString) {
    var fecha = new Date(fechaString);

    var dia = fecha.getDate();
    var mes = fecha.getMonth() + 1; // El mes comienza desde 0, por lo que se suma 1
    var año = fecha.getFullYear();

    // Asegurarse de que los valores de día y mes tengan dos dígitos
    if (dia < 10) {
        dia = '0' + dia;
    }
    if (mes < 10) {
        mes = '0' + mes;
    }

    var fechaFormateada = dia + '/' + mes + '/' + año;
    return fechaFormateada;
}
