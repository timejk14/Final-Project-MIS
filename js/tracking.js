document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateSavedTrainingResults();

        updateSummary();

        renderTracking("all");

        setupFilters();

    }
);


function updateSavedTrainingResults() {

    trainings.forEach(
        function (training) {

            const savedResult =
                JSON.parse(
                    localStorage.getItem(
                        "trainingResult_" +
                        training.id
                    )
                );


            if (savedResult) {

                training.status =
                    savedResult.status;

                training.progress =
                    savedResult.progress;

                training.score =
                    savedResult.score;

            }

        }
    );

}


function getAllTrackingItems() {

    const requestItems =
        requests.map(
            function (request) {

                return {

                    type: "request",

                    id: request.id,

                    title: request.title,

                    subtitle:
                        request.assignee,

                    status:
                        request.status,

                    progress:
                        request.progress,

                    deadline:
                        request.deadline

                };

            }
        );


    const trainingItems =
        trainings.map(
            function (training) {

                return {

                    type: "training",

                    id: training.id,

                    title: training.title,

                    subtitle:
                        training.category,

                    status:
                        training.status,

                    progress:
                        training.progress,

                    deadline:
                        training.deadline

                };

            }
        );


    return [
        ...requestItems,
        ...trainingItems
    ];

}


function updateSummary() {

    const allItems =
        getAllTrackingItems();


    const activeItems =
        allItems.filter(
            function (item) {

                return (
                    item.status !==
                    "Completed"
                );

            }
        );


    const completedItems =
        allItems.filter(
            function (item) {

                return (
                    item.status ===
                    "Completed"
                );

            }
        );


    document.getElementById(
        "activeCount"
    ).innerText =
        activeItems.length;


    document.getElementById(
        "completedCount"
    ).innerText =
        completedItems.length;


    document.getElementById(
        "requestCount"
    ).innerText =
        requests.length;


    document.getElementById(
        "trainingCount"
    ).innerText =
        trainings.length;

}


function renderTracking(filter) {

    const container =
        document.getElementById(
            "trackingContainer"
        );


    let items =
        getAllTrackingItems();


    if (filter === "request") {

        items =
            items.filter(
                function (item) {

                    return (
                        item.type ===
                        "request"
                    );

                }
            );

    }


    if (filter === "training") {

        items =
            items.filter(
                function (item) {

                    return (
                        item.type ===
                        "training"
                    );

                }
            );

    }


    if (filter === "active") {

        items =
            items.filter(
                function (item) {

                    return (
                        item.status !==
                        "Completed"
                    );

                }
            );

    }


    if (filter === "completed") {

        items =
            items.filter(
                function (item) {

                    return (
                        item.status ===
                        "Completed"
                    );

                }
            );

    }


    container.innerHTML = "";


    items.forEach(
        function (item) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "tracking-center-card";


            let icon =
                item.type ===
                "request"
                    ? "📋"
                    : "🎓";


            let typeName =
                item.type ===
                "request"
                    ? "Request"
                    : "Training";


            let statusClass = "";

            if (
                item.status ===
                "Completed"
            ) {

                statusClass =
                    "completed";

            } else if (
                item.status ===
                "Pending"
            ) {

                statusClass =
                    "pending";

            } else {

                statusClass =
                    "progress";

            }


            card.innerHTML = `

                <div
                    class="tracking-card-icon"
                >
                    ${icon}
                </div>


                <div
                    class="tracking-card-content"
                >

                    <div
                        class="tracking-card-top"
                    >

                        <div>

                            <span
                                class="tracking-type"
                            >
                                ${typeName}
                            </span>

                            <h3>
                                ${item.title}
                            </h3>

                            <p>
                                ${item.subtitle}
                            </p>

                        </div>


                        <span
                            class="
                                status
                                ${statusClass}
                            "
                        >
                            ${item.status}
                        </span>

                    </div>


                    <div
                        class="tracking-progress-area"
                    >

                        <div
                            class="training-title"
                        >

                            <span>
                                ความคืบหน้า
                            </span>

                            <strong>
                                ${item.progress}%
                            </strong>

                        </div>


                        <div
                            class="progress-bar"
                        >

                            <div
                                class="progress-fill"
                                style="
                                    width:
                                    ${item.progress}%;
                                "
                            >
                            </div>

                        </div>

                    </div>


                    <div
                        class="tracking-card-footer"
                    >

                        <span>
                            Deadline:
                            ${item.deadline}
                        </span>


                        <button
                            onclick="
                                openTrackingItem(
                                    '${item.type}',
                                    '${item.id}'
                                )
                            "
                        >
                            ดูรายละเอียด
                        </button>

                    </div>

                </div>

            `;


            container.appendChild(
                card
            );

        }
    );

}


function setupFilters() {

    const buttons =
        document.querySelectorAll(
            ".tracking-filter-button"
        );


    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    buttons.forEach(
                        function (btn) {

                            btn.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    renderTracking(
                        button.dataset.filter
                    );

                }
            );

        }
    );

}


function openTrackingItem(
    type,
    id
) {

    if (type === "request") {

        localStorage.setItem(
            "selectedRequest",
            id
        );

        window.location.href =
            "request-detail.html";

    }


    if (type === "training") {

        localStorage.setItem(
            "selectedTraining",
            id
        );

        window.location.href =
            "training-detail.html";

    }

}