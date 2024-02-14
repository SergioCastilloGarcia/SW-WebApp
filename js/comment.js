$(document).ready(function () {
    $("#commentForm").submit(loginFormComment);
});

//Formulario para enviar un comentario
function loginFormComment(event) {
    event.preventDefault();

    const comment = $("#comment").val();

    var username = getCookie("username");
    console.log("Comentario de %s para el juego %s: %s", username, modalGameId, comment)
    // TODO llamar a API

    updateComments();
}
//Cambia los comentarios de un juego
function updateComments() {
    console.log("Consulta de comentarios de %s", modalGameId)
    comments = getComments();
    // Limpiar el contenido del div #comentarios
    $('#comentarios').empty();

    // Agregar caja de comentario para cada elemento en el array de comentarios
    comments.forEach(function (comentario) {
        var cajaComentario = $('<div class="comentario">');
        cajaComentario.append('<h4><strong>' + comentario.username + ':</strong> </h4>');
        cajaComentario.append('<p>' + comentario.comment + '</p>');
        cajaComentario.append('<span>' + comentario.date + '</span>');
        $('#comentarios').append(cajaComentario);
    });
}
//Obtiene todos los comentarios de un juego
function getComments() {
    return [
        { id: 1, username: "Ser", comment: "Vendo Opel Corsa", date: "24/01/2023" },
        { id: 2, username: "Diego", comment: "Vaya mierda", date: "04/07/2022" },
        { id: 3, username: "Dani", comment: "Que juegazo", date: "19/12/2023" },
    ];
}
