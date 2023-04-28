//* a variable APIURL to easy the use
const APIURL = "https://api.github.com/users/";

//* call the DOM objects
const form = document.querySelector(".form");
const search = document.querySelector(".searchinput");
const profile = document.querySelector("#section2");

//* add events
form.addEventListener("keyup", submitFn);
// form.addEventListener("submit", submitFn);

//* a function that fires the search process for non empty username
function submitFn(e) {
  e.preventDefault();
  const user = search.value;
  if (user) {
    getUser(user);
  }
}

//* a function to get a user from API Github
async function getUser(username) {
  try {
    //we need only object data "{ data }" from REST API response using axios which return data already stringified
    const { data } = await axios(APIURL + username);
    createUserProfile(data);
    getRepositories(username);
    console.log(data);
  } catch (error) {
    //to handle only the not found error
    if (error.response.status === 404) {
      showError(`This profile doesn't exist. check another username`);
    }
  }
}

//* A function to create and display a user profil. version 1
// function createUserProfile(user) {
//   const userProfileFromHTML = `<div class="profil-info">
//           <div class="div-image">
//             <img
//               src="${user.avatar_url}"
//               alt="${user.name}"
//               class="avatar2"
//             />
//           </div>
//           <div class="user-profil-info">
//             <h2>${user.name}</h2>
//             <p style:"line-height: 1.2rem ;">
//               ${user.bio}
//             </p>

//             <div class="info-followers-repos">
//               <p>${user.followers}<strong> Followers</strong></p>
//               <p>${user.following}<strong> Following</strong></p>
//               <p>${user.public_repos}<strong> Repos</strong></p>
//             </div>
//               <div class="div-for-repos"></div>
//           </div>
//         </div>`;

//   profile.innerHTML = userProfileFromHTML;
// }

//* A function to create and display a user profil. version 2
function createUserProfile(user) {
  const userProfileFromHTML = `<div class="profil-info">
          <div class="div-image">
            <img
              src="${user.avatar_url}"
              alt="${user.name}"
              class="avatar2"
            />
          </div>
          <div class="user-profil-info">
            <h2>${user.name}</h2>
            <p style:"line-height: 1.2rem ;">
              ${user.bio}
            </p>

            <div class="info-followers-repos">
              <p>${user.followers}<strong> Followers</strong></p>
              <p>${user.following}<strong> Following</strong></p>
              <p>${user.public_repos}<strong> Repos</strong></p>
            </div>
          </div>
        </div> `;

  profile.innerHTML = userProfileFromHTML;
}

//* function to handle errors
function showError(msg) {
  const noSuchProfile = `<div class = "profil-info"><h1>${msg}</h1></div>`;
  profile.innerHTML = noSuchProfile;
}

//* function to get repository(ies) of the hint username
async function getRepositories(username) {
  try {
    const { data } = await axios(APIURL + username + "/repos");
    console.log(data);
    addReposToUserProfile(data);
  } catch (err) {
    showError("Error fetching repositories of the hint username");
  }
}

//* Function to add repos to the user profile after getting (it)them. version 1
// function addReposToUserProfile(repos) {
//   const reposContainer = document.querySelector(".div-for-repos");

//   repos.forEach((repo) => {
//     const repoItem = document.createElement("a");
//     repoItem.className = "repos-link";
//     repoItem.href = repo.html_url;
//     repoItem.target = "_blank";
//     repoItem.textContent = repo.name;
//     repoItem.style.color = "blue";

//     reposContainer.appendChild(repoItem);
//   });
// }

//* Function to add repos to the user profile after getting (it)them. customize version 2
function addReposToUserProfile(repos) {
  repos.forEach((repo) => {
    const reposContainer = document.createElement("div");
    reposContainer.className = "div-for-repos";

    const repoName = document.createElement("h4");
    repoName.className = "repo-name";
    repoName.textContent = repo.name;

    const repoDescription = document.createElement("p");
    repoDescription.className = "repo-description";
    repoDescription.textContent = repo.description;

    const spanContainer = document.createElement("p");
    repoDescription.className = "repo-description";
    repoDescription.textContent = "☆ ";

    const repoStarsCount = document.createElement("span");
    repoStarsCount.className = "stars";
    repoStarsCount.textContent = repo.stargazers_count;

    const StarName = document.createElement("span");
    StarName.textContent = "stars";

    const repoUrl = document.createElement("p");
    repoUrl.className = "repo-url";
    repoUrl.textContent = repo.html_url;
    repoUrl.target = "_blank";

    const repoReadme = document.createElement("p");
    repoReadme.className = "view-readme";

    const linkToReadme = document.createElement("a");
    linkToReadme.setAttribute("href", repo.download_url);
    linkToReadme.textContent = "View Readme";
    repoUrl.target = "_blank";

    repoReadme.appendChild(linkToReadme);

    spanContainer.appendChild(repoStarsCount);
    spanContainer.appendChild(StarName);

    reposContainer.appendChild(repoName);
    reposContainer.appendChild(repoDescription);
    reposContainer.appendChild(spanContainer);
    reposContainer.appendChild(repoUrl);
    reposContainer.appendChild(repoReadme);

    profile.appendChild(reposContainer);
  });
}
