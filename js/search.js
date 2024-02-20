// Función debuscar juegos
function search() {
    var searchResults = $("#searchResults");
    searchResults.empty();
    getResultList();
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

//Obtiene los juegos de la api
function getResultList() {

    var data = {
        gameName: $("#search").val(),

    }
    var category = $("#category").val().toLowerCase();
    if (category != undefined && category !== "") {
        data.category = category;
    }
    doGet(RAWG_GAMES, data,
        function (respuesta) {
            respuesta.results.forEach(function (game) {
                getGame(game)
            });
        }, function (error) {
        });
}
//Obtiene los juegos de un jugador
function getGames() {
    var data = {
        userId: getCookie("userId")
    }
    doGet(GAMES, data,
        function (respuesta) {
            respuesta.forEach(function (game) {
                getGame(game)
            });
        }, function (error) {
            console.log("No se han podido conseguir los juegos: " + error);
        });
}

//Obtiene un juego
function getGame(game) {
    var id = game.gameId;//A veces nos viene este gameId, cuando hay relacion entre el usuario y el juego
    if (id == undefined) {
        id = game.id
    }
    //El juego que devuelve la api no sirve, hay que completar algun dato (falta la imagen)
    doGet(RAWG_GAMES + "/" + id, undefined,
        function (apiGame) {
            apiGame.status = game.status
            getGameLong(apiGame)
        }, function (error) {
            getGameLong(game)
            console.log("No se han podido conseguir los datos del juego: " + id);
        });
}
//Obtiene la duracion de un juego
function getGameLong(game) {
    data = {
        name: game.name
    }
    //El juego que devuelve la api no sirve, hay que completar algun dato (falta la imagen)
    doGet(HLTB, data,
        function (apiGame) {
            console.log(apiGame)
            game.gameplayMain = apiGame.gameplayMain
            game.background_image = apiGame.imageUrl
            agregarCards([game])
        }, function (error) {
            agregarCards([game])
            console.log("No se han podido conseguir los datos del juego: " + game.id);
        });
}
//Obtiene las categorias de la api y los añade
function getCategories() {
    doGet(RAWG_CATEGORIES, undefined,
        function (respuesta) {
            agregarCategorias(respuesta.results);
        }, function (error) {
            alert("No se han podido conseguir las categorias: " + error);
        });
}
//Añade las categorias
function agregarCategorias(categories) {

    var select = $("#category");
    var filterSelect = $("#categoryFilter");

    // Iteramos sobre la lista
    $.each(categories, function (index, category) {
        // Creamos un elemento option con el valor y el texto correspondientes
        var option = $("<option>").attr("value", category.name).text(category.name);

        // Agregamos el elemento option al select de busqueda y filtrado
        select.append(option);
        filterSelect.append(option.clone());
    });

}
//Agrega las cards
function agregarCards(games) {
    games.forEach(function (game) {
        if (!isGameAdded(game.id)) {//evitamos duplciados
            const item = $(`<div class="card" id="${game.id}">
                        <img src="${game.background_image}" />
                        <div class="d-none">
                            <p id="${game.id}_title">${game.name}</p>
                            <p id="${game.id}_category">${game.genres?.map(g => g.name).join(';')}</p>
                            <div id="${game.id}_description">${game.description}</div>
                            <p id="${game.id}_gameplayMain">${game.gameplayMain}</p>
                        </div>
                        
                    </div>`);

            addDraggable(item);
            item.click(clickCard);

            //lo añade a la columa con el status necesario, por defecto en el buscador
            const elementoDestino = $("#" + (game.status ? game.status : "searchResults"));
            if (elementoDestino.length > 0) {
                elementoDestino.append(item);

                updateColumnCount(elementoDestino.attr("id"));
            } else {
                console.error(`No se encontró el elemento destino para el estado ${game.status ? game.status : "searchResults"}`);
            }
        }
    });
}