
document.addEventListener("DOMContentLoaded", () => {
    const reposList = document.getElementById('repos-list');
    const searchForm = document.getElementById('github-form');
    const userList = document.getElementById('user-list');
    
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const userSearch = e.target.search.value;

        fetch(`https://api.github.com/search/users?q=${userSearch}`, {
            method: 'Get',
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/vnd.github.v3+json'
            }
        })
            .then(resp => resp.json())
            .then(users => renderSearch(users));
    })


    function renderSearch(users) {
        users.items.map (user => {
            const div = document.createElement("div");
            userList.appendChild(div);
            div.id = "usercontainer";

            const divImg = document.createElement("div");
            div.appendChild(divImg);
            divImg.id = "imgcontainer";

            const divLogin = document.createElement("div");
            div.appendChild(divLogin);
            divLogin.id = "logincontainer";
            divLogin.addEventListener("click", () => {
                renderRepos(user);
            });

            const li = document.createElement("li");
            divLogin.appendChild(li);
            li.id = "userlogin";

            const font = document.createElement("font");
            font.textContent = user.login;
            li.appendChild(font);

            const a = document.createElement("a");
            divImg.appendChild(a);
            a.href = user.html_url;   
            a.target = "blank";     

            const img = document.createElement("img");
            a.appendChild(img) 
            img.src = user.avatar_url;
        });
    };

    function renderRepos(user) {
        fetch(`https://api.github.com/users/${user.login}/repos`)
            .then( resp => resp.json() )
            .then( repos => repoHelper(repos) );
    };

    function repoHelper(repos) {
        reposList.innerText = ""
            repos.forEach( (repo)=> { 
                reposList.style.background = "rgba(135, 207, 235, 0.514)";
                const li = document.createElement("li");
                reposList.appendChild(li);
                const a = document.createElement("a");
                li.appendChild(a);
                a.href = repo.html_url;
                a.textContent = repo.full_name;
            });
    }
});
