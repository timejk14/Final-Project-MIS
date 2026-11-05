document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayTrainings();

    }
);


function displayTrainings() {

    const container =
        document.getElementById(
            "trainingList"
        );

    container.innerHTML = "";


    trainings.forEach(
        function (training) {

            let statusClass =
                training.status === "Completed"
                    ? "completed"
                    : "progress";


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "training-course-card";


            card.innerHTML = `

                <div class="course-icon">
                    🎓
                </div>


                <div class="course-content">

                    <span class="course-category">
                        ${training.category}
                    </span>

                    <h3>
                        ${training.title}
                    </h3>

                    <p>
                        ${training.description}
                    </p>


                    <div class="course-meta">

                        <span>
                            ${training.duration}
                        </span>

                        <span>
                            Deadline:
                            ${training.deadline}
                        </span>

                    </div>


                    <div class="course-progress">

                        <div class="training-title">

                            <strong>
                                Progress
                            </strong>

                            <span>
                                ${training.progress}%
                            </span>

                        </div>


                        <div class="progress-bar">

                            <div
                                class="progress-fill"
                                style="
                                    width:
                                    ${training.progress}%;
                                "
                            ></div>

                        </div>

                    </div>


                    <div class="course-footer">

                        <span
                            class="
                                status
                                ${statusClass}
                            "
                        >
                            ${training.status}
                        </span>


                        <button
                            class="course-button"
                            onclick="
                                openTraining(
                                    '${training.id}'
                                )
                            "
                        >
                            ${
                                training.status
                                === "Completed"
                                ? "ดูผลการอบรม"
                                : "เรียนต่อ"
                            }
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


function openTraining(id) {

    localStorage.setItem(
        "selectedTraining",
        id
    );

    window.location.href =
        "training-detail.html";
}