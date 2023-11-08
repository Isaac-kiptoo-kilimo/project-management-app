// const users = document.getElementById('users-table') as HTMLDivElement;

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



  const users = document.getElementById('users-table') as HTMLDivElement;

interface User {
  fullName: string,
  email: string,
  password: string,
  role: string
}

const projectUrl: string = 'http://localhost:5000/users';

async function fetchUsers(url: string) {
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


function displayUsers(usersArray: User[]) {
  usersArray.forEach((user: User) => {
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
