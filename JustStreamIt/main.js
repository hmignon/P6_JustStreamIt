let mainUrl = "http://localhost:8000/api/v1/titles/"

fetchBestMovie()
fetchCategories('')
fetchCategories('horror')
fetchCategories('fantasy')
fetchCategories('action')



// Carrousel controls

var carrouselLeftValue = 0;
var widthToMove = 380;
var arrowBtnWidth = 40;
var noOfSlides = 4;
var currentSlide = 1;


function moveCarrouselLeft(category){

    var carrouselContent = document.querySelector("#" + category + "-movies");

    if(currentSlide == 2) 
      carrouselLeftValue -= widthToMove - arrowBtnWidth;
    else 
      carrouselLeftValue -= widthToMove;
    
    currentSlide++;
    manageButtons(category);
    carrouselContent.style.left = `${carrouselLeftValue}px`;

}

function moveCarrouselRight(category){

    var carrouselContent = document.querySelector("#" + category + "-movies");

    if(currentSlide == 2) 
      carrouselLeftValue = 8;
    else 
      carrouselLeftValue += widthToMove;

    currentSlide--;
    manageButtons(category);
    carrouselContent.style.left = `${carrouselLeftValue}px`;

}

function manageButtons(category){

    let carrouselLeftBtn = document.querySelector("#" + category + "-left");
    let carrouselRightBtn = document.querySelector("#" + category + "-right");

    if(currentSlide == noOfSlides - 1)
      carrouselRightBtn.classList.remove("show");
    else
        carrouselRightBtn.classList.add("show");

    if(currentSlide == 1)
      carrouselLeftBtn.classList.remove("show");
    else
        carrouselLeftBtn.classList.add("show");

}




// Fetch data

function fetchBestMovie() {

	let bestTitle = document.getElementById('top-title');
	let bestImg = document.getElementById('top-cover0');

	fetch(mainUrl + "?sort_by=-imdb_score")
	.then(response => response.json())
	.then(data => {
    bestTitle.innerHTML = data["results"][0]["title"];
		bestImg.src = data["results"][0]["image_url"];
    bestImg.alt = data["results"][0]["id"];

    var url = data["results"][0]["url"];
    fetchBestDescription(url)

	})
}

function fetchBestDescription(url) {

  var bestDesc = document.getElementById('top-desc');

  fetch(url)
	.then(response => response.json())
	.then(data => {
    bestDesc.innerHTML = data["description"];

	})
}

function fetchCategories(category) {

  var urlPage1 = mainUrl + "?sort_by=-imdb_score&genre=" + category;
  var urlPage2 = mainUrl + "?sort_by=-imdb_score&genre=" + category + "&page=2";

  fetch(urlPage1)
  .then(response => response.json())
  .then(data => {
    var dataPage1 = data["results"];

    fetch(urlPage2)
    .then(response => response.json())
    .then(data => {
      var dataPage2 = data["results"];
      var dataAll = dataPage1.concat(dataPage2);

      for (i=0; i<7; i++) {
        var movieCover = dataAll[i]["image_url"];
        var movieTitle = dataAll[i]["title"];
        var movieId = dataAll[i]["id"];
        var currentMovieTitle = document.getElementById(category + (i+1).toString()).getElementsByTagName("p")[0];
        var currentMovieCover = document.getElementById(category + "-cover" + (i+1).toString());
            
        currentMovieCover.src = movieCover;
        currentMovieCover.alt = movieId;
        currentMovieTitle.innerHTML = movieTitle;

      }
    })
  })
}



// Modal control and fetch data

function openModal(category, num) {
  
  var modal = document.getElementById("modal");
  var span = document.getElementsByClassName("close")[0];

  var id = document.getElementById(category + '-cover' + num.toString()).alt;

  fetchModalData(id)

  modal.style.display = "block";

  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

function fetchModalData(id) {

	fetch(mainUrl + id)
	.then(response => response.json())
	.then(data => {

    document.getElementById('modal-cover').src = data["image_url"];
		document.getElementById('modal-title').innerHTML = data["title"];

    document.getElementById('modal-year').innerHTML = data["year"];
    document.getElementById('modal-duration').innerHTML = data["duration"] + " min";
    document.getElementById('modal-genres').innerHTML = data["genres"];
    document.getElementById('modal-imdb').innerHTML = data["imdb_score"] + " / 10";

    document.getElementById('modal-directors').innerHTML = data["directors"];
    document.getElementById('modal-cast').innerHTML = data["actors"] + "...";
    document.getElementById('modal-country').innerHTML = data["countries"];
    document.getElementById('modal-desc').innerHTML = data["long_description"];


    if (typeof data["rated"] === 'string' || data["rated"] instanceof String)
      document.getElementById('modal-rating').innerHTML = data["rated"];
    else
      document.getElementById('modal-rating').innerHTML = data["rated"] + "+";

    if(data["worldwide_gross_income"] == null)
      document.getElementById('modal-box-office').innerHTML = "N/A";
    else
      document.getElementById('modal-box-office').innerHTML = data["worldwide_gross_income"] + " " + data["budget_currency"];
	})
}