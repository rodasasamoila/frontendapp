function usernameNavbar(){
    modal.style.display = "none";
    var a=document.getElementById("myBtn");
    a.style.visibility="hidden";
    var btn=document.getElementById("logoutBtn");
    btn.style.visibility="visible";
    var log=document.getElementById("navUsername");
    log.style.visibility="visible";
    log.innerHTML=sessionStorage.getItem("name");
} 
var modal = document.getElementById("myModal");
if(sessionStorage.getItem("idUser")=="1")
    {
      AdministratorAcces();
      usernameNavbar();
    }
if(sessionStorage.getItem("idUser")>0)
{
  usernameNavbar();
}
// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}// HTML5 session Storage
if(sessionStorage.getItem("idUser")<=0)
{
    
}
else{
    var p = document.createElement("p");

    usernameNavbar(p);
}

function ChangeTab(evt, action) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(action).style.display = "block";
    evt.currentTarget.className += " active";
  }

function Login(){

    var username=document.getElementById("UsernameLogin").value;
    var password=document.getElementById("PasswordLogin").value;
    var loginInfo = {username:username, password:password};
    var json=JSON.stringify(loginInfo)
    const Http = new XMLHttpRequest();
const url='https://localhost:44320/api/';
Http.open("POST", url);
Http.setRequestHeader('content-type', 'application/json');
Http.send(json);

Http.onreadystatechange = (e) => {
  console.log(Http.responseText)
  var p = document.createElement("p");

  if(Http.responseText=="0" && document.getElementById("wrongCredentials")==undefined)
  {
    p.innerHTML="Credentials are not correct";
    p.id="wrongCredentials";
    document.getElementById("Login").appendChild(p);
  }
  if(Http.responseText>0)
  { 
    sessionStorage.setItem("idUser",Http.responseText);
    var log=document.getElementById("navUsername");
    sessionStorage.setItem("name",log.innerHTML=document.getElementById("UsernameLogin").value);
    usernameNavbar();
    saltedHash(Http.responseText);
    if(sessionStorage.getItem("idUser")=="1")
    {
      AdministratorAcces();
    }
  }
}


 
}
function saltedHash(id){
    fetch('https://localhost:44320/api/saltedHash/'+id)
    .then(function (response) {
        return response.json();
    })
    .then(function (myJson) {
        sessionStorage.setItem("token",myJson);
    })
    .catch(function (error) {
        console.log("Error: " + error);
    });
   
}
function Logout(){
    const Http = new XMLHttpRequest();
const url='https://localhost:44320/api/saltedHash';
Http.open("POST", url);
Http.setRequestHeader('content-type', 'application/json');
Http.send(JSON.stringify(sessionStorage.getItem("token")));

Http.onreadystatechange = (e) => {
  console.log(Http.responseText)
  
}
    var a=document.getElementById("wrongCredentials");
    var b=document.getElementById("existingUsername");
    var c=document.getElementById("existingEmail");
    if(a!=undefined)
    a.remove();
    if(b!=undefined)
    b.remove();    
    if(c!=undefined)
    c.remove();
    var a=document.getElementById("myBtn");
    a.style.visibility="visible";
    var btn=document.getElementById("logoutBtn");
    btn.style.visibility="hidden";
    var log=document.getElementById("navUsername");
    log.innerHTML="";
    sessionStorage.setItem("idUser",0);
    sessionStorage.setItem("token","");
    
    RemoveAdministratorAcces();
}
function AdministratorAcces(){
  var a=document.getElementById("administrate");
  var b=document.getElementById("addListing");
  b.style.visibility="visible";
  a.style.visibility="visible";
}
function RemoveAdministratorAcces(){
  var a=document.getElementById("administrate");
  a.style.visibility="hidden";
  var b=document.getElementById("addListing");
  b.style.visibility="hidden";
}
function Register(){
    var username=document.getElementById("UsernameRegister").value;

    var password=document.getElementById("PasswordRegister").value;

    var passwordAgain=document.getElementById("PasswordAgainRegister").value;

    var email=document.getElementById("EmailRegister").value;

    var sex=document.getElementById("SexRegister").value;
    var loginInfo = {username:username, password:password,email:email,sex:sex};
    if(password==passwordAgain){

    var json=JSON.stringify(loginInfo)
    const Http = new XMLHttpRequest();
    const url='https://localhost:44320/api/register';
    Http.open("POST", url);
    Http.setRequestHeader('content-type', 'application/json');
    Http.send(json);
    var p = document.createElement("p");
    var pusername=document.createElement("p");
    Http.onreadystatechange = (e) => {
      console.log(Http.responseText) 
      if(Http.responseText=="\"ok\"")
      {
         modal.style.display = "none";
        //  var a=document.getElementById("myBtn");
        //  a.innerHTML=username;
         Logout();
      }
       if(Http.responseText=="\"username\"" && document.getElementById("existingUsername")==undefined)
    {
        pusername.innerHTML="Username is already in use";
        pusername.id="existingUsername";
        document.getElementById("uname").appendChild(pusername);
    }
    if(Http.responseText=="\"email\""  && document.getElementById("existingEmail")==undefined)
    {
        p.innerHTML="Username is already in use";
        pusername.id="existingEmail";
        document.getElementById("email").appendChild(p);
    }
    Logout();
    }
}
else{
    if(document.getElementById("passMismatch")==undefined)
    {
        var p = document.createElement("p");
        p.innerHTML="Passwords don't match";
        p.id="passMismatch"
        document.getElementById("psw").appendChild(p);
    }
   
}

}