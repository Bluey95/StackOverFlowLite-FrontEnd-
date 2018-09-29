$(window).on('load', function(){
    // Animate loader off screen
    $('.loader').delay(3200).fadeOut('slow');
  });

document.addEventListener("DOMContentLoaded", function() {

    console.log(window.sessionStorage.getItem('username'))
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
  .then((resp) => resp.json()) // Transform the data into json
  .then(function(data) {
    document.getElementById('questions').innerHTML = data.Question.length;
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
    console.log(data)
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






  