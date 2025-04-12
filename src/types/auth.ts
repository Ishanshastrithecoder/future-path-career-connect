
export interface User {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  profilePicture?: string;
  occupation?: string;
  education?: Education[];
  experience?: Experience[];
  skills?: string[];
  interests?: string[];
  resume?: Resume;
  assessments?: Assessment[];
  connections?: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
}

export interface Resume {
  id: string;
  template: string;
  customSections: ResumeSection[];
  lastUpdated: string;
}

export interface ResumeSection {
  id: string;
  title: string;
  content: string;
}

export interface Assessment {
  id: string;
  name: string;
  category: string;
  score: number;
  maxScore: number;
  completedAt: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
