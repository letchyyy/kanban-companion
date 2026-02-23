import { Task, TaskStatus } from "@/lib/kanban-data";
import { GripVertical, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDistanceToNow } from "date-fns";

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDragStart: (e: React.DragEvent, taskId: string) => void;
}

export function TaskCard({ task, onDelete, onEdit, onDragStart }: TaskCardProps) {
  const timeAgo = formatDistanceToNow(task.createdAt, { addSuffix: true });

  const cardAccent: Record<TaskStatus, string> = {
    planned: "border-l-kanban-planned",
    "in-progress": "border-l-kanban-progress",
    completed: "border-l-kanban-completed bg-success/5",
  };

  const progressColor: Record<TaskStatus, string> = {
    planned: "[&>div]:bg-kanban-planned",
    "in-progress": "[&>div]:bg-kanban-progress",
    completed: "[&>div]:bg-kanban-completed",
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      className={cn(
        "group cursor-grab active:cursor-grabbing rounded-xl bg-card border border-border border-l-[3px] p-4 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5",
        cardAccent[task.status]
      )}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <GripVertical className="h-3.5 w-3.5 opacity-0 group-hover:opacity-60 transition-opacity" />
          <span>{timeAgo}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="h-6 w-6 flex items-center justify-center rounded-md hover:bg-muted transition-colors opacity-0 group-hover:opacity-100">
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(task)}>
              <Pencil className="h-3.5 w-3.5 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(task.id)}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="h-3.5 w-3.5 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <h3 className="font-semibold text-sm text-card-foreground mb-1.5 leading-snug">
        {task.title}
      </h3>
      <p className="text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
        {task.description}
      </p>

      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            Progress
          </span>
          <span className="text-xs font-medium text-muted-foreground">{task.progress}%</span>
        </div>
        <Progress value={task.progress} className={cn("h-1.5", progressColor[task.status])} />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {task.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-[10px] px-2 py-0.5 font-medium">
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
