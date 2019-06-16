searchGif = (id) => {

document.getElementById(id).className = "active black";
for(i=1;i<6;i++){
	if(i!=id){
		document.getElementById(i).className = "waves-effect";
	}
}

const app = document.getElementById('content-div');
const api = "https://api.giphy.com/v1/gifs/search?";
const apiKey = "&api_key=6gB95G4VQIE6zjRlryyFgXjTpxfRzCnf&q=";
var searchTerm = document.getElementById("query").value.toLowerCase();
const limit = "&limit=30";
var searchUrl = api + apiKey + searchTerm + limit;

var request = new XMLHttpRequest();
request.open('GET',searchUrl,true);

request.onload = function(){
	var dataFetched = JSON.parse(this.response);
	
	if(request.status>=200 && request.status<=400){
		document.getElementById("content-div").innerHTML = "";
		for(var i=(id-1)*6;i<6*id;i++){
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
