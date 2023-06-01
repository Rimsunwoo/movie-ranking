let container = document.querySelector(".grid-container");
let searchBtn = document.querySelector(".searchBtn");
let modeBtn = document.querySelector(".modeBtn");

searchBtn.addEventListener("click", searchMovie);

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNWMyODE5MTJlMDUxNjI1MzhjZjU4ZDE0ZmIyN2YwNSIsInN1YiI6IjY0NzE5NmZmZGQ3MzFiMDBkZGYwM2NmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LDAWT-o6qsyDDiM5x-Ek5-7ivl5Yje1cfIIVgdK6y2A",
  },
};

const url =
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

let fetchMovie = async () => {
  const response = await fetch(url, options);
  const movieData = await response.json();
  return movieData.results;
};

// html 생성
let makeCard = async () => {
  const movieData = await fetchMovie();
  movieData.map((movie) => {
    let tempHtml = `<div class="movie-card" onClick="clickCard(${movie.id})">
    <img
      id="movieImg"
      src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
      alt="title"
    />
    <h5 id="movieTitle">${movie.title}</h5>
    <p id="movieReview">
     ${movie.overview}
    </p>
    <p id="movieRate">Rating: ${movie.vote_average}</p>
  </div>`;
    container.insertAdjacentHTML("beforeend", tempHtml);
  });
};

makeCard();

//클릭 이벤트

function clickCard(id) {
  window.alert(id);
}

//검색

function searchMovie(e) {
  e.preventDefault();
  let searchValue = document.querySelector(".inputSearch").value.toLowerCase();
  let movies = document.querySelectorAll(".movie-card");
  movies.forEach((movie) => {
    if (!movie.querySelector("#movieTitle").innerHTML.includes(searchValue)) {
      movie.style.display = "none";
    } else {
      movie.style.display = "flex";
    }
  });
}

//다크모드

modeBtn.addEventListener("click", modeChange);

function modeChange() {
  let movieCard = document.querySelectorAll(".movie-card");
  if (modeBtn.classList.contains("dark")) {
    modeBtn.innerHTML = "다크모드";
    document.body.style.backgroundColor = "white";
    movieCard.forEach((a) => (a.style.border = "1px solid black"));
    modeBtn.style.backgroundColor = "white";
    modeBtn.style.color = "black";
  } else {
    document.body.style.backgroundColor = "black";
    movieCard.forEach((a) => (a.style.border = "1px solid white"));
    modeBtn.innerHTML = "라이트모드";
    modeBtn.style.backgroundColor = "black";
    modeBtn.style.color = "white";
  }
  modeBtn.classList.toggle("dark");
}
