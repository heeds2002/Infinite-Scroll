const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArrey = [];

// Unsplash API 
const count =10;
const apiKey='0HK3kjwYo-wZM29DCbezAXmYOlTp0ZCR1oo93UEAzAY';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Helper function to set attributes on DOM Element
function setAttributes(elements , attributes) {
    for(const key in attributes){
         elements.setAttribute(key, attributes[key]);
    }
}


//  Create elements for Links &  photos ,add 
function displayPhotos() {
    //  Run function for each object in PhotoArrey
    photosArrey.forEach((photo)=> {
    // Create <a> to link to Unsplash
    const item = document.createElement('a');

    setAttributes(item, {
         href: photo.links.html,
         target:'_blank',
    });
    // Create <img> for photos 
    const img = document.createElement('img');
    setAttributes(img, {
        src:   photo.urls.regular,
        alt:   photo.alt_description,
        title: photo.alt_description, 
    }
        );
    // put <img> inside <a>, then put both inside in=mage container Element
    item.appendChild(img);
    imageContainer.appendChild(item);



    } );
}


// Get photos from Unsplash API
async function getPhotos(){
try {
    const response = await fetch (apiUrl);
   photosArrey = await response.json();
   displayPhotos();
    } catch (error) {
     // Catch Error Here 
    }
}
// on Load
getPhotos();    