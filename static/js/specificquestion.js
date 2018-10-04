$(window).on('load', function(){
  // Animate loader off screen
  $('.loader').delay(1200).fadeOut('slow');
});

const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

const token = window.sessionStorage.getItem('token');

const questionid = window.sessionStorage.getItem('questionid')

fetch("https://stackoverflowlitev3.herokuapp.com/api/v2/questions/" + questionid, {
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
    var a = data.Answers.sort(function(a, b){
      return a.id - b.id;
    });

    a.reverse();
    
    question = data.Question

    const card = document.createElement('div');
    card.setAttribute('class', 'card');

    const h2 = document.createElement('h2');
    h2.textContent = window.sessionStorage.getItem("questiontitle");

    const p = document.createElement('p');
    question.body = question.body.substring(0, 300);
    p.textContent = `${window.sessionStorage.getItem("questionbody")}...`;

    const h4 = document.createElement('h4');
    h4.textContent = "Asked By " + window.sessionStorage.getItem("askedby");

    let answer = document.createElement('button');
    answer.setAttribute('id', 'answerButton');
    answer.textContent = "Answer this question";
    answer.onclick = function(){
    window.sessionStorage.setItem('questionid', question.id)
    window.sessionStorage.setItem('questiontitle', question.title)
    window.sessionStorage.setItem('questionbody', question.body)
    window.location.replace("answer.html")
    }

    container.appendChild(card);
    card.appendChild(h2);
    card.appendChild(p);
    card.appendChild(h4);
    card.appendChild(answer)

    data.Answers.forEach(answer => {

      const card = document.createElement('div');
      card.setAttribute('class', 'cardAnswer');

      const h1 = document.createElement('h1');
      h1.textContent = "Answer " + answer.id;

      const p = document.createElement('p');
      answer.body = answer.body.substring(0, 300);
      p.textContent = `${answer.body}...`;

      const h4 = document.createElement('h4');
      h4.textContent = "Answered By " + answer.answered_by;

      const h5 = document.createElement('h5');
      h5.textContent = answer.votes + " votes";

      const upButton = document.createElement('img');
      upButton.setAttribute('id', 'updownImage')
      upButton.setAttribute('src', '../static/img/thumbsup.png')
      upButton.textContent = "upvote";
      upButton.onclick = function(){
        var p = {
          body:answer.body
        }

        fetch('https://stackoverflowlitev3.herokuapp.com/api/v2/questions/'+question.id+'/answer/'+answer.id+'/upvote', {
          method: 'PUT',
          headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },body:JSON.stringify(p)
        }).then(function(response){
          if(response.status == 201){
            swal({ title: "Nice!!", text: "upvote successful", icon: "success" }).then(function(){
              window.location.reload();
          });
          }else if(response.status == 200){
            swal({ title: "Pssst.....", text: "Are you really trying to upvote your own answer?", icon: "info", button: "Lets Go Back" })
          }
        })
      }
      

      const downButton = document.createElement('img');
      downButton.setAttribute('id', 'updownImage')
      downButton.setAttribute('src', '../static/img/thumbsdown.png')
      downButton.textContent = "downvote";
      downButton.onclick = function(){
        var p = {
          body:answer.body
        }

        fetch('https://stackoverflowlitev3.herokuapp.com/api/v2/questions/'+question.id+'/answer/'+answer.id+'/downvote', {
          method: 'PUT',
          headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },body:JSON.stringify(p)
        }).then(function(response){
          if(response.status == 201){
            response.json().then(data => {
              swal({ title: "Oh Well", text: data.message, icon: "success" }).then(function(){
                window.location.reload();
            });
            })
          }else if(response.status == 200){
            response.json().then(data => {
              swal({ title: "Pssst.....", text: data.message, icon: "info", button: "Lets Go Back"})
            })
          }
        })
      }
      
      const MarkAns = document.createElement('img');
      MarkAns.setAttribute('id', 'updownImage')
      MarkAns.setAttribute('src', '../static/img/accept.png')
      MarkAns.textContent = "Accept This Answer";
      MarkAns.onclick = function(){
        window.sessionStorage.setItem('questionid', question.id)
        var questionid = window.sessionStorage.getItem('questionid')
        window.sessionStorage.setItem('answerid', answer.id)
        answerid = window.sessionStorage.getItem('answerid')
        fetch('https://stackoverflowlitev3.herokuapp.com/api/v2/questions/'+questionid+'/answer/'+answerid, {
          method: 'PUT',
          mode: 'cors', 
          headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        }).then(function(response) {
          console.log(response)
      if (response.status == 201){
          response.json().then(data => {
              acceptedData = data.response.is_accepted
              if (acceptedData == "true"){
                window.sessionStorage.setItem('color', card.setAttribute("id", "newColor"));
                window.onload = window.sessionStorage.getItem('color');

              }
          }
      );
      }else if(response.status == 200 || response.status == 400){
        response.json().then(data => {
          swal({ title: "Sorry", text: "Only The Question Owner Can Mark An Answer", icon: "info", button: "Lets Go Back"});
        })
      }
    })
    }

    const DeleteAns = document.createElement('img');
    DeleteAns.setAttribute('id', 'updownImage')
    DeleteAns.setAttribute('src', '../static/img/delete.png')
    DeleteAns.textContent = "Delete This Answer";
    DeleteAns.onclick = function(){
      window.sessionStorage.setItem('questionid', question.id)
      var questionid = window.sessionStorage.getItem('questionid')
      window.sessionStorage.setItem('answerid', answer.id)
      answerid = window.sessionStorage.getItem('answerid')
      fetch('https://stackoverflowlitev3.herokuapp.com/api/v2/questions/'+questionid+'/answer/'+answerid, {
        method: 'DELETE',
        mode: 'cors', 
        headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
      }).then(function(response) {
        console.log(response)
    if (response.status == 200){
      swal({ title: "Answer Deleted", text: "You can always post new answers", icon: "success" }).then(function(){
        window.location.reload();
    });
    }else if(response.status == 400 || response.status == 401){
      response.json().then(data => {
        swal({ title: "Sorry", text: "Only The Answer Owner Can Delete The Answer", icon: "info" });
      })
    }
  })
  }
      

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      card.appendChild(h4);
      card.appendChild(h5);
      card.appendChild(DeleteAns);
      card.appendChild(upButton);
      card.appendChild(downButton);
      card.appendChild(MarkAns);
    })

})

.catch(function(error) {
console.log(error);
});   

