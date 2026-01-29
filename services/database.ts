
import { User, Meeting, HourlyLog } from '../types';

export interface DBUser extends User {
  password: string;
}

const DEFAULT_USERS: DBUser[] = [
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
  }
];

const INITIAL_MEETINGS: Meeting[] = [
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
  },
  {
    id: '3',
    name: 'Weekly Security Audit',
    host: 'Security Lead',
    startTime: '03:00 PM',
    endTime: '04:00 PM',
    status: 'scheduled',
    link: 'https://meet.google.com/sec-audit-now'
  }
];

const getStoredUsers = (): DBUser[] => {
  const stored = localStorage.getItem('onboard_hub_users');
  if (!stored) {
    localStorage.setItem('onboard_hub_users', JSON.stringify(DEFAULT_USERS));
    return DEFAULT_USERS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_USERS;
  }
};

export const Database = {
  async authenticate(email: string, pass: string): Promise<User | null> {
    await new Promise(resolve => setTimeout(resolve, 600)); 
    const users = getStoredUsers();
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === pass);
    if (!found) return null;
    const { password: _, ...userSession } = found;
    return userSession;
  },

  async register(newUser: DBUser): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 600));
    const users = getStoredUsers();
    if (users.some(u => u.email.toLowerCase() === newUser.email.toLowerCase())) {
      return false;
    }
    users.push(newUser);
    localStorage.setItem('onboard_hub_users', JSON.stringify(users));
    return true;
  },

  async getMeetings(): Promise<Meeting[]> {
    return [...INITIAL_MEETINGS];
  },

  async getHourlyStats(): Promise<HourlyLog[]> {
    return Array.from({ length: 24 }, (_, i) => ({
      hour: `${i.toString().padStart(2, '0')}:00`,
      minutes: i >= 9 && i <= 18 ? Math.floor(Math.random() * 45) + 15 : 0
    }));
  }
};
