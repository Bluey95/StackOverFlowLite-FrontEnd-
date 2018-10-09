$(window).on('load', function(){
    // Animate loader off screen
    $('.loader').delay(1200).fadeOut('slow');
  });

document.addEventListener("DOMContentLoaded", function() {

    document.getElementById('username').innerHTML = window.sessionStorage.getItem('username');

    const token = window.sessionStorage.getItem('token');

    fetch("https://stackoverflowlitev3.herokuapp.com/api/v2/questions/myquestions", {
    method: 'GET',
    mode: 'cors', 
    redirect: 'follow',
    headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
    },
    })
    .then(function(response){
        response.json().then(data => {
          if(response.status == 401){
          swal({ title: "Sorry", text: data.message, icon: "info" }).then(function(){
            window.location.replace('signup.html');
        });
        }
        if(data.Question != null){
        if(data.Question.length >= 1){
            document.getElementById('questions').innerHTML = data.Question.length;
        }
    }else{
        document.getElementById('questions').innerHTML = 0;
    }
        
    })   

    fetch("https://stackoverflowlitev3.herokuapp.com/api/v2/questions", {
    method: 'GET',
    mode: 'cors', 
    redirect: 'follow',
    headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
    },
    })
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {
        data.Questions.forEach(question => {
            fetch("https://stackoverflowlitev3.herokuapp.com/api/v2/questions/" + question.id, {
                method: 'GET',
                mode: 'cors', 
                redirect: 'follow',
                headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
                },
                }).then((resp) => resp.json()) // Transform the data into json
                .then(function(data) {
                    answers = data.Answers
                    answers.forEach(answer => {
                        if(answer.answered_by == window.sessionStorage.getItem('username')){
                            document.getElementById('answers').innerHTML = (answer.answered_by).length
                        }else{
                            document.getElementById('answers').innerHTML = "0"
                        }
                    })

                })
        })

    })


    fetch("https://stackoverflowlitev3.herokuapp.com/api/v2/auth/users", {
    method: 'GET',
    mode: 'cors', 
    redirect: 'follow',
    headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
    },
    }).then((resp) => resp.json()) // Transform the data into json
    .then(function(data) {
        data.Users.forEach(user => {
            if(user.username == window.sessionStorage.getItem('username')){
                document.getElementById('email').innerHTML = user.email
            }
        })

    })

})

})




  