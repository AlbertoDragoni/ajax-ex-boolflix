$(document).ready(function(){
    $.ajax({
        url: 'https://api.themoviedb.org/3/search/movie',
        data: {
            api_key: 'cbbcf8d31c832a4d583973d89a0f4bb4',
            query: 'ritorno al futuro'
        },
        method: 'GET',
        success: function(data){
            console.log(data);
            var films = data.results;
            for (var i = 0; i < films.length; i++) {
                var film = films[i];
                console.log(film.title);
            }
        },
        error: function(err){
            alert('error, try again!')
        }





    });


});
