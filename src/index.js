//**************CONST DECLARATIONS************* */
const localUrl = 'http://localhost:3000/masterpieces'
// const rijksUrl = `https://www.rijksmuseum.nl/api/nl/collection?key=${apiKey}&${category}=${query}`
const metUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=`
const metObjectUrl = `https://collectionapi.metmuseum.org/public/collection/v1/objects/`
const imageContainer = document.querySelector('#image-container')
const focusImage = document.querySelector('.focus-image')
const details = document.querySelector('#image-details')
const detailsTitle = document.querySelector('#image-title-content')
const detailsArtist = document.querySelector('#artist-name-content')
const detailsYear = document.querySelector('#art-year-content')
const favoriteBtn = document.querySelector('#favoriteBtn')
const removeFavBtn = document.querySelector('#removeFavBtn')

const rating = document.querySelector('#rating-dropdown')
const searchForm = document.querySelector('#search_form')

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

function getMetSearch(parameter){
    return fetch(`${metUrl}${parameter}`)
      .then((resp) => resp.json())
      .then((resp) => resp.objectIDs.forEach(getMetId))
      .catch((error) => console.log(error.message))
}

function getMetId(objectId){
   fetch(`${metObjectUrl}${objectId}`)
    .then((resp) => resp.json())
    .then((resp) => renderMetImage(resp))
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

function deleteLocal(id){
  fetch(`http://localhost:3000/masterpieces/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
  })
  .then ((response) => response.json())
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

function checkForRemoveFav(){
  fetch(`http://localhost:3000/favorites`)
  .then(response => response.json())
  .then(response => response.forEach((fav) => {if(fav.title === detailsTitle.textContent)
    removeFavorite(fav.id)
  }))
}

function patchRating(id) {
  fetch(`http://localhost:3000/favorites/${id}`, {
    method:'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({rating: `${rating.value}`})})
    .then(res=>res.json());
    }

function checkForRating(){
      fetch(`http://localhost:3000/favorites`)
      .then(response => response.json())
      .then(response => response.forEach((fav) => {if(fav.title === detailsTitle.textContent)
        patchRating(fav.id)
      }))
    }
//************END FETCH REQUESTS***************** */




//***********RENDER FUNCTIONS********* */
function renderImage(image){
    let newImageDiv = document.createElement('div')
     //if (imageCounter % 2 == 0 ){newImageDiv.classList.add("column")}
    let newImage = document.createElement('img')
    newImage.src = image.image_url
    newImage.setAttribute("id", image.id)
    
    //addDeleteButton(newImageDiv)
    addDetailsClick(newImage)
    ratingForm(newImageDiv)
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
      rating.value = ""
    })
}

function renderMetImage(image){
  let newImageDiv = document.createElement('div')
    let newImage = document.createElement('img')

    newImage.src = image.primaryImageSmall
    //newImage.setAttribute("id", image.id)
    
    //addDeleteButton(newImageDiv)
    addDetailsClick(newImage)

    newImageDiv.append(newImage)
    imageContainer.append(newImageDiv)
    // imageCounter++; //used to make columns/rows
}


//***********END RENDER FUNCTIONS******** */


//***********GENERAL FUNCTION DECLARATION**** */
function populate(){
    fetch(localUrl)
    .then(response => response.json())
    .then(response => response.forEach(renderImage))
}

//**********END GENERAL FUNCTION DECLARATION****** */

// //Artwork ratings PATCH request



// function ratingForm (someImage) {   //add ratings to art pieces
//   const artRating=document.createElement('SELECT')
//   artRating.id="rating-form"
//   let ratingOption=document.createElement('option')
//  // artRating.innerHTML="Select Rating"
//  ratingOption.value=1
//  artRating.append(ratingOption)
//   artRating.addEventListener('select', (e) => {
//       e.preventDefault()
//   })
//   artRating.type='number'
//   artRating.value=1,2,3,4
//   someImage.append(artRating)  
// }
//ratingForm()



//     patchRating()
=======
function ratingForm (someImage) {   //add ratings to art pieces
  const artForm=document.createElement('form')
  const artRating=document.createElement('select')
  artRating.id="rating-form"
  let ratings = [1,2,3,4,5,6,7,8,9,10]
  ratings.forEach(el => {
    let ratingOption=document.createElement('option')
    ratingOption.value=el
    ratingOption.textContent=el
    artRating.append(ratingOption)
  })

  artRating.addEventListener('select', (e) => {
    
  })
  artRating.type='number'
  someImage.append(artForm)  
  artForm.append(artRating)  
}


function patchRating(id) {
  fetch(`http://localhost:3000/masterpieces/${id}`, {
    method:'PATCH',
    headers: {
      'Content-Type': 'application/json'},
    body: JSON.stringify(id)
    })
    .then(res=>res.json())
    
  }




//***********ADD-DELETE-BUTTON FUNCTION******** */
// function addDeleteButton (someImage){       
// //create a delete button
// const deleteButton = document.createElement("button")  
// //set the text to "Delete"
// deleteButton.innerHTML = "Delete"
// //give the delete button an ID
// deleteButton.setAttribute('id', 'delete-button')
// //append the delete button to the given image
// someImage.append(deleteButton)
// //add an event listener to the delete button
// deleteButton.addEventListener('click', () => {
// //deletes the associated image on click
//   someImage.remove()
//   deleteLocal(someImage.id)
// })
// }
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
})

removeFavBtn.addEventListener('click', () => {
  checkForRemoveFav()
})


//RATING EVENT LISTENER
rating.addEventListener('change', () => {
  checkForRating()
})

imageContainer.addEventListener("mouseover", (event) => {
  event.target.classList.add("imgopacity")
})

imageContainer.addEventListener("mouseout", (event) => {
  event.target.classList.remove("imgopacity")
})

searchForm.addEventListener('submit', (event) => {
  event.preventDefault()
  query = searchForm.querySelector('#form_input').value
  console.log(query)
  console.log(getMetSearch(query))

  searchForm.querySelector('#form_input').value = ""
})
//**************function invokation*** */
populate()