const API_URL = "http://156.35.98.165:8080/GoodGamesWSApp-1.1.0/api/v1/"
const VALORATIONS = "valorations"
const USERS = "users"
const GAMES = "games"
const RAWG_GAMES = "rawg/games"
const RAWG_CATEGORIES = "rawg/categories"


/**
 * Función para hacer gets
 * @param {*} endpoint requiere de una constante definida al ininio de este archivo
 * @param {*} datos  requiere un objeto json con los datos a enviar
 * @param {*} successCallback función que se ejecuta si la llamada es correcta
 * @param {*} errorCallback función que se ejecuta si hay un error
 */
function doGet(endpoint, datos, successCallback, errorCallback) {
    // Configurar objeto de opciones para la solicitud AJAX
    var opciones = {
        type: "GET",
        url: API_URL + endpoint,
        success: successCallback,
        error: errorCallback
    };
    opciones.url += '?' + $.param(datos);


    // Realizar la solicitud AJAX
    $.ajax(opciones);
}
/**
 * Función para hacer posts
 * @param {*} endpoint requiere de una constante definida al ininio de este archivo
 * @param {*} datos  requiere un objeto json con los datos a enviar
 * @param {*} successCallback función que se ejecuta si la llamada es correcta
 * @param {*} errorCallback función que se ejecuta si hay un error
 */
function doPost(endpoint, datos, successCallback, errorCallback) {
    // Configurar objeto de opciones para la solicitud AJAX
    var opciones = {
        type: "POST",
        url: API_URL + endpoint,
        success: successCallback,
        error: errorCallback
    };
    opciones.data = JSON.stringify(datos);
    opciones.contentType = 'application/json';


    // Realizar la solicitud AJAX
    $.ajax(opciones);
}