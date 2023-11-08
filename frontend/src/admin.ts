document.addEventListener("DOMContentLoaded", () => {
  const notes = document.getElementById('notes') as HTMLDivElement;
  const project_name = document.getElementById('name') as HTMLInputElement
  const project_description = document.getElementById('description') as HTMLInputElement
  const project_endDate = document.getElementById('endDate') as HTMLInputElement
  const create_form = document.getElementById('create-note-form') as HTMLFormElement
  const btnCreate=document.querySelector('#btn-create') as HTMLDivElement
  const noteCard=document.querySelector('#addNotecard') as HTMLDivElement;
  const btnClose=document.querySelector('#note-close') as HTMLElement;
  
  interface Note {
    description: string;
    project_name: string;
    endDate: string;
  }
  
  
    btnCreate.addEventListener('click',()=>{
      noteCard.classList.add('card-note-active');
    });
    
    btnClose.addEventListener('click',()=>{
      noteCard.classList.remove('card-note-active');
    });
  
  const url_: string = 'http://localhost:5000/project/';
  
  async function fetchNotes(url: string) {
    try {
      const data = await fetch(url);
      console.log(data);
      
      if (!data.ok) {
        throw new Error(`Request failed with status: ${data.status}`);
      }
      const response: Note[] = await data.json();
      // console.log(response);
      
      return response;
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw error; 
    }
  }
  
  
  // document.addEventListener('click', (event) => {
  //   if (event.target && event.target.classList.contains('assign-button')) {
  //     const projectId = event.target.getAttribute('data-project-id');
  //     const selectedUserId = event.target.getAttribute('data-user-id');
  //     if (projectId && selectedUserId) {
      
  //       assignProject(projectId, selectedUserId);
  //     }
  //   }
  // });
  
  
  function displayNotes(notesArray: Note[]) {
      console.log(notesArray)
    notesArray.forEach((note: Note) => {
      notes.innerHTML += `
        <div class="card-item">
        
          <h3 class="developer">${note.project_name}</h3>
          <h5>${note.description}.</h5>
          <h4>${note.endDate}</h4>
          
         <div class="buttons">
         <div class="arrow">
        
         
         <i class="fa-solid fa-trash-can fa-xl" data-project-id="1" style="color: #e0421a;"></i>
           
         </div>
          <div>
          <div class="btn-group">
          <button type="button" class=" btn btn-primary assign-button" >Assign</button>
         
           </div>
          </div>
         </div>
        </div>
      `;
    });
  }
  
  fetchNotes(url_)
    .then((response) => {
      displayNotes(response);
    })
    .catch((error) => {
      console.log(error);
      
    });
  
   
    create_form.addEventListener('submit', (event)=>{
        event.preventDefault()
        let name=project_name.value;
        let description=project_description.value
        let endDate=project_endDate.value
       
    
        let newValue = name.trim() != '' && description.trim() != '' && endDate.trim() != ''
        if(newValue){
    
                const promise = new Promise <{error:string, message:string}> ((resolve, reject)=>{
                    fetch('http://localhost:5000/project/', {
                        headers:{
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        },
                        method: "POST",
                        body: JSON.stringify({
                            "project_name": name,
                            "description": description,
                            "endDate": endDate
                         
                        })
                    }).then((res=>res.json())).then(data=>{
                        console.log(data);
                        createdNote()
                        resolve(data) 
                    }).catch(error=>{
                        console.log(error);
                    })
                })
    
                function createdNote(){
                    location.href = 'admin.html'
                }
             
            
        }
    })
  
    notes.addEventListener('click', (event) => {
      if (event.target && event.target instanceof HTMLElement && event.target.classList.contains('delete')) {
        const projectId = event.target.getAttribute('data-project-id');
        if (projectId) {
          deleteProject(projectId, event.target);
        }
      }
    });
    
   
    function deleteProject(project_id: string, deleteButton: HTMLElement) {
      fetch(`http://localhost:5000/project/${project_id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
          }
          
          if (deleteButton) {
            const closestCardItem = deleteButton.closest('.card-item');
            if (closestCardItem) {
              closestCardItem.remove();
            }
          }
        })
        .catch((error) => {
          console.error('Error deleting project:', error);
        });
    }
    
  
    // function assignProject(project_id: any, user_id: any) {
    //   const url = `http://localhost:5000/assignProject?project_id=${project_id}&user_id=${user_id}`;
    //   fetch(url, {
    //     method: 'POST',
    //   })
    //     .then((response) => {
    //       if (!response.ok) {
    //         throw new Error(`Assignment failed with status: ${response.status}`);
    //       }
    //       // Handle the success response
    //       console.log('Assignment successful');
    //     })
    //     .catch((error) => {
    //       console.error('Error assigning project:', error);
    //     });
    // }
    
  
    const assignProject = async (project_id: string, user_id: string) => {
      try {
          const response = await fetch('http://localhost:5000/assignProject', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ project_id, user_id }),
          });
  
          if (response.status === 200) {
              console.log('Project assigned successfully');
          } else if (response.status === 400) {
              console.log('Project assignment failed');
          } else {
              console.error('Failed to assign the project');
          }
      } catch (error) {
          console.error('Error assigning the project:', error);
      }
  };
  
  // Example usage when an admin assigns a project to a user
  assignProject('project_id_here', 'user_id_here');
  
  
  const dropDownUsers=document.getElementById('drop-down-users') as HTMLElement
  
  interface User {
    fullName: string,
    email: string,
    password: string,
    role: string
  }
  
  const projectUrl_: string = 'http://localhost:5000/users';
  
  async function fetchAllUsers(url: string) {
    try {
      const data = await fetch(url);
  
      if (!data.ok) {
        throw new Error(`Request failed with status: ${data.status}`);
      }
  
      const response: User[] = await data.json();
      console.log(response)
      return response;
    } catch (error) {
      console.error('Error fetching Users:', error);
      throw error; 
    }
  }
  
  
  function displayAllUsers(usersArray: User[]) {
    usersArray.forEach((user: User) => {
      dropDownUsers.innerHTML += `
      <li><a class="dropdown-item" href="#">${user.fullName}</a></li>
      `;
    });
  }
  
  
  
  fetchAllUsers(projectUrl_)
    .then((response) => {
      displayAllUsers(response);
    })
    .catch((error) => {
      console.error( error);
    });
  
});






