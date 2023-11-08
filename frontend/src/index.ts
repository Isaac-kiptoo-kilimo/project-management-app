const allProjects = document.getElementById('all-projects') as HTMLDivElement;

interface Project {
    description: string;
    project_name: string;
    endDate: string;
  }
  
const url_: string = 'http://localhost:5000/project/';
  
async function fetchAllProjects(url: string) {
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


// document.addEventListener('click', (event) => {
//   if (event.target && event.target.classList.contains('assign-button')) {
//     const projectId = event.target.getAttribute('data-project-id');
//     const selectedUserId = event.target.getAttribute('data-user-id');
//     if (projectId && selectedUserId) {
    
//       assignProject(projectId, selectedUserId);
//     }
//   }
// });


function displayAllProjects(projectsArray: Project[]) {
    console.log(projectsArray)
  projectsArray.forEach((project: Project) => {
    allProjects.innerHTML += `
      <div class="card-item">
      
        <h3 class="developer text-uppercase text-secondary">${project.project_name}</h3>
        <h5>${project.description}.</h5>
        <h4>${project.endDate}</h4>
        
       
      </div>
    `;
  });
}

fetchAllProjects(url_)
  .then((response) => {
    displayAllProjects(response);
  })
  .catch((error) => {
    console.log(error);
    
  });