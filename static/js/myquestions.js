const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(container);

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
    data.Question.forEach(question => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h2 = document.createElement('h2');
      h2.textContent = question.title;

      const p = document.createElement('p');
      question.body = question.body.substring(0, 300);
      p.textContent = `${question.body}...`;

      const h4 = document.createElement('h4');
      h4.textContent = "Asked By " + question.created_by;

      const upButton = document.createElement('button');
      upButton.setAttribute('id', 'updown')
      upButton.textContent = "upvote";

      const downButton = document.createElement('button');
      downButton.setAttribute('id', 'updown')
      downButton.textContent = "downvote";

      const viewAnswer = document.createElement('button');
      viewAnswer.setAttribute('id', 'updown')
      viewAnswer.textContent = "View Answers";

      container.appendChild(card);
      card.appendChild(h2);
      card.appendChild(p);
      card.appendChild(h4);
      card.appendChild(upButton);
      card.appendChild(downButton);
      card.appendChild(viewAnswer);
    });
  })

  .catch(function(error) {
    console.log(error);
  });   

