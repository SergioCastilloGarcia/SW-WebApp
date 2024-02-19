$(document).ready(function () {
    $("#loginForm").submit(loginFormSubmit);
});

// Verificar si el usuario está logueado
function isLogin() {
    const userId = getCookie("userId");
    if (!userId) {
        window.location.replace("login.html");
    }
    else {
        const username = getCookie("username");
        $("#bienvenido").text(username)
    }
}

//Devuelve la cookie requerida
function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

//Formulario de inicio de sesión personalziado
function loginFormSubmit(event) {
    event.preventDefault();

    var username = $("#username").val();
    const password = $("#password").val();
    username = (/\S+@\S+\.\S+/.test(username)) ? username : username + '@email.com';//agrego un email si es necesario

    // Simulación del proceso de inicio de sesión
    login(username, password);

}

// Método simulado de inicio de sesión
function login(email, password) {
    var datosLogin = {
        email: email,
        password: password
    };
    doPost(USERS, datosLogin,
        function (respuesta) {
            console.log('Usuario registrado con id: ' + respuesta.id);
            // Crear una cookie para almacenar el nombre de usuario
            document.cookie = `username=${respuesta.username};`;
            document.cookie = `userId=${respuesta.id};`;
            // Redirigir a la página principal
            window.location.replace("index.html");
        }, function (error) {
            alert("Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.");
        });
}
// Método para cerrar sesión
function logout() {
    // Crear una cookie para almacenar el nombre de usuario
    document.cookie = `username=;`;
    document.cookie = `userId=;`;

    // Redirigir a la página principal
    window.location.replace("login.html");
}
