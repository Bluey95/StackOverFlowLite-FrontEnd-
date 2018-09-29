$(window).on('load', function(){
    // Animate loader off screen
    $('.loader').delay(3200).fadeOut('slow');
  });

document.addEventListener("DOMContentLoaded", function() {
    var button = document.getElementById("submit");
    button.onclick = function(){
        var Username = document.getElementById("Username").value;
        var Password = document.getElementById("Password").value;
    
        p = {
            "username":Username,
            "password":Password
        }

        fetch('https://stackoverflowlitev3.herokuapp.com/api/v2/auth/login', {
        method: 'POST',
        mode: 'cors', 
        redirect: 'follow',
        headers: new Headers({
        'Content-Type': 'application/json'
        }),
        body:JSON.stringify(p)
        }).then(function(response) {
        if (response.status == 201){
            response.json().then(data => {
                window.sessionStorage.setItem('username', p.username)
                let token = (data.Access_token).substring(2, (data.Access_token).length -1); 
                window.sessionStorage.setItem('token', token);
                window.location.replace("index.html")},
            );
        }else if (response.status == 400 || response.status == 422 || response.status == 401){
            response.json().then(
                data => 
                { 
                var arr = [];
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        arr.push( [ key, data[key] ] );
                    }
                }
                swal(
                    { title: "Sorry", 
                    text: (data[key]), 
                    type: "info" }).then(function(){
                        window.location.reload(true);
                });
            });
        }
        else{
        //failed
        response.json().then(data => 
            swal(
                { title: "Failed", 
                text: data, 
                type: "info" }),
        )}
        }).catch(err => console.log(err));
        function example(data){
            swal(
                { title: "Failed", 
                text: data, 
                type: "info" });
        }
        return false;
    }
}) 

