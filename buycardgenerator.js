
PopulateCards()
function GenerateCards(name) {
    var i = 0;
    var size=Object.keys(name).length;
    var lastListing=document.getElementsByClassName("containerButton")[0].id;
    lastListing=parseInt(lastListing);
    var howManyToGenerate;
    if(lastListing+9<size)
    {
        howManyToGenerate=lastListing+9;
    }
    else
    {
        howManyToGenerate=size;
    }
        for (i = lastListing; i < howManyToGenerate; i++) {
            var str = '<div class=\"post\" style=\"margin-right: 40px;margin-top:40px;float: left;\" >\r\n            <div class=\"header_post\">\r\n               <a href=\"individualListing.html #'+name[i].id+'\"> <img src=\"'+name[i].imageLink+'\" alt=\"\">\r\n </a>           <\/div>\r\n    \r\n            <div class=\"body_post\">\r\n                <div class=\"post_content\">\r\n    \r\n                    <h1>'+name[i].name+'<\/h1>\r\n                    <p>'+name[i].smallDescription+'<\/p>\r\n    \r\n                    <div class=\"container_infos\">\r\n                        <div class=\"postedBy\">\r\n                            <span>price<\/span>\r\n                            '+name[i].price+' $ / month\r\n                        <\/div>\r\n    \r\n                            <a type="button" class="btn btn-light" href="individualListing.html #'+name[i].id+'">Rent</a>            <\/div>\r\n                <\/div>\r\n            <\/div>\r\n        <\/div>';
            document.getElementById("grid-container").insertAdjacentHTML('beforeend', str);
        }
        document.getElementsByClassName("containerButton")[0].id=howManyToGenerate;
        if(lastListing==size)
        {
            var btn=document.getElementById("ShowMore");
            btn.remove();
        }
}

function ShowMore(){
    PopulateCards();   
}
function GenerateMoreCards(name){
    
}

function PopulateCards()
{
    var listings=[];
    fetch("https://localhost:44320/api/listings")
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
        console.log(myJson);
        GenerateCards(myJson);
    })
    .catch(function (error) {
        console.log("Error: " + error);
    });
}