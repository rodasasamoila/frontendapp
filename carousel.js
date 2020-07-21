var carousel = [];
httpGetAsync()
function httpGetAsync() {
    fetch("https://localhost:44320/api/carousel")
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

