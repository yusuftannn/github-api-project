// Elements
const githubForm = document.getElementById("github-form"),
  nameInput = document.getElementById("githubname"),
  clearLastUsers = document.getElementById("clear-last-users"),
  lastUsers = document.getElementById("last-users");

const github = new Github()
const ui = new UI()

evenListeners()
// Events
function evenListeners() {
  githubForm.addEventListener("submit", getData)
  clearLastUsers.addEventListener("click", clearAllSearched)
  document.addEventListener("DOMContentLoaded", getAllSearched)
}

function getData(e) {
  let username = nameInput.value.trim()

  if (username === "") {
    alert("Lütfen geçerli bir kullanıcı adı girin.")
  } else {
    github.getGithubData(username)
      .then(response => {
        if (response.user.message === "Not Found") {
          // Alert
          ui.showError("Kullanıcı Bulunamadı")
        } else {
          ui.addSearchedUserToUI(username)
          Storage.addSearchedUserToStorage(username)
          ui.showUserInfo(response.user)
          ui.showRepoInfo(response.repo)
        }
      })
      .catch(err => ui.showError(err))
  }
  ui.clearInput() // Input temizleme
  e.preventDefault()
}
// Tüm aranları temizle
function clearAllSearched() {
  if (confirm("Son aramaları temizlemek istiyor musunuz?")) {
    Storage.clearAllSearchedUsersFromStorage()  // Storagedan temizleme
    ui.clearAllSearchedFromUI()
  }
}
// Arananları Storagedan al UI'ya ekle
function getAllSearched() {
  let users = Storage.getSearchedUsersFromStorage()
  let result = ""
  users.forEach(user => {
    // <li class="list-group-item">test</li>
    result += `<li class="list-group-item">${user}</li>`

  })
  lastUsers.innerHTML = result
}