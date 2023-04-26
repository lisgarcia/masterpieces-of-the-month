//**************CONST DECLARATIONS************* */
const localUrl = 'http://localhost:3000/masterpieces'
// const rijksUrl = `https://www.rijksmuseum.nl/api/nl/collection?key=${apiKey}&${category}=${query}`
// const metUrl = `https://collectionapi.metmuseum.org/public/collection/v1/objects?${query}`
const imageContainer = document.querySelector('#image-container')
const focusImage = document.querySelector('.focus-image')
const details = document.querySelector('#image-details')
const detailsTitle = document.querySelector('#image-title-content')
const detailsArtist = document.querySelector('#artist-name-content')
const detailsYear = document.querySelector('#art-year-content')
const favoriteBtn = document.querySelector('#favoriteBtn')
const removeFavBtn = document.querySelector('#removeFavBtn')
let favoriteCount = 0;
let birthMonth;
let objectUrl;
//const newImageForm = document.querySelector('#new-image-form')
// let imageCounter =0;  //used to make columns and rows

//****************END CONST DECLARATIONS************ */


//*********TO DO LIST****** */


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
  })
      .then(res => res.json())
      .then(res => console.log(res));
}

function deleteLocal(url, data){
  fetch(url, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then((res) => console.log(res))
}


function postFavorite(data){
  fetch("http://localhost:3000/favorites", {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
    .then(res => res.json())
    .then(res => console.log(res));
}

function removeFavorite(id){
  fetch(`http://localhost:3000/favorites/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    })
    .then(res => res.json())
}

function getFavoriteId(){
  fetch(`http://localhost:3000/favorites`)
  .then(response => response.json())
  .then(response => response.forEach((fav) => {if(fav.title === detailsTitle.textContent)
    {console.log(fav.id)}
  }))
  
}


// function getFavoritesLength(){             //can maybe be used to keep storing favorites without conflict when the webpage is refreshed
//   fetch("http://localhost:3000/favorites")       //async issues at the moment?
//   .then(response => response.json())
//   .then(response => favoriteCount = response.length)
//   console.log(favoriteCount + "is how many favorites there are")
// }

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
    .then(response => {
      focusImage.src = response.image_url
      detailsTitle.textContent = `${response.title}`
      detailsArtist.textContent = `${response.artistName}`
      detailsYear.textContent = `${response.year}`
      focusImage.setAttribute("id" , id)
      birthMonth = response.birthMonth
      //console.log(birthMonth)
      objectUrl = response.object_url
      //console.log(objectUrl)
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
// const artRating=document.createElement('input')
// artRating.type='number'
// artRating.value=artPiece.rating

// //append rating to artPieceInfo


//***********ADD-DELETE-BUTTON FUNCTION******** */
function addDeleteButton (someImage){       
//create a delete button
const deleteButton = document.createElement("button")  
//set the text to "Delete"
deleteButton.innerHTML = "Delete"
//give the delete button an ID
deleteButton.setAttribute('id', 'delete-button')
//append the delete button to the given image
someImage.append(deleteButton)
//add an event listener to the delete button
deleteButton.addEventListener('click', () => {
//deletes the associated image on click
  someImage.remove()
  deleteLocal(localUrl, someImage)
})
}
//***********END ADD-DELETE-BUTTON FUNCTION******** */


function addDetailsClick(someImage){
    someImage.addEventListener('click', (event) => {
        // console.log(event.target.id)
        showDetails(event.target.id)
    }
  )
}

//FAVORITE BUTTON EVENT LISTENER

favoriteBtn.addEventListener('click', () => {
  //getFavoritesLength()
  favoriteCount++;
  
  let newFavorite = {
        "artistName": detailsArtist.textContent,
        "title": detailsTitle.textContent,
        "year": detailsYear.textContent,
        "birthMonth": birthMonth,
        "image_url": focusImage.src,
        "object_url": objectUrl,
        "rating": ""
  }
  postFavorite(newFavorite)
  //console.log(favoriteCount + "is how many favorites there are")
})

removeFavBtn.addEventListener('click', () => {
  getFavoriteId()
  //removeFavorite(getFavoriteId())
})



//*************EVENT LISTENERS******* */



//************END EVENT LISTENERS******* */

//**************function invokation*** */
populate()