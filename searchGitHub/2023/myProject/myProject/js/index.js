let input = document.querySelector(".header__input")
let button = document.querySelector(".header__button")
let blockDiv = document.querySelector(".post")
let headerP = document.querySelector(".header_p")
let headerNone = document.querySelector(".header_none")

button.addEventListener('click', () => {
    blockDiv.innerHTML = ''
    if(input.value.length < 3 && input.value.length !== 0) {
        headerP.style.display = 'block'
        headerNone.style.display = "none"
    } else {
        headerP.style.display = 'none'
        search()
    }
})

function search() {
   //Получение данных
    const requestURL = `https://api.github.com/search/repositories?q=${input.value}+in:name&sort=stars&order=desc&per_page=10`

    function sendRequest(methods, url) {
    return fetch(url).then(response => {
        return response.json()
    })
    }

    sendRequest('GET', requestURL)
    .then(data => {
        if(data.items.length > 1) {
            headerNone.style.display = "none"

            for(let i = 0; i < data.items.length; i++) {
                //Блок для постов
                let divPost = document.createElement('div')
                divPost.className = 'blockDiv'
                blockDiv.appendChild(divPost)

                //Название ссылка
                let hrefsName = document.createElement('a')
                hrefsName.href = data.items[i].html_url
                hrefsName.setAttribute('target', '_blank')
                hrefsName.textContent = data.items[i].name
                hrefsName.className = 'hrefsName'
                divPost.appendChild(hrefsName)

                //Абзац с логином
                let logins = document.createElement('p')
                logins.className = 'logins'
                logins.textContent = 'Login: ' + data.items[i].owner.login
                divPost.appendChild(logins)

                //Абзац с приватностью
                let private = document.createElement('p')
                private.className = 'logins'
                private.textContent = 'Private: ' + data.items[i].private
                divPost.appendChild(private)

                //Ссылка на профиль
                let hrefsProfile = document.createElement('a')
                hrefsProfile.href = data.items[i].owner.html_url
                hrefsProfile.setAttribute('target', '_blank')
                hrefsProfile.textContent = 'Profiles: ' + data.items[i].owner.login
                hrefsProfile.className = 'hrefsProfile'
                divPost.appendChild(hrefsProfile)

                //Линия
                let border = document.createElement('hr')
                border.className = 'border'
                divPost.appendChild(border)
            }
        } else {
            headerNone.style.display = "block"
        }
    })
    .catch(err => console.log(err))
}