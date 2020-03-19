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
                    var vote = votoInteger(film.vote_average);//utilizzo la funzione voteInteger per trovare intero da 1 a 5
                    console.log(vote);
                    var movieTemplate = {
                        titolo: film.title,
                        titoloOriginale: film.original_title,
                        lingua: film.original_language,
                        voto: vote
                    };
                    $('.stars').hide();
                    if (vote < 2) {
                        $('.prima').show();
                    } else if (vote < 3) {
                        $('.prima, .seconda').show();
                    } else if (vote < 4) {
                        $('.prima, .seconda, .terza').show();
                    } else if (vote < 5) {
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


    });
    //funzione per trovare numero intero da 1 a 5;
    function votoInteger(vote) {
    var votoFilm = Math.ceil(vote / 2);
    return votoFilm;
};


});
