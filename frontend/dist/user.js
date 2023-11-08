"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const projects = document.getElementById('project');
const url = 'http://localhost:5000/project/763e48ed-5dbc-4401-b05d-3527828a1c61/';
function fetchProjects(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield fetch(url);
            console.log(data);
            if (!data.ok) {
                throw new Error(`Request failed with status: ${data.status}`);
            }
            const response = yield data.json();
            // console.log(response);
            return response;
        }
        catch (error) {
            console.error('Error fetching projects:', error);
            throw error;
        }
    });
}
function displayProjects(notesArray) {
    console.log(notesArray);
    notesArray.forEach((project) => {
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
