$(document).ready(function(){



    var apiBaseUrl = 'https://api.themoviedb.org/3'; //variabile dell'url di base della chiamata API

    $('input').val('');                             //pulisco l'input dal testo precedente
    $('button').click(function(){                    //al click sul bottone esegui funzione cercaFilm
        cercaFilm();
        cercaSerie();
        stars();
    });


    $('input').keypress(function(event){            //se schiacci enter parte la funzione cercaFilm
        if (event.keyCode == 13) {
            cercaFilm();
            cercaSerie();
            stars();
        };
    });

    $('.card').mouseover(function(){
        $('.movie-infos').css('visibility', 'visible');
        $('.series-infos').css('visibility', 'visible');
    });


    //funzione per trovare numero intero da 1 a 5;
    function votoInteger(vote) {
    var votoFilm = Math.ceil(vote / 2);
    return votoFilm;
    };

    //funzione per la ricerca di film;
    function cercaFilm() {
        var source = $('#scheda-template').html();              //variabili di handlebars
        var templateFilm = Handlebars.compile(source);          //variabili di handlebars
        var titoloInserito = $('input').val();
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
                $('.container-interno-film').empty();
                for (var i = 0; i < films.length; i++) {
                    var film = films[i];
                    var vote = votoInteger(film.vote_average);//utilizzo la funzione voteInteger per trovare intero da 1 a 5
                    var movieTemplate = {
                        movieCover: film.poster_path,
                        titolo: film.title,
                        titoloOriginale: film.original_title,
                        lingua: film.original_language,
                        voto: vote,
                        siglaStato: flagg(film.original_language),
                        stelle: stars(vote),
                    };

                    var schedaFilm = templateFilm(movieTemplate);
                    $('.container-interno-film').append(schedaFilm);
                };

            },
            error: function(err){
                alert('error, try again!')
            }
        });
    };

    //funzione per voto a stelle
    function stars (voto) {
        var star= '';
        for (var i = 1; i <= 5; i++) {
            if (i <= voto) {
                star += '<i class="fas fa-star"></i>';
            }else {
                star += '<i class="far fa-star"></i>';
            }
        }
        return star;
};
    //funzione bandierine
     function flagg(siglaStato) {         //le due 'g' sono un omaggio a Stephen King
          var bandiera = siglaStato;
          if (siglaStato == 'en') {
               bandiera = 'us';
          } else if (siglaStato == 'ja'){
              bandiera = 'jp';
          }
          return bandiera;
     };


    //funzione per la ricerca di serie tv
    function cercaSerie() {
        var source = $('#scheda-template-serie').html();        //variabili di handlebars
        var templateSerie = Handlebars.compile(source);         //variabili di handlebars
        var titoloInserito = $('input').val();
        $.ajax({
            url: apiBaseUrl + '/search/tv',
            data: {
                api_key: 'cbbcf8d31c832a4d583973d89a0f4bb4',
                query: titoloInserito,
                language: 'it-IT'
            },
            method: 'GET',
            success: function(data){
                var series = data.results;
                for (var i = 0; i < series.length; i++) {
                    var serie = series[i];
                    var vote = votoInteger(serie.vote_average);//utilizzo la funzione voteInteger per trovare intero da 1 a 5
                    var serieTemplate = {
                        movieCover: serie.poster_path,
                        titolo: serie.name,
                        titoloOriginale: serie.original_name,
                        lingua: serie.original_language,
                        voto: vote
                    };

                    var schedaSerie = templateSerie(serieTemplate);
                    $('.container-interno-film').append(schedaSerie);
                };

            },
            error: function(err){
                alert('error, try again!')
            }
        });
    };
});
