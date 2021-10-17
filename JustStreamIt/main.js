const mainUrl = "http://localhost:8000/api/v1/titles/"

fetchBestMovie()
fetchCategories('')
fetchCategories('horror')
fetchCategories('history')
fetchCategories('romance')



// Carrousel controls

function moveCarrouselLeft(category) {

  var carrouselContent = document.querySelector("#" + category + "-movies");
  var carrouselLeftBtn = document.querySelector("#" + category + "-left");
  var carrouselRightBtn = document.querySelector("#" + category + "-right");
    
  carrouselContent.style.left = "-680px";
  carrouselRightBtn.classList.remove("show");
  carrouselLeftBtn.classList.add("show");
}

function moveCarrouselRight(category) {

  var carrouselContent = document.querySelector("#" + category + "-movies");
  var carrouselLeftBtn = document.querySelector("#" + category + "-left");
  var carrouselRightBtn = document.querySelector("#" + category + "-right");

  carrouselContent.style.left = "0px";
  carrouselRightBtn.classList.add("show");
  carrouselLeftBtn.classList.remove("show");
}



// Fetch data

function fetchBestMovie() {

	var bestTitle = document.getElementById('top-title');
	var bestImg = document.getElementsByClassName('best-cover')[0].getElementsByTagName("img")[0];

	fetch(mainUrl + "?sort_by=-imdb_score")
	.then(response => response.json())
	.then(data => {
    bestTitle.innerHTML = data["results"][0]["title"];
		bestImg.src = data["results"][0]["image_url"];
    bestImg.id = data["results"][0]["id"];

    var url = data["results"][0]["url"];
    fetchBestDescription(url)
	})
}

function fetchBestDescription(url) {

  var bestDesc = document.getElementsByClassName('best-desc')[0];

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

      if (category == '')
        dataAll.shift();   // for best-rated category, skip first movie

      for (i=0; i<7; i++) {
        var movieCover = dataAll[i]["image_url"];
        var movieTitle = dataAll[i]["title"];
        var movieId = dataAll[i]["id"];
        var currentMovieTitle = document.getElementById(category + (i+1).toString()).getElementsByTagName("p")[0];
        var currentMovieCover = document.getElementById(category + (i+1).toString()).getElementsByTagName("img")[0];
            
        currentMovieCover.src = movieCover;
        currentMovieCover.id = movieId;
        currentMovieTitle.innerHTML = movieTitle;
      }
    })
  })
}



// Modal control and fetch data

function openModal(category, num) {
  
  var modal = document.getElementById("modal");
  var span = document.getElementsByClassName("close")[0];

  var modalId = document.getElementById(category + num.toString()).getElementsByTagName("img")[0].id;

  fetchModalData(modalId)

  modal.style.display = "block";

  span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal)
      modal.style.display = "none";
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


    if (typeof data["rated"] === 'string' || data["rated"] instanceof String)
      document.getElementById('modal-rating').innerHTML = data["rated"];
    else
      document.getElementById('modal-rating').innerHTML = data["rated"] + "+";  // add "+" if age rating is a number

    var modalBoxOffice = document.getElementById('modal-box-office');
    if (data["worldwide_gross_income"] == null)
      modalBoxOffice.innerHTML = "N/A";  // placeholder for unspecified box-office   
    else 
      modalBoxOffice.innerHTML = data["worldwide_gross_income"] + " " + data["budget_currency"];

    var regExp = /[a-zA-Z]/g;
    if (regExp.test(data["long_description"]))
      document.getElementById('modal-desc').innerHTML = data["long_description"]; 
    else
      document.getElementById('modal-desc').innerHTML = "N/A";  // placeholder for missing description
    
	})
}