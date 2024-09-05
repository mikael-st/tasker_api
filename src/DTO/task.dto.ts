import { Project } from "@models/project.model";
import { TaskPriority, TaskStage } from "@models/task.model";
import { User } from "@models/user.model";

export type TaskListDTO = {
  name?: string;
  owner?: User;
  stage?: TaskStage;
  priority?: TaskPriority;
  due_date?: Date;
}


  