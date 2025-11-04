import { Module } from "@nestjs/common";
import { TasksService } from "./tasks.service";
@Module({
    imports: [],
    controllers: [],
    providers: [
        TasksService
    ],  
})
export class TasksModule {}