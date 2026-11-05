const users = [
    {
        id: 1,
        username: "jarukit",
        password: "1234",
        name: "คุณจารุกิตติ์",
        department: "Human Resources",
        role: "admin"
    },

    {
        id: 2,
        username: "forkor",
        password: "1234",
        name: "คุณธัญพิสิฐ์",
        department: "Operation Support",
        role: "Operation Support"
    },

    {
        id: 3,
        username: "teacher",
        password: "1234",
        name: "คุณสิริพร",
        department: "Reviewer",
        role: "demo"
    }
];

const requests = [
    {
        id: "REQ-001",
        title: "เตรียมพื้นที่งานศิลปิน",
        department: "Operation Support",
        requester: "Jarukit",
        assignee: "Operation Support",
        status: "In Progress",
        progress: 70,
        deadline: "8 ต.ค. 2569 เวลา 17:00",
        createdAt: "5 ต.ค. 2569 เวลา 09:00",
        description:
            "เตรียมพื้นที่สำหรับกิจกรรมศิลปิน รวมถึงโต๊ะ จุดลงทะเบียน ระบบไฟ และอุปกรณ์ตามแผนงาน",

        timeline: [
            {
                title: "สร้างคำขอ",
                time: "09:00",
                status: "done"
            },
            {
                title: "ตรวจสอบคำขอ",
                time: "09:15",
                status: "done"
            },
            {
                title: "มอบหมายให้ Operation Support",
                time: "09:30",
                status: "done"
            },
            {
                title: "กำลังดำเนินการ",
                time: "10:10",
                status: "current"
            },
            {
                title: "Completed",
                time: "-",
                status: "pending"
            }
        ],

        messages: [
            {
                sender: "Jarukit",
                message:
                    "รบกวนเตรียมพื้นที่ตามรายละเอียดที่แจ้งไว้ครับ",
                time: "09:05"
            },
            {
                sender: "Operation Support",
                message:
                    "รับทราบครับ ตอนนี้กำลังจัดเตรียมพื้นที่และอุปกรณ์",
                time: "10:20"
            }
        ]
    },

    {
        id: "REQ-002",
        title: "ขออุปกรณ์สำหรับอบรม",
        department: "HR Training",
        requester: "Friend",
        assignee: "HR",
        status: "Pending",
        progress: 20,
        deadline: "10 ต.ค. 2569 เวลา 12:00",
        createdAt: "5 ต.ค. 2569 เวลา 11:00",
        description:
            "ขอ Notebook และ Projector สำหรับใช้ในการอบรมพนักงาน",

        timeline: [
            {
                title: "สร้างคำขอ",
                time: "11:00",
                status: "done"
            },
            {
                title: "รอตรวจสอบ",
                time: "-",
                status: "current"
            },
            {
                title: "มอบหมายงาน",
                time: "-",
                status: "pending"
            },
            {
                title: "กำลังดำเนินการ",
                time: "-",
                status: "pending"
            },
            {
                title: "Completed",
                time: "-",
                status: "pending"
            }
        ],

        messages: []
    },

    {
        id: "REQ-003",
        title: "สรุปผลกิจกรรมพนักงาน",
        department: "Human Resources",
        requester: "Jarukit",
        assignee: "HR",
        status: "Completed",
        progress: 100,
        deadline: "4 ต.ค. 2569 เวลา 16:00",
        createdAt: "3 ต.ค. 2569 เวลา 09:00",
        description:
            "สรุปจำนวนผู้เข้าร่วมกิจกรรมและผลตอบรับของพนักงาน",

        timeline: [
            {
                title: "สร้างคำขอ",
                time: "09:00",
                status: "done"
            },
            {
                title: "ตรวจสอบ",
                time: "09:30",
                status: "done"
            },
            {
                title: "ดำเนินการ",
                time: "10:00",
                status: "done"
            },
            {
                title: "Completed",
                time: "15:40",
                status: "done"
            }
        ],

        messages: [
            {
                sender: "HR",
                message:
                    "สรุปผลเรียบร้อยแล้วครับ",
                time: "15:40"
            }
        ]
    }
];

const trainings = [
    {
        id: "TRN-001",
        title: "Customer Service Essentials",
        category: "Customer Service",
        duration: "2 ชั่วโมง",
        progress: 75,
        status: "In Progress",
        deadline: "12 ต.ค. 2569",
        score: 0,

        description:
            "เรียนรู้พื้นฐานการบริการลูกค้า การสื่อสารอย่างมืออาชีพ และการรับมือกับสถานการณ์ที่ยาก",

        modules: [
            {
                id: 1,
                title: "พื้นฐานการบริการลูกค้า",
                completed: true
            },
            {
                id: 2,
                title: "การสื่อสารอย่างมืออาชีพ",
                completed: true
            },
            {
                id: 3,
                title: "การรับฟังลูกค้า",
                completed: true
            },
            {
                id: 4,
                title: "การจัดการสถานการณ์ที่ยาก",
                completed: false
            }
        ],

        quiz: [
            {
                question:
                    "ข้อใดเป็นวิธีที่เหมาะสมที่สุดในการรับมือกับลูกค้าที่ไม่พึงพอใจ?",

                choices: [
                    "โต้เถียงเพื่ออธิบายเหตุผล",
                    "รับฟังอย่างตั้งใจและแสดงความเข้าใจ",
                    "ปฏิเสธลูกค้าทันที",
                    "ส่งให้ฝ่ายอื่นโดยไม่รับฟัง"
                ],

                answer: 1
            },

            {
                question:
                    "สิ่งสำคัญที่สุดในการสื่อสารกับลูกค้าคืออะไร?",

                choices: [
                    "พูดให้เร็วที่สุด",
                    "ใช้คำศัพท์ยาก",
                    "สื่อสารให้ชัดเจนและเข้าใจง่าย",
                    "พูดเฉพาะข้อมูลที่เราต้องการ"
                ],

                answer: 2
            },

            {
                question:
                    "เมื่อลูกค้าแจ้งปัญหา สิ่งแรกที่ควรทำคืออะไร?",

                choices: [
                    "รับฟังปัญหา",
                    "ปฏิเสธความรับผิดชอบ",
                    "แจ้งให้กลับมาใหม่",
                    "จบการสนทนา"
                ],

                answer: 0
            }
        ]
    },

    {
        id: "TRN-002",
        title: "Cyber Security Awareness",
        category: "Digital Skills",
        duration: "1 ชั่วโมง",
        progress: 45,
        status: "In Progress",
        deadline: "15 ต.ค. 2569",
        score: 0,

        description:
            "เรียนรู้พื้นฐานความปลอดภัยทางไซเบอร์และการป้องกันข้อมูลภายในองค์กร",

        modules: [
            {
                id: 1,
                title: "Cyber Security คืออะไร",
                completed: true
            },
            {
                id: 2,
                title: "Password Security",
                completed: true
            },
            {
                id: 3,
                title: "Phishing Email",
                completed: false
            }
        ],

        quiz: []
    },

    {
        id: "TRN-003",
        title: "Workplace Communication",
        category: "Communication",
        duration: "1 ชั่วโมง 30 นาที",
        progress: 100,
        status: "Completed",
        deadline: "5 ต.ค. 2569",
        score: 90,

        description:
            "พัฒนาทักษะการสื่อสารและประสานงานภายในองค์กร",

        modules: [
            {
                id: 1,
                title: "การสื่อสารภายในทีม",
                completed: true
            },
            {
                id: 2,
                title: "การประสานงานระหว่างฝ่าย",
                completed: true
            },
            {
                id: 3,
                title: "การลดความคลาดเคลื่อนของข้อมูล",
                completed: true
            }
        ],

        quiz: []
    }
];

const announcements = [
    {
        id: "ANN-001",
        title: "อบรม Customer Service ประจำเดือน",
        category: "Training",
        date: "5 ต.ค. 2569",
        author: "HR Department",
        content:
            "ขอเชิญพนักงานเข้าร่วมอบรม Customer Service Essentials ภายในวันที่ 12 ต.ค. 2569 สามารถเรียนและทำแบบทดสอบได้ผ่าน StaffFlow",
        important: true
    },

    {
        id: "ANN-002",
        title: "แจ้งเตรียมความพร้อมกิจกรรมพนักงาน",
        category: "Activity",
        date: "4 ต.ค. 2569",
        author: "HR Department",
        content:
            "ขอความร่วมมือทุกฝ่ายตรวจสอบกำหนดการและงานที่ได้รับมอบหมายก่อนวันจัดกิจกรรม",
        important: false
    },

    {
        id: "ANN-003",
        title: "อัปเดตขั้นตอนการส่งคำขอระหว่างฝ่าย",
        category: "Internal Communication",
        date: "3 ต.ค. 2569",
        author: "Operation Support",
        content:
            "ตั้งแต่วันนี้สามารถส่งคำขอและติดตามสถานะระหว่างฝ่ายผ่าน StaffFlow ได้โดยตรง เพื่อลดการส่งต่อข้อมูลผ่านตัวกลาง",
        important: true
    }
];