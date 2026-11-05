document.addEventListener("DOMContentLoaded", function () {

    displayRequests(requests);

    const searchInput =
        document.getElementById("requestSearch");

    const statusFilter =
        document.getElementById("statusFilter");


    searchInput.addEventListener(
        "input",
        filterRequests
    );

    statusFilter.addEventListener(
        "change",
        filterRequests
    );

});


function displayRequests(requestData) {

    const requestList =
        document.getElementById("requestList");

    requestList.innerHTML = "";


    requestData.forEach(function (request) {

        let statusClass = "";

        if (request.status === "In Progress") {
            statusClass = "progress";
        }

        if (request.status === "Pending") {
            statusClass = "pending";
        }

        if (request.status === "Completed") {
            statusClass = "completed";
        }


        const card =
            document.createElement("div");

        card.className =
            "request-page-card";


        card.innerHTML = `

            <div class="request-card-top">

                <div>

                    <span class="request-id">
                        ${request.id}
                    </span>

                    <h3>
                        ${request.title}
                    </h3>

                    <p>
                        ${request.department}
                    </p>

                </div>

                <span
                    class="status ${statusClass}"
                >
                    ${request.status}
                </span>

            </div>


            <div class="request-progress-row">

                <div>

                    <small>
                        Progress
                    </small>

                    <strong>
                        ${request.progress}%
                    </strong>

                </div>

                <div class="progress-bar">

                    <div
                        class="progress-fill"
                        style="
                            width:
                            ${request.progress}%;
                        "
                    ></div>

                </div>

            </div>


            <div class="request-information">

                <div>
                    <small>ผู้รับผิดชอบ</small>
                    <strong>
                        ${request.assignee}
                    </strong>
                </div>

                <div>
                    <small>Deadline</small>
                    <strong>
                        ${request.deadline}
                    </strong>
                </div>

            </div>


            <button
                class="view-request-button"
                onclick="
                    openRequest(
                        '${request.id}'
                    )
                "
            >
                ดูรายละเอียดและ Tracking
            </button>

        `;

        requestList.appendChild(card);

    });

}


function filterRequests() {

    const search =
        document
            .getElementById("requestSearch")
            .value
            .toLowerCase();

    const status =
        document
            .getElementById("statusFilter")
            .value;


    const filtered =
        requests.filter(function (request) {

            const matchesSearch =
                request.title
                    .toLowerCase()
                    .includes(search)
                ||
                request.id
                    .toLowerCase()
                    .includes(search);


            const matchesStatus =
                status === "all"
                ||
                request.status === status;


            return (
                matchesSearch &&
                matchesStatus
            );

        });


    displayRequests(filtered);
}


function openRequest(id) {

    localStorage.setItem(
        "selectedRequest",
        id
    );

    window.location.href =
        "request-detail.html";
}