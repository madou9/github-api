const input = document.getElementById('input');
const submit = document.getElementById('submit');
const searching = document.getElementById('searching');
var name = "node";
const url1 = 'https://api.github.com/users/'

function search(name) {
    fetch(`${url1}${name}`)
        .then(response => response.json())
        .then(respons => {

        const url = `https://api.github.com/users/${name}/repos`;
        fetch(`${url}`).then(response => response.json()).then(data => {
            searching.innerHTML += `
            <div class="container">
            <div class="row">
                <div class="col s3 offset-s1"><img src="${respons.avatar_url}" class="responsive-img image" alt="profil"></div>
                
                <div class="col s3">
                    <p>
                    <strong>Name:</strong> ${respons.login} <br><br> 
                    <strong>Github:</strong> <a href="${respons.html_url}"> Link </a> <br><br> 
                    <strong>Public Repos:</strong> <span>${respons.public_repos}</span>
                    </p> 
                </div> 
                <div class="col s3 center">
                <a class='dropdown btn' href='#' data-target='dropdown1'>Repositorie</a>
        
                <!-- Dropdown Structure -->
                <ul class='content-drop'>${urlAllRepos(data)}</ul>
            </div>
                </div>
            </div>
        `;
        })
    })
}

function urlAllRepos(repos){
    let mesRepo;
    for (let i = 0; i < repos.length; i++) {
        mesRepo += `<li><a href="${repos[i].html_url}">${repos[i].name}</a> <br/></li> `
    }
    // debut de chaine indefined pour supprimer
    return mesRepo.replace("undefined","");
}



submit.addEventListener('click', function (e) {
    e.preventDefault()
    userGithub = input.value
    input.value = ''
    search(userGithub)
})


// pour pourvoir afficher les ripos quand on click
searching.addEventListener('click', e=> {
    e.preventDefault();
    if(e.target.classList.contains('dropdown')){
        e.target.nextElementSibling.classList.toggle('activeUrl');
    }
})