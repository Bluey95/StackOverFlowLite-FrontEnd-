document.addEventListener("DOMContentLoaded", function() {
    var button = document.getElementById("submit");
    button.onclick = function(){
        var title = document.getElementById("questionTitle").value;
        var body = document.getElementById("questionBody").value;
    
        p = {
            title:title,
            body:body
        }

        const token = window.sessionStorage.getItem('token');

        fetch('https://stackoverflowlitev3.herokuapp.com/api/v2/questions', {
        method: 'POST',
        mode: 'cors', 
        redirect: 'follow',
        headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
        },
        body:JSON.stringify(p)
        }).then(function(response) {
            console.log("getting here", response);
        if (response.status == 201){
            response.json().then(data => {
                alert("Successfuly Posted")
            },
            // window.location.replace("index.html")
        );
        }else if (response.status == 400 || response.status == 422 || response.status == 401){
            response.json().then(
                data => 
                { var arr = [];

                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        arr.push( [ key, data[key] ] );
                    }
                }alert(data[key]); window.location.reload(true);});
        }
        else{
        //failed
        response.json().then(data => console.log("Failed: ", data));
        }
        }).catch(err => console.log(err));
        function example(data){
            //execute some statements
            console.log(JSON.stringify(data));
        }
        return false;
    }
}) 

