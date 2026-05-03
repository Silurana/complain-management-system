export interface Stats {
  total: number;
  pending: number;
  in_progress: number;
  resolved: number;
  rejected: number;
  categoryStats?: { name: string; value: number }[];
  timeSeriesStats?: { date: string; complaints: number }[];
  weeklyStats?: { day: string; value: number }[];
}

export interface Complaint {
  id: string;
  title: string;
  subject: string;
  description: string;
  status: string;
  response: string;
  imageUrl?: string;
  user?: {
    fullName: string;
    email: string;
  };
}

export interface UserProfile {
  fullName: string;
  email: string;
  regNo: string;
}

export interface AdminProfile {
  fullName: string;
  email: string;
  regNo: string;
}
