const projects = document.getElementById('project') as HTMLDivElement;


interface Project {
  description: string;
  project_name: string;
  endDate: string;
}


const url: string = 'http://localhost:5000/project/763e48ed-5dbc-4401-b05d-3527828a1c61/';

async function fetchProjects(url: string) {
  try {
    const data = await fetch(url);
    console.log(data);
    
    if (!data.ok) {
      throw new Error(`Request failed with status: ${data.status}`);
    }
    const response: Project[] = await data.json();
    // console.log(response);
    
    return response;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error; 
  }
}

function displayProjects(notesArray: Project[]) {
    console.log(notesArray)
  notesArray.forEach((project: Project) => {
    projects.innerHTML += `
    <div class="card-item">
        
    <h3 class="developer">${project.project_name}</h3>
    <h5>${project.description}.</h5>
    <h4>${project.endDate}</h4>
    
   <div class="buttons">
   <div class="arrow">
  

     
   </div>
    <div>
    <div class="btn-group">
    <button type="button" class=" btn btn-primary assign-button" >Complete</button>
   
     </div>
    </div>
   </div>
  </div>
    `;
  });
}

fetchProjects(url)
  .then((response) => {
    displayProjects(response);
  })
  .catch((error) => {
    console.log(error);
    
  });

 
