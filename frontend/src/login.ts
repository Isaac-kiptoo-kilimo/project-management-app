
let loginEmail = document.getElementById('Email') as HTMLInputElement;
let loginPassword = document.getElementById('Password') as HTMLInputElement;

let loginForm = document.querySelector('#login-form') as HTMLFormElement;
let email_error = document.getElementById('email-error') as HTMLSpanElement;
let password_error = document.getElementById('password-error') as HTMLSpanElement;

console.log(loginForm);


loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    let email=loginEmail.value;
    let password=loginPassword.value;

    console.log(email)

    if(!email){
        email_error.textContent = 'Email address is required'

        setTimeout(() => {
             email_error.textContent = ''
        }, 3000);
    }

    if(!password){
        password_error.textContent = 'Password is required'

         setTimeout(() => {
             password_error.textContent = ''
         }, 3000);
    }

    if(password && email){
        const promise2 = new Promise<{error?:String, message?:string, token?:string}>((resolve, reject)=>{
            fetch('http://localhost:5000/users/login',{
                headers:{
                    'Accept': 'application/json',
                    'Content-type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    "email": email,
                    "password": password
                })
            }).then(res=>res.json()).then(data=>{
                console.log(data);

                localStorage.setItem('token', data.token)

                redirect()

                resolve(data)
                
            }).catch(error=>{
                console.log(error);

                reject(error)
                
            })
        })

        function redirect(){
            const token = localStorage.getItem('token') as string

            new Promise <{info:{
                user_id?:string, role?:string, name?:string, email?:string
            }}>((resolve, reject)=>{
                fetch('http://localhost:5000/users/checkUserDetails', {
                    headers:{
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                        'token': token
                    },
                    method: "GET"
                }).then(res =>{
                    
                    

                    resolve(res.json())
                }).catch(error=>{
                    reject(error)
                })
            }).then(data=>{

                console.log(data['info']);
                

                if(data['info'].role === 'user'){
                    localStorage.setItem('email', data['info'].email!)
                    location.href = 'user.html'
                }else if(data['info'].role === 'admin'){
                    localStorage.setItem('email', data['info'].email!)
                    location.href = 'admin.html'
                }
            })
        }
    }
    
})
