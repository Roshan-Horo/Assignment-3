$(document).ready( () => {
    $('#search-form').on('submit', (e) => {
        let searchText = $('#search-box').val();
        getMovies(searchText)
        e.preventDefault();
    })
})

function getMovies(searchText){
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=e7dee8ca871a2295748ace0052eccab1&query=`+ searchText)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            let movies = data.results
            let output = ''
            let image_url = "https://image.tmdb.org/t/p/w500/"

            $.each(movies, (index, movie) => {
                output += `
                <div class="card">
                <img src="${image_url}${movie.poster_path}" alt="mypic" class="card_img" />
                     <div class="card_info">
                     <span class="card_category"><i class="fas fa-star"></i> ${movie.vote_average}</span>
                       <h3 class="card_title">${movie.title}</h3>
                       
                        <button id="details" onclick="selectedMovie(${movie.id})">Details</button>
                       
                     </div>
                
              </div>
                `;
            })

            $('#container').html(output);
        })
        .catch(err => console.log(err))
}

$('#details').on('click', () => {
    selectedMovie(movie.id)
    getMovie()
})

function selectedMovie(id){
    sessionStorage.setItem('movieId',id);
    window.location = 'movie.html';
    return false;
}

function getMovie(){
    let movieId = sessionStorage.getItem('movieId');

    fetch(`http://api.themoviedb.org/3/movie/${movieId}?api_key=e7dee8ca871a2295748ace0052eccab1`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            let movie = data
            let output = ''
            let img = "https://image.tmdb.org/t/p/w500/"

            output += `<div class="movie-info">
            <h2>${movie.title}</h2>
            <div><img src="${img}${movie.poster_path}" /></div>
            <div class="movie-desc">
               <p>${movie.overview}<p>
              <ul class="list-group">
                
                <li class="list-group-item"><strong>Released on : </strong> ${movie.release_date}</li>
                <li class="list-group-item"><strong>Popularity: </strong> ${movie.popularity}</li>
                <li class="list-group-item"><strong>Rating : </strong> ${movie.vote_average}</li>
              </ul>
            </div>
          </div>`

          $('#movie').html(output)
        })
        .catch(err => console.log(err))
}

getMovie()

function Movies(){
    fetch(`http://api.themoviedb.org/3/discover/movie?&api_key=e7dee8ca871a2295748ace0052eccab1`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            let movies = data.results
            let output = ''
            let image_url = "https://image.tmdb.org/t/p/w500/"

            $.each(movies, (index, movie) => {
                output += `
                <div class="card">
                <img src="${image_url}${movie.poster_path}" alt="mypic" class="card_img" />
                     <div class="card_info">
                     <span class="card_category"><i class="fas fa-star"></i> ${movie.vote_average}</span>
                       <h3 class="card_title">${movie.title}</h3>
                       <a href="movie.html" target="_blank">
                        <button id="details" onclick="selectedMovie(${movie.id})">Details</button>
                       </a>
                     </div>
                
              </div>
                `;
            })

            $('#container-2').html(output);
        })
        .catch(err => console.log(err))
}

Movies()

