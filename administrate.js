GetVisits();
function AddListing(){
    var elements = document.getElementById("addListingForm").elements;
    var obj ={};
    for(var i = 0 ; i < elements.length ; i++){
        var item = elements.item(i);
        obj[item.name] = item.value;
    }
    var json=JSON.stringify(obj);
    console.log(obj);
        const Http = new XMLHttpRequest();
        const url='https://localhost:44320/api/addListing';
        Http.open("POST", url);
        Http.setRequestHeader('content-type', 'application/json');
        Http.send(json);
        
        Http.onreadystatechange = (e) => {
          console.log(Http.responseText);
        }

}
function AddImgToCarousel(){
    var elements = document.getElementById("addImageToCarousel").elements;
    var obj ={};
    for(var i = 0 ; i < elements.length ; i++){
        var item = elements.item(i);
        obj[item.name] = item.value;
    }
    var json=JSON.stringify(obj.link);
    console.log(obj);
        const Http = new XMLHttpRequest();
        const url='https://localhost:44320/api/addImagesToCarousel/'+obj.name;
        Http.open("POST", url);
        Http.setRequestHeader('content-type', 'application/json');
        Http.send(json);
        
        Http.onreadystatechange = (e) => {
          if(Http.responseText=="\"404\"")
          {
              alert("Listing was not found in DB");
          }
        }

}
function GetVisits(){
    fetch("https://localhost:44320/api/visits")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        var keys = [];

var a="<table border==\"1\"><tr>";
for (key in data[0]) {
	a=a+('<td>' + key + '</td>');
}
a=a+("</tr>");
for (var i = 0; i < data.length; i++) {
	a=a+('<tr>');
	for (key in data[i]) {
  a=a+('<td>' + data[i][key] + '</td>');
  }
	a=a+('</tr>');
}
a=a+("</table>");
document.getElementById("apps").insertAdjacentHTML("afterbegin", a);
    })
    .catch(function (error) {
        console.log("Error: " + error);
    });

    
}
