import { TaskPriority, TaskStage } from "@models/task.model";

export type TaskCreateDTO = {
  code: string;
  name: string;
  description: string;
  project: string;
  owner: string;
  priority: TaskPriority;
  due_date: string;
}