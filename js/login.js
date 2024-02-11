//Controla que el usuario haya iniciado sesion
$(document).ready(function () {
    $("#loginForm").submit(loginFormSubmit);
});

// Verificar si el usuario está logueado
function isLogin() {
    const username = getCookie("username");
    if (!username) {
        window.location.replace("login.html");
    }
    else {
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

    const username = $("#username").val();
    const password = $("#password").val();

    // Simulación del proceso de inicio de sesión
    const loggedInUser = login(username, password);

    if (loggedInUser) {
        // Crear una cookie para almacenar el nombre de usuario
        document.cookie = `username=${username};`;

        // Redirigir a la página principal
        window.location.replace("index.html");
    } else {
        alert("Usuario o contraseña incorrectos. Por favor, inténtelo de nuevo.");
    }
}

// Método simulado de inicio de sesión
function login(username, password) {
    // Aquí deberías hacer la autenticación con el backend
    return true;
    // Supongamos que el usuario "admin" con contraseña "password" es válido
    if (username === "admin" && password === "password") {
        return username;
    } else {
        return null;
    }
}
// Método para cerrar sesión
function logout() {
    // Crear una cookie para almacenar el nombre de usuario
    document.cookie = `username=;`;

    // Redirigir a la página principal
    window.location.replace("login.html");
}
