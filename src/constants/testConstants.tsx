const posts = [
    {
        id: 2,
        title: "epa",
        content: "lorem ipsum dolor sit amet",
        pros: [],
        cons: [],
        ticketStatus: "to-do",
        tasks: [
            {
                id: 2,
                title: "epa",
                content: "lorem ipsum dolor sit amet",
                start: Date.parse("12:05:44"),
                end: Date.parse("18:46:30"),
            },
            {
                id: 3,
                title: "epasdfsdf",
                content: "lopsum dolor sit amet",
                start: Date.parse("11:05:44"),
                end: Date.parse("15:46:30"),
            }
        ]

    },
    {
        id: 3,
        title: "epa1",
        content: "lorem ipsum dolor sit amet",
        pros: ["one", "two"],
        cons: ["heyheyhey"],
        ticketStatus: "doing",
        tasks: [
            {
                id: 2,
                title: "epa",
                content: "lorem ipsum dolor sit amet",
                start: Date.parse("12:05:44"),
                end: Date.parse("18:46:30"),
            },
            {
                id: 3,
                title: "epasdfsdf",
                content: "lopsum dolor sit amet",
                start: Date.parse("11:05:44"),
                end: Date.parse("15:46:30"),
            }
        ]
    },
    {
        id: 4,
        title: "epa32",
        content: "lorem ipsum dolor sit amet",
        pros: ["one", "two"],
        cons: ["heyheyhey"],
        ticketStatus: "done",
        tasks: [
            {
                id: 2,
                title: "epa",
                content: "lorem ipsum dolor sit amet",
                start: Date.parse("12:05:44"),
                end: Date.parse("18:46:30"),
            },
            {
                id: 3,
                title: "epasdfsdf",
                content: "lopsum dolor sit amet",
                start: Date.parse("11:05:44"),
                end: Date.parse("15:46:30"),
            }
        ]
    },
    {
        id: 5,
        title: "epa3",
        content: "lorem ipsum dolor sit amet",
        pros: ["one", "two"],
        cons: ["heyheyhey"],
        ticketStatus: "done",
        tasks: [
            {
                id: 2,
                title: "epa",
                content: "lorem ipsum dolor sit amet",
                start: Date.parse("12:05:44"),
                end: Date.parse("18:46:30"),
            },
            {
                id: 3,
                title: "epasdfsdf",
                content: "lopsum dolor sit amet",
                start: Date.parse("11:05:44"),
                end: Date.parse("15:46:30"),
            }
        ]
    },
    {
        id: 6,
        title: "epa65",
        content: "lorem ipsum dolor sit amet",
        pros: ["one", "two"],
        cons: ["heyheyhey"],
        ticketStatus: "to-do",
        tasks: [
            {
                id: 2,
                title: "epa",
                content: "lorem ipsum dolor sit amet",
                start: Date.parse("12:05:44"),
                end: Date.parse("18:46:30"),
            },
            {
                id: 3,
                title: "epasdfsdf",
                content: "lopsum dolor sit amet",
                start: Date.parse("11:05:44"),
                end: Date.parse("15:46:30"),
            }
        ]
    },
];

const kanbanTickets = [
    {
        id: 1,
        title: "ep",
        tickets: [
            {
        id: 4,
        title: "ep",
        content: "lorem ipsum dolor sit amet",
        ticketStatus: "to-do",
    },
    {
        id: 3,
        title: "ep5",
        content: "lorem ipsum dolor sit amet",
        ticketStatus: "to-do",
    },
    {
        id: 6,
        title: "epa65",
        content: "lorem ipsum dolor sit amet",
        ticketStatus: "to-do",
    }
        ]
    },
    {
        id: 2,
        title: "ep34343434",
        tickets: [
            {
        id: 4,
        title: "ep",
        content: "lorem ipsum dolor sit amet",
        ticketStatus: "to-do",
    },
    {
        id: 3,
        title: "ep5",
        content: "lorem ipsum dolor sit amet",
        ticketStatus: "to-do",
    },
    {
        id: 6,
        title: "epa65",
        content: "lorem ipsum dolor sit amet",
        ticketStatus: "to-do",
    }
        ]
    },
];

export { posts, kanbanTickets };