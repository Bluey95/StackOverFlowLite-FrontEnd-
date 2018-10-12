$(window).on('load', function(){
    // Animate loader off screen
    $('.loader').delay(1200).fadeOut('slow');
  });

  function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
  }
  
document.addEventListener("DOMContentLoaded", function() {

    document.getElementById('username').innerHTML = window.sessionStorage.getItem('username');
    const number_of_questions = window.sessionStorage.getItem('number_of_questions');
    const number_of_answers = window.sessionStorage.getItem('number_of_answers');

    if(number_of_questions >= 1){
        document.getElementById('questions').innerHTML = number_of_questions;
    }else{
        document.getElementById('questions').innerHTML = "0";
    }

    if(number_of_answers >= 1){
        document.getElementById('answers').innerHTML = number_of_answers;
    }else{
        document.getElementById('answers').innerHTML = "0";
    }
    
    const token = window.sessionStorage.getItem('token');  

    fetch("https://stackoverflowlitev3.herokuapp.com/api/v2/auth/users", {
    method: 'GET',
    mode: 'cors', 
    redirect: 'follow',
    headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
    },
    }).then(function(response){
        response.json().then(data => {
        if(response.status == 401){
            swal({ title: "Sorry", text: data.message, icon: "info" }).then(function(){
                window.location.replace('signup.html');
                });
            }
        data.Users.forEach(user => {
            if(user.username == window.sessionStorage.getItem('username')){
                document.getElementById('email').innerHTML = user.email;
            }
        });

    });

});



});
  