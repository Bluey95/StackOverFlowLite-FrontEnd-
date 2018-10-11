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

    document.getElementById('question-title').innerHTML = sessionStorage.getItem('questiontitle');
    document.getElementById('question-body').innerHTML = sessionStorage.getItem('questionbody'); 

    var button = document.getElementById("submit");
    button.onclick = function(){

        var body = document.getElementById("answerbody").value;
    
        p = {
            body:body
        }

        const token = window.sessionStorage.getItem('token');
        const questionid = window.sessionStorage.getItem('questionid')

        fetch('https://stackoverflowlitev3.herokuapp.com/api/v2/questions/'+questionid+"/answer", {
        method: 'POST',
        mode: 'cors', 
        redirect: 'follow',
        headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(p)
        }).then(function(response) {
        if(response.status == 401){
            swal({ title: "Sorry", text: "Please Log In To Continue", icon: "info" }).then(function(){
                window.location.replace('signup.html');
            });
        }
        if (response.status == 201){
            response.json().then(data => {
                swal({ title: "Success", text: "Your Answer Has Been Successfuly Posted", icon: "success" }).then(function(){
                    window.location.replace("specificquestion.html");
                });
            }   
        );
        }else if (response.status == 400 || response.status == 422 || response.status == 401){
            response.json().then(
                data => 
                { var arr = [];

                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        arr.push( [ key, data[key] ] );
                    }
                }
                swal({ title: "Sorry", text: (data[key]), icon: "info" }).then(function(){
                    window.location.reload(true);
                });
             ;});
        }
        else{
        //failed
        response.json().then(data => 
            swal({ title: "Failed", text: data, icon: "info" }));
        }
        }).catch(err => console.log(err));
        function example(data){
            swal({ title: "Failed", text: data, icon: "info" });
        }
        return false;
    }
}) 

