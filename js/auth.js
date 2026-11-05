function login() {

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    const errorMessage =
        document.getElementById("errorMessage");

    const user = users.find(function (u) {
        return (
            u.username === username &&
            u.password === password
        );
    });

    if (user) {

        localStorage.setItem(
            "currentUser",
            JSON.stringify(user)
        );

        window.location.href = "dashboard.html";

    } else {

        errorMessage.innerText =
            "Username หรือ Password ไม่ถูกต้อง";

    }
}