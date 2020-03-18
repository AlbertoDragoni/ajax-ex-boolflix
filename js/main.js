$(document).ready(function(){

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
                        console.log(film.title);
                        console.log(film.original_title);
                        console.log(film.language);
                        console.log(film.vote_average);
                };
            },
            error: function(err){
                alert('error, try again!')
            }
        });


    });

});
