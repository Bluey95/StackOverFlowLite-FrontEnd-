$(window).on('load', function(){
  // Animate loader off screen
  $('.loader').delay(1200).fadeOut('slow');
});

var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar_ul").style.top = "0";
  } else {
    document.getElementById("navbar_ul").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
}

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
  .then(function(response){
    response.json().then(data => {
      if(response.status == 401){
      swal({ title: "Sorry", text: data.message, icon: "info" }).then(function(){
        window.location.replace('signup.html');
    });
    }
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
    p.setAttribute('class', 'p');
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
      console.log(data)

      const card = document.createElement('div');
      card.setAttribute('class', 'cardAnswer');

      const h1 = document.createElement('h1');
      h1.setAttribute('style', 'color: #000000;')
      h1.textContent = "Answer " + answer.id;

      const p = document.createElement('p');
      p.setAttribute('class', 'pAns');
      answer.body = answer.body.substring(0, 300);
      p.textContent = `${answer.body}...`;

      const h4 = document.createElement('h4');
      h4.textContent = "Answered By " + answer.answered_by;

      const h5 = document.createElement('h5');
      h5.textContent = answer.votes + " votes";

      const upButton = document.createElement('button');
      upButton.setAttribute('id', 'updown')
      upButton.textContent = "Upvote";
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
            swal({ title: "Pssst.....", text: "Are you really trying to upvote your own answer?", icon: "info", button: "Lets Go Back" }).then(function(){
              window.location.reload();
          });
          }
        })
      }
      

      const downButton = document.createElement('button');
      downButton.setAttribute('id', 'updown')
      downButton.textContent = "Downvote";
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
              swal({ title: "Pssst.....", text: data.message, icon: "info", button: "Lets Go Back"}).then(function(){
                window.location.reload();
            });
            })
          }
        })
      }

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      card.appendChild(h4);
      card.appendChild(h5);
      card.appendChild(upButton);
      card.appendChild(downButton);

    if(sessionStorage.username == answer.answered_by){
    const DeleteAns = document.createElement('button');
    DeleteAns.setAttribute('id', 'updown')
    DeleteAns.textContent = "Delete";
    DeleteAns.onclick = function(){
      window.sessionStorage.setItem('questionid', question.id)
      var questionid = window.sessionStorage.getItem('questionid')
      window.sessionStorage.setItem('answerid', answer.id)
      console.log(answer)
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
  card.appendChild(DeleteAns);
}

      if(sessionStorage.username == sessionStorage.askedby){
        const MarkAns = document.createElement('button');
        MarkAns.setAttribute('id', 'updown')
        MarkAns.textContent = "Accept Answer";
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
                  card.appendChild(MarkAnsButton)
                  card.removeChild(MarkAns)
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
      if (answer.is_accepted != "true"){
        card.appendChild(MarkAns);
      }
    }

    const MarkAnsButton = document.createElement('img');
      MarkAnsButton.setAttribute('id', 'updownImage');
      MarkAnsButton.setAttribute('src', '../static/img/accept.png');
      console.log(answer.is_accepted)
      if(answer.is_accepted == "true"){
        console.log("getting here")
         card.appendChild(MarkAnsButton)
      }
    })

})

.catch(function(error) {
console.log(error);
});  
  }) 
