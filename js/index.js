runTimer = () => {

const app = document.getElementById('content-div');

//the url
var apikey = "6gB95G4VQIE6zjRlryyFgXjTpxfRzCnf";
var lmt = 6;
var searchTerm = document.getElementById("query").value.toLowerCase();
var searchUrl = "https://api.giphy.com/v1/gifs/random?api_key=" + apikey + "&q=" +
            searchTerm + "&limit=" + lmt+"&offset=0rating=G&lang=en";

//starting request
var request = new XMLHttpRequest();
request.open('GET',searchUrl,true);

request.onload = function(){
	var dataFetched = JSON.parse(this.response);
	console.log(dataFetched["data"].url);
	if(request.status>=200 && request.status<=400){
		const gifDiv = document.createElement('div');
		gifDiv.setAttribute('class','col s12 m4 l3 gif-div');
		app.appendChild(gifDiv);
		const newgif = document.createElement('img');
		newgif.setAttribute('src', dataFetched["data"].url);
		gifDiv.appendChild(newgif);
	}
	else{
		console.log("error"); //to be edited
	}
}

request.send();
}
