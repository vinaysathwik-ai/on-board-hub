# 🚀 Onboard Hub – Smart Role-Aware Onboarding Assistant

Onboard Hub is a **role-aware, AI-powered onboarding assistant** designed to help **freshers and new hires in tech companies** onboard faster by providing **clear, contextual, and company-relevant guidance** through a centralized web-based platform.

The system uses an **AI Agent powered by Google Gemini 2.5 Flash API**, integrated through a **Node.js and Express backend**, to intelligently respond to onboarding-related queries based on predefined role context and structured onboarding knowledge.

---

## 📌 Table of Contents
- Overview
- Problem Statement
- Solution
- Key Features
- How It Works
- Universal Onboarding Topics
- System Architecture
- Technology Stack
- Project Structure
- AI Agent Approach
- Security Considerations
- Results and Demo
- Challenges Faced
- Future Scope
- Getting Started
- Contributors
- References

---

## 📖 Overview

In modern tech companies, onboarding new employees is often inefficient due to **scattered documentation, lack of role clarity, and dependency on senior employees**. Freshers struggle to understand systems, tools, and workflows, while experienced employees spend significant time answering repetitive questions.

**Onboard Hub** solves this problem by acting as a **central onboarding assistant** that adapts to the user’s role and provides **guided, AI-assisted explanations** in a simple and interactive way.

---

## ❗ Problem Statement

- Onboarding information is spread across multiple internal platforms  
- New hires do not know where to look for correct information  
- Senior developers repeatedly answer the same questions  
- Traditional documentation is static and difficult to navigate  
- Generic AI tools are not tailored for internal onboarding needs  

There is a strong need for a **centralized, role-aware onboarding system** that simplifies learning and improves productivity for new employees.

---

## 💡 Solution

Onboard Hub is a **single-page web application** that acts as an intelligent onboarding assistant.

The system:
- Identifies the user’s role after login
- Maintains role context throughout the session
- Uses an AI Agent to generate clear explanations
- Provides structured onboarding guidance through predefined topics

Unlike generic chatbots, Onboard Hub is designed specifically for **internal onboarding workflows**.

---

## ✨ Key Features

- 🔐 Role-aware onboarding experience
- 💬 Chat-based user interface
- 🧭 Guided onboarding topics
- 🤖 AI Agent powered by Google Gemini 2.5 Flash
- 🧠 Backend-controlled AI communication
- 📌 Clean and professional UI for enterprise use

---

## 🔄 How It Works

1. User logs in to the application  
2. Backend identifies the user role (frontend, backend, fresher, etc.)  
3. Role context is stored and maintained  
4. User asks onboarding-related questions  
5. Backend sends query and role context to the AI Agent  
6. AI Agent generates a contextual response  
7. Response is sent back and displayed on the UI  

**User → Frontend → Backend → AI Agent → Backend → Frontend**

---

## 🧭 Universal Onboarding Topics

The application provides structured onboarding guidance using the following universal topics:

- Getting Started  
- Company Overview  
- Tech Stack & Tools  
- Architecture & Systems  
- Workflows & Processes  
- Common Issues & Solutions  
- FAQs  

These topics help freshers explore onboarding information systematically.

---

## 🏗️ System Architecture

The system follows a **secure client–server architecture**:

Browser (Frontend)
↓
Node.js + Express Backend
↓
Google Gemini 2.5 Flash AI Agent
↓
Backend
↓
Frontend UI

yaml
Copy code

### Architecture Highlights
- Frontend does not directly call the AI API  
- Backend manages all AI requests  
- Role context is handled server-side  
- API keys are securely stored in environment variables  

---

## 🛠️ Technology Stack

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### AI
- Google Gemini 2.5 Flash API (AI Agent-based interaction)

---

## 📁 Project Structure

project-root/
│
├── frontend/
│ ├── index.html
│ ├── style.css
│ └── script.js
│
├── backend/
│ ├── server.js
│ ├── .env
│ └── routes/
│ └── ask.js
│
└── README.md

yaml
Copy code

---

## 🤖 AI Agent Approach

Onboard Hub uses an **AI Agent approach** instead of training models or retrieval pipelines.

- AI receives:
  - User question
  - Role context
  - Topic context (if selected)
- AI generates responses based on contextual understanding
- No external knowledge injection
- No model training involved

The AI Agent acts as an **intelligent conversational layer**, not a data source.

---

## 🔐 Security Considerations

- API keys stored securely in `.env` files
- No sensitive keys exposed to frontend
- All AI requests handled server-side
- Controlled request flow through backend APIs

This ensures safe and responsible AI usage.

---

## ✅ Results and Demo

The working prototype demonstrates:
- Role-based onboarding interaction
- AI-powered responses using Gemini 2.5 Flash
- Functional frontend-backend integration
- Clean and responsive UI

Screenshots and live demo confirm system functionality.

---

## ⚠️ Challenges Faced

- Integrating Gemini AI API securely
- Managing role-based context effectively
- Maintaining response relevance
- Working within hackathon time limits

These challenges were solved through modular backend design and careful scope control.

---

## 🚀 Future Scope

- Support for more roles (QA, DevOps, Interns)
- Integration with HR systems
- Analytics dashboard for onboarding progress
- Multi-language onboarding support
- Cloud deployment and scalability

---

## 🧪 Getting Started

### Prerequisites
- Node.js installed
- Google Gemini API key

### Setup Instructions

```bash
git clone <repository-link>
cd project-root
bash
Copy code
cd backend
npm install
npm start
Open frontend/index.html in your browser to run the application.

👥 Contributors
M VINAY SATHWIK
B.SASIDHAR
S.JIGNESH
K.SURENDRA  
📚 References
Google Gemini API Documentation

Node.js Documentation

Express.js Documentation

MDN Web Docs
