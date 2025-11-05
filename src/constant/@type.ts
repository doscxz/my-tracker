export const enum Priority {
  LOW = 'Низкий',
  MEDIUM = 'Средний',
  HIGH = 'Высокий',
}

export type Details = {
  type: string;
  priority: Priority;
  tags: string;
};

export type Task = {
  id: number;
  title: string;
  status: string;
  details: Details;
  description: string;
  comments?: {
    id: number;
    comment: string;
  }[];
};
