const menuButton = document.querySelector(".menu-button");
const menuItems = document.querySelectorAll(".gone");

function toggleMenu() {
    menuItems.forEach(item => {
        item.classList.toggle("hide");
});
    
}

function viewerTemplate(pic, alt) {
    return `<div class="viewer">
      <button class="close-viewer">X</button>
      <img src="${pic}" alt="${alt}">
      </div>`;
  }

  function viewHandler(event) {
	// Create a variable to hold the element that was clicked on
    const clickedElement = event.target;

    // Get the src attribute from the clicked element and split it on the "-"
    const srcParts = clickedElement.src.split('-');
  
    // Construct the new image file name by adding "-full.jpeg" to the first part of the array
    const fullImageSrc = `${srcParts[0]}-full.jpeg`;
  
    // Insert the viewerTemplate into the top of the body element
    document.body.insertAdjacentHTML("afterbegin", viewerTemplate(fullImageSrc, clickedElement.alt));
  
    // Add a listener to the close button that calls the closeViewer function when clicked
    document.querySelector('.close-viewer').addEventListener('click', closeViewer);
  }
  
  // Function to close the viewer
  function closeViewer() {
    document.querySelector('.viewer').remove();
  }
  
  // Add event listeners to the images in the gallery
  document.querySelectorAll('.gallery img').forEach(img => {
    img.addEventListener('click', viewHandler);
  });

menuButton.addEventListener("click", toggleMenu);