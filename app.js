console.log("Let's get this party started!");

document.querySelector("#giphy-form").addEventListener('submit', function(e) {
    e.preventDefault(); //this is to prevent the default form submission and to keep from leaving the page 

    const searchTerm = document.querySelector('#search-term').value;
    const apiKey = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";
    const url = "http://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + searchTerm + "&limit=1";

    axios.get(url).then(function(response) {//this initiates out http request using axios and the url variable we creatd using the GET method
        const imageURL = response.data.data[0].images.original.url; //extracting the url of the first GIF form the response
        appendGifToPage(imageURL); //appending the GIF to the page
        //the then keyword is a method that gets excecuted once the promise from the Axios get request resolves succesffuly, when the request completed without errors and the server sends back a response
        console.log(response.data);//response object contains various details about the servers respoinse, including status coide, headers, and actual data 
        //response.data holds the data sent back by the server
    }).catch(function(error) {
        console.error("Error fetching data from Giphy:", error);//if the promise from the axios request receives an error, then this message will appear. the error object will hold info about what error info there is 
    });

    function appendGifToPage(imageURL) {
        const gifContainer = document.querySelector("#gif-container");
        const newGif = document.createElement('img'); //create an img element
        newGif.src = imageURL; // set the GIF URL to the src attribute of the img 
        gifContainer.appendChild(newGif); //append the img to the gifContainer
    }
});

document.querySelector('#remove-gifs').addEventListener('click', function() {//creating event listener for button
    const gifContainer = document.querySelector('#gif-container');//specifying the gifontainer to select
    gifContainer.innerHTML = ''; //emptying the html associated with the gifContainer, since the gifContainer is basically html elements appended to images, replacing the contents with nothing
})