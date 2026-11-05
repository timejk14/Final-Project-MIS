document.addEventListener("DOMContentLoaded", function () {

    if (
        currentUser.role !== "admin" &&
        currentUser.role !== "demo"
    ) {
        document.getElementById("reportContent").style.display = "none";
        document.getElementById("reportNotice").style.display = "block";
        return;
    }

    loadTrainingResults();

    renderSummary();
    renderRequestChart();
    renderTrainingChart();
    renderTrainingTable();
    renderAnnouncementTable();
    renderUserActivity();

});


// ==================================
// 1. LOAD TRAINING RESULTS
// ==================================

function loadTrainingResults() {

    trainings.forEach(function (training) {

        const saved = localStorage.getItem(
            "trainingResult_" + training.id
        );

        if (saved) {

            const result = JSON.parse(saved);

            training.status = result.status;
            training.progress = result.progress;
            training.score = result.score;

        }

    });

}


// ==================================
// 2. SUMMARY
// ==================================

function renderSummary() {

    const totalRequests = requests.length;

    const completed = requests.filter(function (item) {
        return item.status === "Completed";
    }).length;


    const completedTraining = trainings.filter(function (item) {
        return item.status === "Completed";
    }).length;


    const trainingRate = trainings.length > 0
        ? Math.round(
            completedTraining / trainings.length * 100
        )
        : 0;


    const totalRead =
        announcements.reduce(function (sum, item) {

            return sum + users.filter(function (user) {

                return localStorage.getItem(
                    "announcementRead_" +
                    user.id +
                    "_" +
                    item.id
                ) === "true";

            }).length;

        }, 0);


    const possibleReads =
        announcements.length * users.length;


    const readRate = possibleReads > 0
        ? Math.round(
            totalRead / possibleReads * 100
        )
        : 0;


    document.getElementById("totalRequests").innerText =
        totalRequests;

    document.getElementById("completedRequests").innerText =
        completed;

    document.getElementById("trainingRate").innerText =
        trainingRate + "%";

    document.getElementById("readRate").innerText =
        readRate + "%";

}


// ==================================
// 3. REQUEST CHART
// ==================================

function renderRequestChart() {

    const container =
        document.getElementById("requestChart");


    const statuses = [
        {
            name: "Pending",
            color: "#E5A23B"
        },
        {
            name: "In Progress",
            color: "#3984E8"
        },
        {
            name: "Completed",
            color: "#16A36A"
        }
    ];


    container.innerHTML = "";


    statuses.forEach(function (status) {

        const count = requests.filter(function (item) {

            return item.status === status.name;

        }).length;


        const percentage = requests.length > 0
            ? count / requests.length * 100
            : 0;


        container.innerHTML += `

            <div class="report-bar-item">

                <div class="report-bar-label">
                    <span>${status.name}</span>
                    <strong>${count}</strong>
                </div>

                <div class="report-bar-background">

                    <div
                        class="report-bar-fill"
                        style="
                            width:${percentage}%;
                            background:${status.color};
                        "
                    ></div>

                </div>

            </div>

        `;

    });

}


// ==================================
// 4. TRAINING CHART
// ==================================

function renderTrainingChart() {

    const container =
        document.getElementById("trainingChart");


    const statuses = [
        {
            name: "Completed",
            color: "#16A36A"
        },
        {
            name: "In Progress",
            color: "#3984E8"
        },
        {
            name: "Not Started",
            color: "#AAB3C0"
        }
    ];


    container.innerHTML = "";


    statuses.forEach(function (status) {

        const count = trainings.filter(function (item) {

            if (status.name === "Not Started") {
                return item.progress === 0;
            }

            return item.status === status.name;

        }).length;


        const percentage = trainings.length > 0
            ? count / trainings.length * 100
            : 0;


        container.innerHTML += `

            <div class="report-bar-item">

                <div class="report-bar-label">
                    <span>${status.name}</span>
                    <strong>${count}</strong>
                </div>

                <div class="report-bar-background">

                    <div
                        class="report-bar-fill"
                        style="
                            width:${percentage}%;
                            background:${status.color};
                        "
                    ></div>

                </div>

            </div>

        `;

    });

}


// ==================================
// 5. TRAINING TABLE
// ==================================

function renderTrainingTable() {

    const container =
        document.getElementById("trainingTable");


    container.innerHTML = "";


    trainings.forEach(function (training) {

        const row = document.createElement("tr");


        row.innerHTML = `

            <td>${training.title}</td>

            <td>${training.category}</td>

            <td>${training.progress}%</td>

            <td>
                <span class="report-status">
                    ${training.status}
                </span>
            </td>

            <td>
                ${training.status === "Completed"
                    ? training.score + "%"
                    : "-"
                }
            </td>

        `;


        container.appendChild(row);

    });

}


// ==================================
// 6. ANNOUNCEMENT TABLE
// ==================================

function renderAnnouncementTable() {

    const container =
        document.getElementById("announcementTable");


    container.innerHTML = "";


    announcements.forEach(function (announcement) {

        const read = users.filter(function (user) {

            return localStorage.getItem(
                "announcementRead_" +
                user.id +
                "_" +
                announcement.id
            ) === "true";

        }).length;


        const acknowledged = users.filter(function (user) {

            return localStorage.getItem(
                "announcementAck_" +
                user.id +
                "_" +
                announcement.id
            ) === "true";

        }).length;


        const unread = users.length - read;


        const rate = users.length > 0
            ? Math.round(read / users.length * 100)
            : 0;


        container.innerHTML += `

            <tr>

                <td>${announcement.title}</td>

                <td>${read}</td>

                <td>${unread}</td>

                <td>${acknowledged}</td>

                <td>${rate}%</td>

            </tr>

        `;

    });

}


// ==================================
// 7. USER ACTIVITY
// ==================================

function renderUserActivity() {

    const container =
        document.getElementById("userActivityTable");


    container.innerHTML = "";


    users.forEach(function (user) {

        const read = announcements.filter(function (item) {

            return localStorage.getItem(
                "announcementRead_" +
                user.id +
                "_" +
                item.id
            ) === "true";

        }).length;


        const acknowledged = announcements.filter(function (item) {

            return localStorage.getItem(
                "announcementAck_" +
                user.id +
                "_" +
                item.id
            ) === "true";

        }).length;


        container.innerHTML += `

            <tr>

                <td>${user.name}</td>

                <td>${user.department}</td>

                <td>${user.role}</td>

                <td>${read}/${announcements.length}</td>

                <td>${acknowledged}/${announcements.length}</td>

            </tr>

        `;

    });

}


// ==================================
// 8. EXPORT CSV
// ==================================

function exportReport() {

    const rows = [
        ["StaffFlow Report"],
        ["Report Date", new Date().toLocaleDateString("th-TH")],
        [],
        ["REQUEST REPORT"],
        ["Request ID", "Title", "Department", "Status", "Progress", "Deadline"]
    ];


    requests.forEach(function (item) {

        rows.push([
            item.id,
            item.title,
            item.department,
            item.status,
            item.progress + "%",
            item.deadline
        ]);

    });


    rows.push([]);
    rows.push(["TRAINING REPORT"]);
    rows.push(["Course", "Category", "Progress", "Status", "Score"]);


    trainings.forEach(function (item) {

        rows.push([
            item.title,
            item.category,
            item.progress + "%",
            item.status,
            item.score || 0
        ]);

    });


    rows.push([]);
    rows.push(["ANNOUNCEMENT REPORT"]);
    rows.push(["Announcement", "Read", "Unread", "Acknowledged"]);


    announcements.forEach(function (item) {

        const read = users.filter(function (user) {

            return localStorage.getItem(
                "announcementRead_" + user.id + "_" + item.id
            ) === "true";

        }).length;


        const ack = users.filter(function (user) {

            return localStorage.getItem(
                "announcementAck_" + user.id + "_" + item.id
            ) === "true";

        }).length;


        rows.push([
            item.title,
            read,
            users.length - read,
            ack
        ]);

    });


    const csv = "\uFEFF" + rows.map(function (row) {

        return row.map(function (cell) {

            return '"' +
                String(cell ?? "").replace(/"/g, '""') +
                '"';

        }).join(",");

    }).join("\n");


    const blob = new Blob(
        [csv],
        { type: "text/csv;charset=utf-8;" }
    );


    const url = URL.createObjectURL(blob);


    const link = document.createElement("a");

    link.href = url;

    link.download = "StaffFlow_Report.csv";

    link.click();


    URL.revokeObjectURL(url);

}