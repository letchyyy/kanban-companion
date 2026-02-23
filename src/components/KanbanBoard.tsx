import { useState } from "react";
import { Task, TaskStatus, COLUMNS, INITIAL_TASKS } from "@/lib/kanban-data";
import { KanbanColumn } from "./KanbanColumn";
import { CreateTaskDialog } from "./CreateTaskDialog";
import { Button } from "@/components/ui/button";
import { Plus, LayoutGrid } from "lucide-react";

export function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [createOpen, setCreateOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleDropTask = (taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status: newStatus,
              progress: newStatus === "completed" ? 100 : t.progress,
            }
          : t
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleCreateTask = (task: Task) => {
    setTasks((prev) => [...prev, task]);
  };

  const handleUpdateTask = (task: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
    setEditingTask(null);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("text/plain", taskId);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center">
              <LayoutGrid className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-card-foreground tracking-tight">Project Board</h1>
              <p className="text-xs text-muted-foreground">Manage your tasks with ease</p>
            </div>
          </div>
          <Button onClick={() => { setEditingTask(null); setCreateOpen(true); }} className="gap-2">
            <Plus className="h-4 w-4" />
            Create Task
          </Button>
        </div>
      </header>

      {/* Board */}
      <main className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-5 overflow-x-auto pb-4">
          {COLUMNS.map((col) => (
            <KanbanColumn
              key={col.id}
              status={col.id}
              tasks={tasks.filter((t) => t.status === col.id)}
              onDropTask={handleDropTask}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
              onDragStart={handleDragStart}
            />
          ))}
        </div>
      </main>

      {/* Create / Edit Dialog */}
      <CreateTaskDialog
        open={createOpen || !!editingTask}
        onOpenChange={(open) => {
          if (!open) {
            setCreateOpen(false);
            setEditingTask(null);
          }
        }}
        onCreateTask={handleCreateTask}
        editingTask={editingTask}
        onUpdateTask={handleUpdateTask}
      />
    </div>
  );
}
