export interface Task {
    id: number;
    title: string;
    description: string;
    date: string;
    time: string;
    location: string;
    status: 'Completed' | 'Ongoing' | 'Cancelled';
  }