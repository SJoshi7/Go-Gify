var dataFetched;
var count;

searchGif = (id) => {
	count = id;
	//changes active page number in pagination
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
		dataFetched = JSON.parse(this.response);
		console.log(dataFetched);
		console.log(dataFetched.data.length);
		if (dataFetched.data.length!=0){
			//paginate when showing search result
			document.getElementById("paginate").style.display = "block";
			//play pause once search result shown
			document.getElementById("pause-play").style.display = "block";
		}

		if(dataFetched.data.length!=0 && request.status>=200 && request.status<=400){
			document.getElementById("content-div").innerHTML = "";
			for(var i=(id-1)*6;i<6*id;i++){
				const gifDiv = document.createElement('div');
				gifDiv.setAttribute('class','col s12 m4 l3 gif-div');
				app.appendChild(gifDiv);
				const newgif = document.createElement('img');
				newgif.setAttribute('src', dataFetched.data[i].images.original.url);
				newgif.setAttribute('class',"gifImg");
				gifDiv.appendChild(newgif);
			}
		}
		else{
			document.getElementById("content-div").innerHTML = "";
			document.getElementById("pause-play").style.display = "none";
			document.getElementById("paginate").style.display = "none";
			const errorDiv = document.createElement('div');
			errorDiv.setAttribute('class','col s12 m4 l3 error-div');
			app.appendChild(errorDiv);
			const newgif = document.createElement('img');
			newgif.setAttribute('src', "https://media.giphy.com/media/iPnLFwV5pPBsc/giphy.gif");
			newgif.setAttribute('class',"gifImg");
			errorDiv.appendChild(newgif);
			console.log("error"); //to be edited
		}
	}

	request.send();
}

pausePlay = (n) =>{
	if(n==0){
		for(var i=(count-1)*6;i<6*count;i++){
			document.getElementsByClassName('gifImg')[i-6*(count-1)].src = dataFetched.data[i].images.original.url;
		}
	}
	else{
		for(var i=(count-1)*6;i<6*count;i++){
			document.getElementsByClassName('gifImg')[i-6*(count-1)].src = dataFetched.data[i].images['480w_still'].url;
		}
	}
}