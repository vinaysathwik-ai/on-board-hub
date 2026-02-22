const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const Doc = require('../backend/models/Doc');
const User = require('../backend/models/User');
const Module = require('../backend/models/Module');
const FAQ = require('../backend/models/FAQ');
const mongoose = require('mongoose');

const sampleDocs = [
    {
        title: 'Company Coding Standards',
        content: 'We use ESLint with the Airbnb style guide. Always use camelCase for variables and PascalCase for classes. Functions should be small and do one thing. Comments are mandatory for complex logic.',
        category: 'standards',
        tags: ['coding', 'style', 'javascript']
    },
    {
        title: 'Deployment Workflow',
        content: 'All code must be reviewed via Pull Request (PR) before merging to main. We use CI/CD pipelines (Jenkins) which automatically run tests. Deployments to production happen on Tuesdays and Thursdays only.',
        category: 'workflow',
        tags: ['deployment', 'git', 'ci/cd']
    },
    {
        title: 'Employee Benefits',
        content: 'We offer health insurance, 20 days paid leave, and a gym membership reimbursement. Coffee and snacks are free in the pantry.',
        category: 'hr',
        tags: ['benefits', 'hr']
    },
    {
        title: 'Tech Stack Overview',
        content: 'Our backend is primarily Node.js (Express) and Python (Django). Frontend is React. Database is MongoDB and PostgreSQL. We use AWS for hosting.',
        category: 'tech',
        tags: ['tech', 'stack']
    }
];

// Added FAQs based on user prompt requirements
const sampleFAQs = [
    {
        question: "Where do I submit my timesheet?",
        answer: "Timesheets are submitted via the HR portal every Friday.",
        category: "HR"
    },
    {
        question: "How do I claim expenses?",
        answer: "Use the Expensify app and tag your manager for approval.",
        category: "Finance"
    },
    {
        question: "Can I work remotely?",
        answer: "Yes, we have a hybrid policy. 3 days in office, 2 days remote.",
        category: "HR"
    }
];

// Added Modules based on user prompt requirements
const sampleModules = [
    {
        title: "Company Overview",
        description: "Learn about our mission, vision, and values.",
        category: "overview",
        order: 1
    },
    {
        title: "Tech Stack Basics",
        description: "Introduction to our core technologies.",
        category: "tech",
        order: 2
    },
    {
        title: "Architecture Overview",
        description: "Understanding our system design and microservices.",
        category: "tech",
        order: 3
    },
    {
        title: "Database Rules",
        description: "Best practices for schema design and querying.",
        category: "tech",
        order: 4
    },
    {
        title: "API Guidelines",
        description: "RESTful standards and error handling.",
        category: "tech",
        order: 5
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB for seeding...');

        // Clear existing
        await Doc.deleteMany({});
        await FAQ.deleteMany({});
        await Module.deleteMany({});
        await User.deleteMany({}); // Optional: clear users too

        // Insert new
        await Doc.insertMany(sampleDocs);
        await FAQ.insertMany(sampleFAQs);
        await Module.insertMany(sampleModules);

        // Create a demo user and mentor
        const demoUser = new User({
            username: 'fresher1',
            email: 'fresher@company.com',
            role: 'fresher'
        });
        await demoUser.save();

        const demoMentor = new User({
            username: 'mentor1',
            email: 'mentor@company.com',
            role: 'mentor'
        });
        await demoMentor.save();

        console.log('Database seeded successfully!');
        process.exit(0);
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
};

seedDB();
