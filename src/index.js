//**************CONST DECLARATIONS************* */
const localUrl = 'http://localhost:3000/masterpieces'
// const rijksUrl = `https://www.rijksmuseum.nl/api/nl/collection?key=${apiKey}&${category}=${query}`
// const metUrl = `https://collectionapi.metmuseum.org/public/collection/v1/objects?${query}`
const imageContainer = document.querySelector('#image-container')
const focusImage = document.querySelector('#focus-image')
const detailsImage = document.querySelector('#image-details')
const detailsTitle = document.querySelector('#image-title')
const detailsArtist = document.querySelector('#artist-name')
const detailsYear = document.querySelector('#art-year')
//const newImageForm = document.querySelector('#new-image-form')
// let imageCounter =0;  //used to make columns and rows

//****************END CONST DECLARATIONS************ */


//*********TO DO LIST****** */
//View different pieces (GET) LOCAL URL
        //render the different pieces individually
        //be able to click one to see its details 

// Create a “favorite art list/your own collection” -  this would be done on local and then pieces would be selected from the public external API (POST)
        //requires a favorite button that triggers an event which POSTS to the local db

// Remove a piece from their screen (DELETE)
        //requires a delete button and eventlistener for that delete button
        
// Change the rating of pieces in our own collection (PATCH)
        //probably requires a little up/down arrow on the painting with a number attached to it

//extras
        //on hover event listener
        //css styling to make a grid









//************FETCH REQUESTS**************** */
function getRijks(category,query){
    fetch(`https://www.rijksmuseum.nl/api/nl/collection?key=${apiKey}&${category}=${query}`)
    .then((resp) => resp.json())
    .catch((error) => console.log(error.message))
}

function getMet(parameter){
    fetch(``)
    .then((resp) => resp.json())
    .catch((error) => console.log(error.message))
}

function getLocal(id){
    return fetch(`${localUrl}/${id}`)
    .then((resp) => resp.json())
    .catch((error) => console.log(error.message))
}

function postLocal(url,data){
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
      .then(res => console.log(res));
    }
//************END FETCH REQUESTS***************** */




//***********RENDER FUNCTIONS********* */
function renderImage(image){
    let newImageDiv = document.createElement('div')
     //if (imageCounter % 2 == 0 ){newImageDiv.classList.add("column")}
    let newImage = document.createElement('img')
    newImage.src = image.image_url
    newImage.setAttribute("id", image.id)
    addDeleteButton(newImageDiv)
    addDetailsClick(newImage)
    newImageDiv.append(newImage)
    imageContainer.append(newImageDiv)
    // imageCounter++; //used to make columns/rows
}

function showDetails(id){
    getLocal(id)
    .then(response => {focusImage.src = response.image_url
                        detailsTitle.textContent = `Title: ${response.title}`
                        detailsArtist.textContent = `Artist: ${response.artistName}`
                        detailsYear.textContent = `Year: ${response.year}`
    })
}



//***********END RENDER FUNCTIONS******** */


//***********GENERAL FUNCTION DECLARATION**** */
function populate(){
    fetch(localUrl)
    .then(response => response.json())
    .then(response => response.forEach(renderImage))
}

//**********END GENERAL FUNCTION DECLARATION****** */

//Artwork ratings PATCH request



//***********DELETE ARTWORK******** */
function addDeleteButton (someImage){       

//create a delete button
const deleteButton = document.createElement("button")  
//set the text to "Delete"
deleteButton.innerHTML = "Delete"
//append the delete button to each image (via iteration within the renderImage function)
someImage.append(deleteButton)
//add an event listener to the delete button
  //deletes the associated image on click
deleteButton.addEventListener('click', (e) =>{
  e.preventDefault()
  fetch('INSERT URL HERE', {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
       },
    })
  .then(res => res.json())
  })
}
//***********END DELETE ARTWORK******** */


function addDetailsClick(someImage){
    someImage.addEventListener('click' , (event) => {
        console.log(event.target.id)
        showDetails(event.target.id)
    })
}

//*************EVENT LISTENERS******* */



//************END EVENT LISTENERS******* */

//**************function invokation*** */
populate()