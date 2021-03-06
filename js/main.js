$(document).ready(function(){



    var apiBaseUrl = 'https://api.themoviedb.org/3'; //variabile dell'url di base della chiamata API
    var imgBaseUrl = 'https://image.tmdb.org/t/p/';
    var imgSize = 'w342';



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

    //funzione per trovare numero intero da 1 a 5;
    function votoInteger(vote) {
    var votoFilm = Math.ceil(vote / 2);
    return votoFilm;
    };

    //funzione per locandina film
    function poster(path) {
        if (path !== null) {
            return imgBaseUrl + imgSize + path;
        } else {
            return 'https://i1.kym-cdn.com/entries/icons/facebook/000/019/277/travvy.JPG';
        }
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
                        movieCover: poster(film.poster_path),
                        titolo: film.title,
                        titoloOriginale: film.original_title,
                        genere: genere(film.genre_ids),
                        lingua: film.original_language,
                        trama: film.overview,
                        voto: vote,
                        siglaStato: flagg(film.original_language),
                        stelle: stars(vote),
                    };
                    console.log(movieTemplate.genere);
                    var schedaFilm = templateFilm(movieTemplate);
                    $('.container-interno-film').append(schedaFilm);
                };

            },
            error: function(err){
                alert('error, try again!')
            }
        });
    };

    //funzione per selezionare genere
    function genere (genre) {
        var genereFilm = genre;
        var nomeGenere = '';
        for (var i = 0; i < genre.length; i++) {
            switch(genereFilm[i]) {
                case 28:
                    nomeGenere = 'azione';
                break;
                case 12:
                    nomeGenere = 'avventura';
                break;
                case 16:
                    nomeGenere = 'animazione';
                break;
                case 35:
                    nomeGenere = 'commedia';
                break;
                case 80:
                    nomeGenere = 'crime';
                break;
                case 18:
                    nomeGenere = 'drammatico';
                break;
                case 53:
                    nomeGenere = 'thriller';
                break;
                case 10752:
                    nomeGenere = 'guerra';
                break;
                case 27:
                    nomeGenere = 'horror';
                break;
                case 878:
                    nomeGenere = 'fantascienza';
                break;
                case 37:
                    nomeGenere = 'western';
                break;
                default:
                    nomeGenere = 'non definito';
                break;
            };
        };
        return nomeGenere;
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
                        movieCover: poster(serie.poster_path),
                        titolo: serie.name,
                        titoloOriginale: serie.original_name,
                        lingua: serie.original_language,
                        trama: serie.overview,
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
