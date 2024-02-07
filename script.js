const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
 
let ready = false;
let imagesLoaded= 0;
let totalImages= 0;


let photosArrey = [];

     

// Unsplash API 
const count =10;
const apiKey='0HK3kjwYo-wZM29DCbezAXmYOlTp0ZCR1oo93UEAzAY';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded () {
    
    imagesLoaded++;
   
  if( imagesLoaded === totalImages) {
        ready = true;
        loader.hidden=true;
   
    }
}

// Helper function to set attributes on DOM Element
function setAttributes(elements , attributes) {
    for(const key in attributes){
         elements.setAttribute(key, attributes[key]);
    } 
}


//  Create elements for Links &  photos ,add 
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArrey.length;
    


    //  Run function for each object in PhotoArrey
    photosArrey.forEach ( (photo) => {
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

        // Event Listener check ,check when each is finished loading
         img.addEventListener('load', imageLoaded);
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

// Check to see of scrolling near bottom of the page load more photos.
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY  >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
       getPhotos();
       console.log('load more');
  }
});
// on Load
getPhotos();    