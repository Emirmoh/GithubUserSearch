const ROOT = "https://api.github.com/users/";

const form = document.getElementById("form");
const search = document.getElementById("search");
const button = document.getElementById("button");

const main = document.querySelector("main");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const usr = search.value;
  if (usr) {
    getUser(usr);
    getRepos(usr);
    search.value = "";
  }
});

async function getUser(userName) {
  try {
    const { data } = await axios(ROOT + userName);
    console.log(data);
    main.innerHTML = `
        <div class="card">
            <div>
            <img
                class="avatar"
                src="${data.avatar_url}"
                alt=""
            />
            </div>
            <div class="user-info">
            <h2>${data.name ? data.name : "No name !"}</h2>
            <p>
                ${data.bio ? data.bio : "No Bio !"}
            </p>
            <ul>
                <li>${data.followers} <strong>Followers</strong></li>
                <li>${data.following} <strong>Folllowing</strong></li>
                <li>${data.public_repos} <strong>Repos</strong></li>
            </ul>
            <div id="repos">
            </div>
            </div>
        </div>
        `;
  } catch (error) {
    main.innerHTML = `
     <div class="card">
        <h1>No profile with that username</h1>
     </div>
    `;
  }
}
async function getRepos(userName) {
  const { data } = await axios(ROOT + userName + "/repos?sort=created");
  console.log(data);
  const reposEl = document.getElementById("repos");
  data.slice(0, 10).forEach((repo) => {
    const repoEl = document.createElement("a");
    repoEl.href = `${repo.html_url}`;
    repoEl.target = "_blank";
    repoEl.innerText = `${repo.name}`;
    repoEl.classList.add("repo");
    reposEl.appendChild(repoEl);
  });
}

button.addEventListener("click", () => {
  Submit(form);
});
