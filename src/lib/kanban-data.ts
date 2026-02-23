export type TaskStatus = "planned" | "in-progress" | "completed";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  progress: number;
  createdAt: Date;
  tags: string[];
}

export const COLUMNS: { id: TaskStatus; label: string }[] = [
  { id: "planned", label: "Planned" },
  { id: "in-progress", label: "In Progress" },
  { id: "completed", label: "Completed" },
];

let nextId = 7;

export function generateId(): string {
  return `task-${nextId++}`;
}

export const INITIAL_TASKS: Task[] = [
  {
    id: "task-1",
    title: "Design the landing page",
    description: "Create wireframes and high-fidelity mockups for the new landing page",
    status: "planned",
    progress: 0,
    createdAt: new Date(Date.now() - 86400000 * 2),
    tags: ["Design"],
  },
  {
    id: "task-2",
    title: "Set up CI/CD pipeline",
    description: "Configure GitHub Actions for automated testing and deployment",
    status: "planned",
    progress: 15,
    createdAt: new Date(Date.now() - 86400000),
    tags: ["DevOps"],
  },
  {
    id: "task-3",
    title: "Build authentication flow",
    description: "Implement login, signup, and password reset with email verification",
    status: "in-progress",
    progress: 60,
    createdAt: new Date(Date.now() - 86400000 * 3),
    tags: ["Backend"],
  },
  {
    id: "task-4",
    title: "Write API documentation",
    description: "Document all REST endpoints with examples and response schemas",
    status: "in-progress",
    progress: 35,
    createdAt: new Date(Date.now() - 86400000 * 4),
    tags: ["Docs"],
  },
  {
    id: "task-5",
    title: "Optimize database queries",
    description: "Identify and fix slow queries, add proper indexes",
    status: "completed",
    progress: 100,
    createdAt: new Date(Date.now() - 86400000 * 5),
    tags: ["Backend"],
  },
  {
    id: "task-6",
    title: "Mobile responsive audit",
    description: "Test and fix layout issues across all mobile breakpoints",
    status: "completed",
    progress: 100,
    createdAt: new Date(Date.now() - 86400000 * 6),
    tags: ["Frontend"],
  },
];
