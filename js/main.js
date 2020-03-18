$(document).ready(function(){

    //variabili di handlebars
    var source = $('#scheda-template').html();
    var templateFilm = Handlebars.compile(source);

    $('button').click(function(){
        var titoloInserito = $('input').val();
        $.ajax({
            url: 'https://api.themoviedb.org/3/search/movie',
            data: {
                api_key: 'cbbcf8d31c832a4d583973d89a0f4bb4',
                query: titoloInserito,
                language: 'it-IT'
            },
            method: 'GET',
            success: function(data){
                var films = data.results;
                for (var i = 0; i < films.length; i++) {
                    var film = films[i];
                    var movieTemplate = {
                        titolo: film.title,
                        titoloOriginale: film.original_title,
                        lingua: film.original_language,
                        voto: film.vote_average
                    };
                    console.log(movieTemplate);
                    var schedaFilm = templateFilm(movieTemplate);
                    $('.container-interno').append(schedaFilm);
                };
            },
            error: function(err){
                alert('error, try again!')
            }
        });


    });

});
