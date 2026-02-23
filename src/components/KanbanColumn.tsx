import { useState } from "react";
import { Task, TaskStatus, COLUMNS } from "@/lib/kanban-data";
import { TaskCard } from "./TaskCard";
import { cn } from "@/lib/utils";

interface KanbanColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onDropTask: (taskId: string, newStatus: TaskStatus) => void;
  onDeleteTask: (id: string) => void;
  onEditTask: (task: Task) => void;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
}

const columnColors: Record<TaskStatus, string> = {
  planned: "bg-kanban-planned",
  "in-progress": "bg-kanban-progress",
  completed: "bg-kanban-completed",
};

export function KanbanColumn({
  status,
  tasks,
  onDropTask,
  onDeleteTask,
  onEditTask,
  onDragStart,
}: KanbanColumnProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const column = COLUMNS.find((c) => c.id === status)!;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const taskId = e.dataTransfer.getData("text/plain");
    if (taskId) onDropTask(taskId, status);
  };

  return (
    <div className="flex-1 min-w-[300px]">
      <div className="flex items-center gap-2.5 mb-4 px-1">
        <div className={cn("h-2.5 w-2.5 rounded-full", columnColors[status])} />
        <h2 className="font-semibold text-sm text-foreground">{column.label}</h2>
        <span className="ml-auto text-xs font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
          {tasks.length}
        </span>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "kanban-column transition-all duration-200 rounded-xl min-h-[400px]",
          isDragOver && "drag-over"
        )}
      >
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={onDeleteTask}
            onEdit={onEditTask}
            onDragStart={onDragStart}
          />
        ))}
        {tasks.length === 0 && (
          <div className="flex items-center justify-center h-32 rounded-xl border-2 border-dashed border-border/60 text-sm text-muted-foreground">
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  );
}
