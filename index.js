
//* a variable APIURL to easy the use
const APIURL = "https://api.github.com/users/";

//* call the 
const form = document.querySelector(".form");
const search = document.querySelector(".searchinput");
const profile = document.querySelector("#section2");

// add events
form.addEventListener("keyup", submitFn);
// form.addEventListener("submit", submitFn);

// a function to launch fire the search process for non empty username
function submitFn(e) {
  e.preventDefault();
  const user = search.value;
  if (user) {
    getUser(user);
  }
}

// a function to get a user from API Github
async function getUser(username) {
  try {
    // need only object data "{ data }" from REST API response using axios which return data already stringified
    const { data } = await axios(APIURL + username);
    createUserProfile(data);
    getRepositories(username);
    console.log(data);
  } catch (error) {
    //to handle only the not found error
    if (error.response.status === 404){
       showError(`This profile doesn't exist. check another username`);
    }
  }
}

//a function to create a user profil
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
            <p>
              ${user.bio}
            </p>

            <div class="info-followers-repos">
              <p>${user.followers}<strong> Followers</strong></p>
              <p>${user.following}<strong> Following</strong></p>
              <p>${user.public_repos}<strong> Repos</strong></p>
            </div>
            <div class="div-for-repos"></div>
          </div>
        </div>`;

  profile.innerHTML = userProfileFromHTML;
}


// function to handle errors
function showError(msg) {
  const noSuchProfile = `<div class = "profil-info"><h1>${msg}</h1></div>`;
profile.innerHTML = noSuchProfile;
}

//function to get repositories of the hint username
async function getRepositories(username) {
  try {
    const {data} = await axios(APIURL + username+ '/repos');
    addReposToUserProfile(data);
  }catch (err) {
   showError('Error fetching repositories of the hint username');
  }
}

function addReposToUserProfile (repos) {
  const reposContainer = document.querySelector(".div-for-repos");

  repos.forEach(repo => {
    const repoItem = document.createElement('a');
    repoItem.className = "repos-link";
    repoItem.href = repo.html_url;
    repoItem.target = "_blank";
    repoItem.textContent = repo.name;
    repoItem.style.color = "blue";

    reposContainer.appendChild(repoItem);
  });
};






