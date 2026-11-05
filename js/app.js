const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
);

if (!currentUser) {
    window.location.href = "index.html";
}


document.addEventListener(
    "DOMContentLoaded",
    function () {

        showCurrentUser();

        applyRolePermissions();

    }
);


function showCurrentUser() {

    const userName =
        document.getElementById("userName");

    const userRole =
        document.getElementById("userRole");

    const welcomeName =
        document.getElementById("welcomeName");


    if (userName) {
        userName.innerText =
            currentUser.name;
    }


    if (welcomeName) {
        welcomeName.innerText =
            currentUser.name;
    }


    if (userRole) {

        let roleName = "";

        if (
            currentUser.role ===
            "admin"
        ) {

            roleName =
                "HR Administrator";

        }


        if (
            currentUser.role ===
            "employee"
        ) {

            roleName =
                currentUser.department;

        }


        if (
            currentUser.role ===
            "demo"
        ) {

            roleName =
                "Demo Reviewer";

        }


        userRole.innerText =
            roleName;

    }

}


function applyRolePermissions() {

    const adminOnly =
        document.querySelectorAll(
            ".admin-only"
        );


    const employeeOnly =
        document.querySelectorAll(
            ".employee-only"
        );


    const demoOnly =
        document.querySelectorAll(
            ".demo-only"
        );


    if (
        currentUser.role !==
        "admin"
    ) {

        adminOnly.forEach(
            function (element) {

                element.style.display =
                    "none";

            }
        );

    }


    if (
        currentUser.role !==
        "employee"
    ) {

        employeeOnly.forEach(
            function (element) {

                element.style.display =
                    "none";

            }
        );

    }


    if (
        currentUser.role !==
        "demo"
    ) {

        demoOnly.forEach(
            function (element) {

                element.style.display =
                    "none";

            }
        );

    }

}


function logout() {

    localStorage.removeItem(
        "currentUser"
    );

    window.location.href =
        "index.html";

}