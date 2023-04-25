//**************CONST DECLARATIONS************* */
const localUrl = 'http://localhost:3000/masterpieces'
const rijksUrl = `https://www.rijksmuseum.nl/api/nl/collection?key=${apiKey}&${category}=${query}`
const metUrl = `https://collectionapi.metmuseum.org/public/collection/v1/objects?${}`
const imageContainer = document.querySelector('#image-container')
const imageDetails = document.querySelector('#image-details')
//****************END CONST DECLARATIONS************ */



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

function getLocal(parameter){
    fetch(localUrl)
    .then((resp) => resp.json())
    .catch((error) => console.log(error.message))
}

function postJSON(url,data){
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
    let newImage = document.createElement('img')
    newImage.src = image.url
    imageContainer.append(newImage)
}

function showDetails(id){
    imageDetails
}



//***********END RENDER FUNCTIONS******** */