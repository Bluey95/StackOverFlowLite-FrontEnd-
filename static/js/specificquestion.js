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

      const upButton = document.createElement('button');
      upButton.setAttribute('id', 'updown')
      upButton.textContent = "upvote";
      

      const downButton = document.createElement('button');
      downButton.setAttribute('id', 'updown')
      downButton.textContent = "downvote";
      
      const MarkAns = document.createElement('button');
      MarkAns.setAttribute('id', 'updown')
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
        }
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
      }
    })
    }
      

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
      card.appendChild(h4);
      card.appendChild(upButton);
      card.appendChild(downButton);
      card.appendChild(MarkAns)
    })

})

.catch(function(error) {
console.log(error);
});   

