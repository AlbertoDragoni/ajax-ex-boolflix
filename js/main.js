$(document).ready(function(){

    //variabili di handlebars
    var source = $('#scheda-template').html();
    var templateFilm = Handlebars.compile(source);

    $('button').click(cercaFilm);                   //al click sul bottone esegui funzione cercaFilm
    $('input').keypress(function(event){            //se schiacci enter parte la funzione cercaFilm
        if (event.keyCode == 13) {
            cercaFilm();
        };
    });

    //funzione per trovare numero intero da 1 a 5;
    function votoInteger(vote) {
    var votoFilm = Math.ceil(vote / 2);
    return votoFilm;
    };
    //funzione per la ricerca di film;
    function cercaFilm() {
        var titoloInserito = $('input').val();
        var apiBaseUrl = 'https://api.themoviedb.org/3';
        $.ajax({
            url: apiBaseUrl + '/search/movie',
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
                    console.log(film);
                    var vote = votoInteger(film.vote_average);//utilizzo la funzione voteInteger per trovare intero da 1 a 5
                    console.log(vote);
                    var movieTemplate = {
                        movieCover: film.poster_path,
                        titolo: film.title,
                        titoloOriginale: film.original_title,
                        lingua: film.original_language,
                        voto: vote
                    };
                    $('.stars').hide();
                    if (vote > 1 && vote <= 2)  {
                        $('.prima').show();
                    } else if (vote > 2 && vote <= 3) {
                        $('.prima, .seconda').show();
                    } else if (vote > 3 && vote <= 4) {
                        $('.prima, .seconda, .terza').show();
                    } else if (vote > 4 && vote <= 5) {
                        $('.stars').show();
                    };
                    var schedaFilm = templateFilm(movieTemplate);
                    $('.container-interno').append(schedaFilm);
                };

            },
            error: function(err){
                alert('error, try again!')
            }
        });
    };


});
