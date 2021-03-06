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

const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

const token = window.sessionStorage.getItem('token');

fetch("https://stackoverflowlitev3.herokuapp.com/api/v2/questions/mostanswers", {
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
    data.Questions.forEach(question => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h2 = document.createElement('h2');
      h2.textContent = question.question_title;

      const p = document.createElement('p');
      p.setAttribute('class', 'p');
      question.body = question.question_body.substring(0, 300);
      p.textContent = `${question.body}...`;

      const h4 = document.createElement('h4');
      h4.textContent = "Asked By " + question.asked_by;

      const h5 = document.createElement('h5');

      fetch("https://stackoverflowlitev3.herokuapp.com/api/v2/questions/"+question.question_id, {
        method: 'GET',
        mode: 'cors', 
        redirect: 'follow',
        headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
        },
        }).then((resp) => resp.json()) // Transform the data into json
        .then(function(data) {
            h5.textContent = data.Answers.length + " Answers"
            if(data.Answers.length >= 1){
              card.appendChild(viewAnswer);
            }
        })


      const viewAnswer = document.createElement('button');
      viewAnswer.setAttribute('id', 'updown')
      viewAnswer.textContent = "View Answers";
      viewAnswer.onclick = function(){
        window.sessionStorage.setItem('questionid', question.question_id)
        window.sessionStorage.setItem('questiontitle', question.question_title)
        window.sessionStorage.setItem('questionbody', question.question_body)
        window.sessionStorage.setItem('askedby', question.asked_by)
        window.location.replace("specificquestion.html")
      }

      const answer = document.createElement('button');
      answer.setAttribute('id', 'updown');
      answer.textContent = "Answer this question";
      answer.onclick = function(){
        window.sessionStorage.setItem('questionid', question.question_id)
        window.sessionStorage.setItem('questiontitle', question.question_title)
        window.sessionStorage.setItem('questionbody', question.question_body)
        window.location.replace("answer.html")
      }

      container.appendChild(card);
      card.appendChild(h2);
      card.appendChild(p);
      card.appendChild(h4);
      card.appendChild(h5);
      card.appendChild(answer);

    });
  })

  

  .catch(function(error) {
    console.log(error);
  });   

  });