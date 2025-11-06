import { Module } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { TimeListenerService } from "./listeners/time.listener.service";
@Module({
    imports: [],
    controllers: [],
    providers: [
        TasksService,
        TimeListenerService
    ],  
})
export class TasksModule {}