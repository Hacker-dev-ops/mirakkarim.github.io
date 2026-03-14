
document.addEventListener('DOMContentLoaded', () => {
    const loginBtn = document.getElementById('google-login');
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider)
                .then(result => {
                    const user = result.user;
                    localStorage.setItem('userName', user.displayName);
                    localStorage.setItem('userEmail', user.email);
                    alert(`Вы вошли как ${user.displayName}`);
                })
                .catch(console.error);
        });
    }

    const userInfo = document.getElementById('user-info');
    if (userInfo) {
        const name = localStorage.getItem('userName');
        const email = localStorage.getItem('userEmail');
        if(name) userInfo.innerHTML = `<p>Имя: ${name}</p><p>Email: ${email}</p>`;
        else userInfo.innerHTML = `<p>Вы не вошли</p>`;
    }
});

function checkAdminPassword(){
    const pass = document.getElementById('admin-password').value;
    if(pass === "06122015K.@"){
        document.getElementById('admin-panel').style.display = "block";
        loadPages();
    } else {
        alert("Неверный пароль!");
    }
}

function addPage(){
    const title = document.getElementById('new-page-title').value;
    const content = document.getElementById('new-page-content').value;
    if(title && content){
        let pages = JSON.parse(localStorage.getItem('pages') || '[]');
        pages.push({title, content});
        localStorage.setItem('pages', JSON.stringify(pages));
        loadPages();
        alert("Страница добавлена!");
    }
}

function loadPages(){
    const pagesDiv = document.getElementById('pages-list');
    const pages = JSON.parse(localStorage.getItem('pages') || '[]');
    pagesDiv.innerHTML = "";
    pages.forEach((p,i) => {
        const div = document.createElement('div');
        div.innerHTML = `<h3>${p.title}</h3><p>${p.content}</p>`;
        pagesDiv.appendChild(div);
    });
}
