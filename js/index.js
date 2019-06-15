searchGif = () => {

const app = document.getElementById('content-div');

var api = "https://api.giphy.com/v1/gifs/search?";
var apiKey = "&api_key=6gB95G4VQIE6zjRlryyFgXjTpxfRzCnf&q=";
var searchTerm = document.getElementById("query").value.toLowerCase();
var searchUrl = api + apiKey + searchTerm;

var request = new XMLHttpRequest();
request.open('GET',searchUrl,true);

request.onload = function(){
	var dataFetched = JSON.parse(this.response);
	console.log(dataFetched.data[0].images.original.url);
	console.log(dataFetched.data.length);
	
	if(request.status>=200 && request.status<=400){
		document.getElementById("content-div").innerHTML = "";
		for(var i=0;i<6;i++){
			const gifDiv = document.createElement('div');
			gifDiv.setAttribute('class','col s12 m4 l3 gif-div');
			app.appendChild(gifDiv);
			const newgif = document.createElement('img');
			newgif.setAttribute('src', dataFetched.data[i].images.original.url);
			gifDiv.appendChild(newgif);
		}
	}
	else{
		console.log("error"); //to be edited
	}
}

request.send();
}
