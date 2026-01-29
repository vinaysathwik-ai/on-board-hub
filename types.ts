
export interface User {
  email: string;
  name: string;
  role: string;
  specialization: 'Backend' | 'Frontend' | 'General';
}

export interface Meeting {
  id: string;
  name: string;
  host: string;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'live' | 'attended';
  link: string;
}

export interface HourlyLog {
  hour: string;
  minutes: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}
