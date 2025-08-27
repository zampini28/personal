const todos = [
  {
    id: 1,
    topic: "Personal Website",
    title: "Initial Project Setup",
    goal: "Create the foundational file structure and data model for the TODOs website.",
    dueDate: "2025-08-29",
    isDone: true,
    deliverables: [
      { name: "index.html file", link: null },
      { name: "style.css file", link: null },
      { name: "app.js and data.js files", link: null }
    ]
  },
  {
    id: 2,
    topic: "Work",
    title: "Quarterly Report",
    goal: "Finalize and submit the Q3 performance report.",
    dueDate: "2025-09-15",
    isDone: false,
    deliverables: [
      { name: "Draft document", link: "#" }, // '#' is a placeholder link
      { name: "Final PDF", link: null }
    ]
  },
  {
    id: 3,
    topic: "Home",
    title: "Renew Car Insurance",
    goal: "Find the best quote and renew the car insurance policy before it expires.",
    dueDate: "2025-08-20", // This one is overdue
    isDone: false,
    deliverables: []
  },
  {
    id: 4,
    topic: "Personal Website",
    title: "Develop Landing Page UI",
    goal: "Code the HTML and CSS for the landing page, showing all topic cards.",
    dueDate: "2025-09-02",
    isDone: false,
    deliverables: [
      { name: "Finalized index.html", link: null }
    ]
  },
  {
    id: 5,
    topic: "Learning",
    title: "Complete CSS Grid Course",
    goal: "Finish the advanced modules of the online CSS Grid course.",
    dueDate: "2025-10-01",
    isDone: false,
    deliverables: [
        { name: "Certificate of Completion", link: null }
    ]
  },
  {
    id: 6,
    topic: "Work",
    title: "Client Follow-up",
    goal: "Email the project update to the client.",
    dueDate: "2025-08-28",
    isDone: false,
    deliverables: []
  }
];
