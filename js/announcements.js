document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateAnnouncementSummary();

        renderAnnouncements("all");

        setupAnnouncementFilters();

    }
);


function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem(
            "currentUser"
        )
    );

}


function getReadKey(id) {

    const user =
        getCurrentUser();

    return (
        "announcementRead_" +
        user.id +
        "_" +
        id
    );

}


function getAckKey(id) {

    const user =
        getCurrentUser();

    return (
        "announcementAck_" +
        user.id +
        "_" +
        id
    );

}


function isRead(id) {

    return (
        localStorage.getItem(
            getReadKey(id)
        ) === "true"
    );

}


function isAcknowledged(id) {

    return (
        localStorage.getItem(
            getAckKey(id)
        ) === "true"
    );

}


function updateAnnouncementSummary() {

    const total =
        announcements.length;


    const read =
        announcements.filter(
            function (announcement) {

                return isRead(
                    announcement.id
                );

            }
        ).length;


    const acknowledged =
        announcements.filter(
            function (announcement) {

                return isAcknowledged(
                    announcement.id
                );

            }
        ).length;


    document.getElementById(
        "announcementCount"
    ).innerText =
        total;


    document.getElementById(
        "readCount"
    ).innerText =
        read;


    document.getElementById(
        "unreadCount"
    ).innerText =
        total - read;


    document.getElementById(
        "ackCount"
    ).innerText =
        acknowledged;

}


function renderAnnouncements(filter) {

    const container =
        document.getElementById(
            "announcementList"
        );


    let items =
        [...announcements];


    if (filter === "unread") {

        items =
            items.filter(
                function (announcement) {

                    return !isRead(
                        announcement.id
                    );

                }
            );

    }


    if (
        filter ===
        "acknowledged"
    ) {

        items =
            items.filter(
                function (announcement) {

                    return isAcknowledged(
                        announcement.id
                    );

                }
            );

    }


    container.innerHTML = "";


    items.forEach(
        function (announcement) {

            const read =
                isRead(
                    announcement.id
                );


            const acknowledged =
                isAcknowledged(
                    announcement.id
                );


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "announcement-page-card";


            if (!read) {

                card.classList.add(
                    "announcement-unread"
                );

            }


            card.innerHTML = `

                <div
                    class="announcement-card-head"
                >

                    <div>

                        <div
                            class="announcement-label-row"
                        >

                            <span
                                class="course-category"
                            >
                                ${announcement.category}
                            </span>

                            ${
                                announcement.important
                                ? `
                                    <span
                                        class="important-label"
                                    >
                                        Important
                                    </span>
                                `
                                : ""
                            }

                            ${
                                !read
                                ? `
                                    <span
                                        class="new-label"
                                    >
                                        NEW
                                    </span>
                                `
                                : ""
                            }

                        </div>


                        <h2>
                            ${announcement.title}
                        </h2>


                        <p
                            class="announcement-meta"
                        >
                            ${announcement.date}
                            •
                            ${announcement.author}
                        </p>

                    </div>


                    <span
                        class="
                            announcement-read-status
                            ${
                                read
                                ? "is-read"
                                : ""
                            }
                        "
                    >
                        ${
                            read
                            ? "อ่านแล้ว"
                            : "ยังไม่อ่าน"
                        }
                    </span>

                </div>


                <div
                    class="announcement-content"
                >

                    <p>
                        ${announcement.content}
                    </p>

                </div>


                <div
                    class="announcement-actions"
                >

                    ${
                        !read
                        ? `
                            <button
                                class="secondary-action-button"
                                onclick="
                                    markAsRead(
                                        '${announcement.id}'
                                    )
                                "
                            >
                                เปิดอ่าน
                            </button>
                        `
                        : ""
                    }


                    ${
                        acknowledged
                        ? `
                            <button
                                class="
                                    acknowledgement-button
                                    acknowledged
                                "
                                disabled
                            >
                                ✓ รับทราบแล้ว
                            </button>
                        `
                        : `
                            <button
                                class="acknowledgement-button"
                                onclick="
                                    acknowledgeAnnouncement(
                                        '${announcement.id}'
                                    )
                                "
                            >
                                ยืนยันรับทราบ
                            </button>
                        `
                    }

                </div>

            `;


            container.appendChild(
                card
            );

        }
    );

}


function markAsRead(id) {

    localStorage.setItem(
        getReadKey(id),
        "true"
    );


    updateAnnouncementSummary();

    renderAnnouncements(
        getActiveAnnouncementFilter()
    );

}


function acknowledgeAnnouncement(id) {

    localStorage.setItem(
        getReadKey(id),
        "true"
    );


    localStorage.setItem(
        getAckKey(id),
        "true"
    );


    updateAnnouncementSummary();

    renderAnnouncements(
        getActiveAnnouncementFilter()
    );

}


function setupAnnouncementFilters() {

    const buttons =
        document.querySelectorAll(
            ".announcement-filter"
        );


    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    buttons.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    button.classList.add(
                        "active"
                    );


                    renderAnnouncements(
                        button.dataset.filter
                    );

                }
            );

        }
    );

}


function getActiveAnnouncementFilter() {

    const active =
        document.querySelector(
            ".announcement-filter.active"
        );


    return active
        ? active.dataset.filter
        : "all";

}