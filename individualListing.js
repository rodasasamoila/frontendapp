var currentLocation = window.location;
var str = currentLocation.hash; 
var res = str.substring(1, currentLocation.lenght);
var carousel = [];
httpGetAsync(res)
Details(res);
function httpGetAsync(idListing) {
    
    fetch("https://localhost:44320/api/listingscarousel/"+idListing)
        .then(function (response) {
            return response.json();
        })
        .then(function (myJson) {
            carousel = myJson;
            var i = 0;
            while (carousel[i] != undefined) {
                var img = document.createElement("img");
                var div = document.createElement("div");
                if (i == 0) {
                    div.className = "item active";
                    var str = '<li data-target="#myCarousel" data-slide-to="' + i + '" class="active"></li>';
                }
                else {
                    div.className = "item";
                    var str = '<li data-target="#myCarousel" data-slide-to="' + i + '"></li>';
                }
                img.src = carousel[i].link;
                document.getElementById("carouselCircles").insertAdjacentHTML('beforeend', str);
                document.getElementById("carouselImages").appendChild(div).appendChild(img);
                i++;
            }
            ;
        })
        .catch(function (error) {
            console.log("Error: " + error);
        });
}
function GetListingDetails(idListing){
    fetch("https://localhost:44320/api/listingdetails/"+idListing)
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
        var i=0;
        var keys=Object.keys(jsonObj);
       var li=document.createElement("li");
       var img=document.createElement("img");
       while(keys[i] !=undefined)
       {
            if(json[i] !=undefined)
            {
                img.src=keys[i]
                document.getElementById("imageDetailsListing").appendChild(li).appendChild(img);
            }
           
           i++;
       }
       

    })
    .catch(function (error) {
        console.log("Error: " + error);
    });
}
function Details(idListing){
    fetch("https://localhost:44320/api/listings/"+idListing)
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
      document.getElementById("titleListing").innerHTML=myJson[0].name;
    document.getElementById("priceListing").innerHTML='Price: '+myJson[0].price + '$ / month';
       document.getElementById("Adress").innerHTML='Adress: '+myJson[0].adress;
       if(myJson[0].garage==0)
       {
        document.getElementById("Garage").innerHTML='Garage: None';
       }
       else{
           document.getElementById("Garage").innerHTML='Garage: '+myJson[0].garage;
       }
       
    document.getElementById("Bathrooms").innerHTML='Bathrooms: '+myJson[0].bathrooms;
    document.getElementById("Sq").innerHTML='Squared Meters: '+myJson[0].squaredMeters;
    document.getElementById("Description").innerHTML=myJson[0].description;
    })
    .catch(function (error) {
        console.log("Error: " + error);
    });
}
function contact(){
    if(sessionStorage.getItem("idUser")<=0)
    {
        alert("You need to be log in to request a visit")
    }
    else{

        var json={id:sessionStorage.getItem("idUser"),name: document.getElementById("titleListing").innerHTML}
        const Http = new XMLHttpRequest();
        const url='https://localhost:44320/api/visit';
        Http.open("POST", url);
        Http.setRequestHeader('content-type', 'application/json');
        Http.send(JSON.stringify(json));
        
        Http.onreadystatechange = (e) => {
          
        }
        alert("An agent will contact you on email to discuss details");
    }
    
}


