
import { Meeting, HourlyLog, User } from './types';

// Extended User type for the internal database (including passwords)
export interface DBUser extends User {
  password: string;
}

// THE MOCK DATABASE
export const USER_DATABASE: DBUser[] = [
  {
    email: 'backend@onboard.hub',
    password: 'password123',
    name: 'Alex Rivera',
    role: 'Senior Backend Engineer',
    specialization: 'Backend'
  },
  {
    email: 'frontend@onboard.hub',
    password: 'design456',
    name: 'Sarah Chen',
    role: 'Lead UI Developer',
    specialization: 'Frontend'
  },
  {
    email: 'fresher@onboard.hub',
    password: 'start789',
    name: 'Jordan Smith',
    role: 'Junior Associate',
    specialization: 'General'
  },
  {
    email: 'devops@onboard.hub',
    password: 'infra',
    name: 'Mike Ross',
    role: 'Cloud Architect',
    specialization: 'Backend'
  }
];

export const INITIAL_MEETINGS: Meeting[] = [
  {
    id: '1',
    name: 'Core API Architecture Sync',
    host: 'Alex Rivera',
    startTime: '09:30 AM',
    endTime: '10:00 AM',
    status: 'scheduled',
    link: 'https://meet.google.com/abc-defg-hij'
  },
  {
    id: '2',
    name: 'Frontend Design Sprint',
    host: 'Sarah Chen',
    startTime: '11:00 AM',
    endTime: '12:00 PM',
    status: 'live',
    link: 'https://meet.google.com/pqr-stuv-wxy'
  }
];

export const MOCK_HOURLY_DATA: HourlyLog[] = Array.from({ length: 24 }, (_, i) => ({
  hour: `${i}:00`,
  minutes: i >= 9 && i <= 17 ? Math.floor(Math.random() * 40) + 20 : 0
}));

export const getDynamicSystemPrompt = (role: string, specialization: string) => {
  return `You are the Onboard Hub Neural Training Assistant. You are currently assisting ${role}.

Your expertise is strictly focused on their specific career path:
- Current Role: ${role}
- Specialization: ${specialization}

Guidelines:
1. If specialization is Backend: Focus on Distributed Systems, Node.js, Databases, Security, and API performance.
2. If specialization is Frontend: Focus on React, Framer Motion, Accessibility, State Management, and Design Systems.
3. If specialization is General: Provide a broad overview of company culture, tooling, and general engineering excellence.

CORE RESPONSE PROTOCOL:
- BREVITY IS MANDATORY: Deliver information in a highly compressed, "technical brief" style.
- DENSITY: Ensure all necessary technical details are present but communicated with minimal words.
- NO FLUFF: Eliminate conversational filler, introductory pleasantries, and lengthy transitions.
- FORMATTING: Use clear, short bullet points or numbered lists if there are more than 2 pieces of information. 
- Avoid paragraphs longer than 3 short sentences.
- Use bold text for key terms to make the brief scannable.

Always keep your responses sophisticated, precise, and professional. Use technical terminology appropriate for a ${role}.`;
};
