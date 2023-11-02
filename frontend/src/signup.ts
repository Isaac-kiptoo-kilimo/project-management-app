const signup_form=document.getElementById('signup-form') as HTMLFormElement
const full_name=document.getElementById('FullName') as HTMLInputElement
const signup_email=document.getElementById('Email') as HTMLInputElement
const signup_password=document.getElementById('Password') as HTMLInputElement
const confirm_password=document.getElementById('Confirm-password') as HTMLInputElement


signup_form.addEventListener('submit',(e)=>{
    e.preventDefault();

    let fullName=full_name.value;
    let email=signup_email.value;
    let password=signup_password.value;
    let confirmPassword=confirm_password.value;
  
    let trimmedValues=fullName.trim()!='' && email.trim()!='' && password.trim()!='' && confirmPassword!='';

    if(trimmedValues){
        if(password==confirmPassword){
            const promise = new Promise <{error:string, message:string}> ((resolve, reject)=>{
                fetch('http://localhost:5000/users/register', {
                    headers:{
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({
                        "fullName": fullName,
                        "email": email,
                        "password": password
                    })
                }).then((res=>res.json())).then(data=>{
                    console.log(data);
                    loggedIn()
                    resolve(data) 
                }).catch(error=>{
                    console.log(error);
                })
            })

            function loggedIn(){
                location.href = 'login.html'
            }
         
        }else{
            return "password do not match"
        }
    }

    
})