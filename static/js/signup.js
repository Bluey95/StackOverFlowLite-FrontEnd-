$(window).on('load', function(){
    $('.loader').delay(1200).fadeOut('slow');
  });
  

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
    const button = document.getElementById("submit");
    button.onclick = function myFunction(){
        const Username = document.getElementById("Username").value;
        const Email = document.getElementById("Email").value;
        const Password = document.getElementById("Password").value;
        const Confirmpass = document.getElementById("ConfirmPassword").value;

        window.Username = Username;
        window.Email = Email;
        window.Password = Password;
        window.Confirmpass = Confirmpass;
    
        p = {
            username:Username,
            email:Email,
            password:Password,
            confirmpass:Confirmpass
        }
        
        fetch('https://stackoverflowlitev3.herokuapp.com/api/v2/auth/registration', {
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
                swal(
                    { title: "Success!!", 
                      text: data.message, 
                      icon: "success" }).then(function(){
                        $("#signup").hide();
                        $("#login").show();
                      })
            });
        }else if (response.status == 400 || response.status == 422){
            response.json().then(data => { 
                try {
                    swal(
                        { title: "Sorry", 
                        text: data.message, 
                        icon: "info" });
                } catch (error) {
                    console.log(error);
                }
            });
        }
        else{
            //failed
            response.json().then(data => 
                swal(
                    { title: "Failed", 
                    text: data.message, 
                    icon: "info" }),
            )}
            }).catch(err => console.log(err));
            function example(data){
                swal(
                    { title: "Failed", 
                    text: data.message, 
                    icon: "info" });
        }
        return false;
    }
    window.button = button;
    window.button.onclick = button.onclick;

    const signinButton = document.getElementById("signinSubmit");
    signinButton.onclick = function myFunction(){
        const LoginUsername = document.getElementById("LoginUsername").value;
        const LoginPassword = document.getElementById("LoginPassword").value;

        window.LoginUsername = LoginUsername;
        window.LoginPassword = LoginPassword;
    
        p = {
            "username":LoginUsername,
            "password":LoginPassword
        }

        console.log(p)

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
                console.log(data)
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
}) 



