function filter() {
    var searchTerm = $("#searchFilter").val();
    var category = $("#categoryFilter").val();

    $(".kanban-column  .card").each(function () {
        var cardId = $(this).attr("id");
        var titleText = $("#" + cardId + "_title").text();
        var categoryText = $("#" + cardId + "_category").text().split(';');

        var showCard = true;

        //Filtrado por texto
        if (searchTerm !== "" && !titleText.toLowerCase().includes(searchTerm.toLowerCase())) {
            showCard = false;
        }

        //Filtrado por categoria
        if (category !== "" && !categoryText.includes(category)) {
            showCard = false;
        }

        //Muestro u oculto
        if (showCard) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}
