"use strict";
// const users = document.getElementById('users-table') as HTMLDivElement;
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// interface User {
//   fullName: string,
//   email: string,
//   password: string,
//   role: string
// }
// const projectUrl: string = 'http://localhost:5000/users';
// async function fetchUsers(url: string) {
//   try {
//     const data = await fetch(url);
//     if (!data.ok) {
//       throw new Error(`Request failed with status: ${data.status}`);
//     }
//     const response: User[] = await data.json();
//     return response;
//   } catch (error) {
//     console.error('Error fetching Users:', error);
//     throw error; 
//   }
// }
// function displayUsers(usersArray: User[]) {
//   usersArray.forEach((user: User) => {
//     users.innerHTML += `
//       <div class="tabler-user">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Department</th>
//             <th>Role</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>${user.fullName}</td>
//             <td>IT</td>
//             <td>${user.role}</td>
//             <td>Inactive</td>
//           </tr>
//         </tbody>
//       </div>
//     `;
//   });
// }
// fetchUsers(projectUrl)
//   .then((response) => {
//     displayUsers(response);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });
const users = document.getElementById('users-table');
const projectUrl = 'http://localhost:5000/users';
function fetchUsers(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield fetch(url);
            if (!data.ok) {
                throw new Error(`Request failed with status: ${data.status}`);
            }
            const response = yield data.json();
            console.log(response);
            return response;
        }
        catch (error) {
            console.error('Error fetching Users:', error);
            throw error;
        }
    });
}
function displayUsers(usersArray) {
    usersArray.forEach((user) => {
        users.innerHTML += `
    <tbody>
    <tr>
      <td>${user.fullName}</td>
      <td>${user.role}</td>
      <td>Inactive</td>
    </tr>
  </tbody>
    `;
    });
}
fetchUsers(projectUrl)
    .then((response) => {
    displayUsers(response);
})
    .catch((error) => {
    console.error('Error:', error);
});
