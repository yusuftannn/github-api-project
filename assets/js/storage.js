class Storage {

    static getSearchedUsersFromStorage() {
        // Tüm kullanıcıları al
        let users = JSON.parse(localStorage.getItem("searched"));
        if (users === null) return []; {
            return users;
        }
    }
    static addSearchedUserToStorage(username) {
        // Kullanıcı ekle
        let users = this.getSearchedUsersFromStorage()
        // IndexOf
        if (users.indexOf(username) === -1) {
            users.push(username);
            localStorage.setItem("searched", JSON.stringify(users));
        }
    }
    static clearAllSearchedUsersFromStorage() {
        // Tüm arama sonuçlarını temizle
        localStorage.removeItem("searched")
    }
}