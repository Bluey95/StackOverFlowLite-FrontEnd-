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
  

  $('.form').find('input, textarea').on('keyup blur focus', function (e) {
  
    var $this = $(this),
        label = $this.prev('label');
  
        if (e.type === 'keyup') {
              if ($this.val() === '') {
            label.removeClass('active highlight');
          } else {
            label.addClass('active highlight');
          }
      } else if (e.type === 'blur') {
          if( $this.val() === '' ) {
              label.removeClass('active highlight'); 
              } else {
              label.removeClass('highlight');   
              }   
      } else if (e.type === 'focus') {
        
        if( $this.val() === '' ) {
              label.removeClass('highlight'); 
              } 
        else if( $this.val() !== '' ) {
              label.addClass('highlight');
              }
      }
  
  });
  
  $('.tab a').on('click', function (e) {
    
    e.preventDefault();
    
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    
    target = $(this).attr('href');
  
    $('.tab-content > div').not(target).hide();
    
    $(target).fadeIn(600);
    
});


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
        if(response.status == 401){
            swal({ title: "Sorry", text: "Please Log In to continue", icon: "info" }).then(function(){
                window.location.replace('signup.html');
                });
            }
        if (response.status == 201){
            response.json().then(data => {
                swal(
                    { title: "Success!!!", 
                    text: "Question Successfuly Posted", 
                    icon: "successs" }).then(function(){
                        window.location.replace("myquestions.html");
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
                swal(
                    { title: "Sorry", 
                    text: (data[key]), 
                    icon: "info" })
            });
        }
        else{
            //failed
            response.json().then(data => 
                swal(
                    { title: "Failed", 
                    text: data, 
                    icon: "info" }),
            )}
            }).catch(err => console.log(err));
            function example(data){
                swal(
                    { title: "Failed", 
                    text: data, 
                    icon: "info" });
            }
        return false;
    }
});