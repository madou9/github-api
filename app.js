const input = document.getElementById('input');
const submit = document.getElementById('submit');
const searching = document.getElementById('searching');
const url = 'https://api.github.com/users/';

function search(username) {
    fetch(`${url}${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('User not found');
            }
            return response.json();
            
        })
        .then(user => {
            console.log('User Data:', user);
            fetch(`${url}${username}/repos`)
                .then(response => response.json())
                .then(repos => {
                    console.log('Repositories:', repos);
                    displayUserData(user, repos);
                });
        })
        .catch(error => {
            alert('User not found.');
        });
        console.log(fetch(`${url}${username}/repos`));
}


function displayUserData(user, repos) {
    const repositories = repos.map(repo => `<li><a href="${repo.html_url}">${repo.name}</a></li>`).join('');
    searching.innerHTML = `
        <div class="container">
            <div class="row">
                <div class="col s3 offset-s1"><img src="${user.avatar_url}" class="responsive-img image" alt="profile"></div>
                <div class="col s3">
                    <p>
                        <strong>Name:</strong> ${user.login} <br><br> 
                        <strong>Github:</strong> <a href="${user.html_url} target="_blank""> Profile_Link </a> <br><br> 
                        <strong>Public Repos:</strong> <span>${user.public_repos}</span>
                    </p> 
                </div> 
                <div class="col s3 center">
                    <a class=' dropdown btn' href='#' data-target='dropdown1'>Repositories</a>
                    <ul class='content-drop '>${repositories}</ul>
                </div>
            </div>
        </div>`;
}

submit.addEventListener('click', function (e) {
    e.preventDefault();
    const username = input.value.trim();
    if (username !== '') {
        search(username);
    }
});

// Event listener for showing repositories when clicked
searching.addEventListener('click', e => {
    e.preventDefault();
    if (e.target.classList.contains('dropdown')) {
        e.target.nextElementSibling.classList.toggle('activeUrl');
    }
});
