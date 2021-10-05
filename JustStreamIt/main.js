(function (){

  var carrouselContent = document.querySelector('#carrouselContent');
  var carrouselLeftBtn = document.querySelector('#carrouselLeftBtn');
  var carrouselRightBtn = document.querySelector('#carrouselRightBtn');

  var carrouselLeftValue = 0;
  var widthToMove = 360;
  var arrowBtnWidth = 40;
  var noOfSlides = 4;
  var currentSlide = 1;


  carrouselLeftBtn.addEventListener('click', moveCarrouselRight);
  carrouselRightBtn.addEventListener('click', moveCarrouselLeft);


  manageButtons();

  function moveCarrouselLeft(){

      if(currentSlide == 2) carrouselLeftValue -= widthToMove - arrowBtnWidth;
      else carrouselLeftValue -= widthToMove;

      currentSlide++;
      manageButtons();
      carrouselContent.style.left = `${carrouselLeftValue}px`;

  }

  function moveCarrouselRight(){

      if(currentSlide == 2) carrouselLeftValue = 8;
      else carrouselLeftValue += widthToMove;

      currentSlide--;
      manageButtons();
      carrouselContent.style.left = `${carrouselLeftValue}px`;

  }

  function manageButtons(){

      if(currentSlide == noOfSlides - 1)
      carrouselRightBtn.classList.remove("show");
      else
          carrouselRightBtn.classList.add("show");

      if(currentSlide == 1)
      carrouselLeftBtn.classList.remove("show");
      else
          carrouselLeftBtn.classList.add("show");

  }

})();



var modal = document.getElementById("modal");
var btn = document.getElementById("btn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function() {
  modal.style.display = "block";
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
