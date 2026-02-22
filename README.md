# Fresher Onboarding Platform 🚀

This project is a RAG-based AI and mentor-assisted onboarding platform designed to help freshers ramp up faster using company knowledge, learning modules, and human guidance.

## 🎯 Problem Statement
Onboarding new hires, especially freshers, is a critical but often inefficient process. Freshers struggle with:
- **Information Overload:** scattered documentation.
- **Mentor Availability:** mentors are busy and can't answer repetitive questions.
- **Lack of Structure:** unclear learning paths.

## 💡 Solution: AI + Mentor Hybrid Approach
We combine the power of AI with human mentorship:
1.  **RAG-based AI Assistant:** Answers 80% of queries instantly using internal company documents (via Ollama/Gemini).
2.  **Human Mentor Loop:** Complex or sensitive questions are routed to a human mentor.
3.  **Structured Learning:** Role-based modules with progress tracking.

## 🛠️ Tech Stack
-   **Frontend:** HTML, CSS, JavaScript (Vanilla)
-   **Backend:** Node.js, Express.js
-   **Database:** MongoDB (with specialized schemas for RAG)
-   **AI:** 
    -   **Ollama (Local):** Primary LLM for privacy and speed.
    -   **Gemini (Cloud):** Fallback for general knowledge.
-   **Architecture:** Retrieval-Augmented Generation (RAG)

## 🚀 How to Run Locally

### Prerequisites
-   Node.js installed
-   MongoDB installed and running locally on default port (27017)
-   (Optional) Ollama running locally for AI features (`ollama serve`)

### Steps
1.  **Clone the Repository**
    ```bash
    git clone <repo-url>
    cd <repo-folder>
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment**
    - Ensure there is a `.env` file in the root directory.
    - Set `MONGO_URI` and `GEMINI_API_KEY`.

4.  **Seed the Database**
    Populate the database with sample data (Users, Modules, Docs, FAQs):
    ```bash
    npm run seed
    ```

5.  **Start the Server**
    ```bash
    npm start
    ```
    The server will start on `http://localhost:5000`.

6.  **Access the Application**
    Open your browser and navigate to:
    [http://localhost:5000](http://localhost:5000)

### Login Credentials (Demo)
-   **Fresher:** `fresher@company.com` (No password required for demo)
-   **Mentor:** `mentor@company.com`

## 🔮 Future Improvements
-   **Vector Database:** Switch from regex search to a true vector store (like Pinecone or MongoDB Atlas Vector Search) for better semantic understanding.
-   **Real-time Chat:** Implement WebSockets (Socket.io) for live mentor messaging.
-   **Admin Dashboard:** UI for uploading documents and managing users.
-   **Mobile App:** React Native version for on-the-go access.

---
**Hackathon Use Only** - Built with ❤️ for better onboarding.
