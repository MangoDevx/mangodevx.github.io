var url = `https://www.omdbapi.com/?apikey=f4ef9281&t=The Karate Kid`;
var poster = document.getElementById('poster');
var title = document.getElementById('title');
var movieBody = document.getElementById('movieBody');

async function init() {
    var data = await fetch(url);
    var response = await data.json();
    var plot = response.Plot;
    var release = response.Released;
    var rated = response.Rated;
    var length = response.Runtime;
    var director = response.Director;
    var famousActors = response.Actors;
    var awards = response.Awards;

    poster.src = response.Poster;
    title.innerHTML = response.Title;
    movieBody.innerHTML += response.Title + " is a movie that is about: " + plot + '<br><br>';

    movieBody.innerHTML += 'Rated: ' + rated + '<br>';
    movieBody.innerHTML += 'Length: ' + length + '<br>';
    movieBody.innerHTML += 'Released on: ' + release + '<br>';
    movieBody.innerHTML += 'Director: ' + director + '<br>';
    movieBody.innerHTML += 'Famous Actors: ' + famousActors + '<br>';
    movieBody.innerHTML += 'Awards: ' + awards + '<br>';


    document.body.classList.remove('d-none');

}