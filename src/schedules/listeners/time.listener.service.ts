import { Injectable, Logger } from "@nestjs/common";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import * as tasksService from "../tasks.service";

@Injectable()
export class TimeListenerService {
    private readonly logger = new Logger(TimeListenerService.name);
    constructor(private readonly eventEmitter: EventEmitter2) {}   

    @OnEvent('time.*')
    handleTimeLoggedEvent(payload: tasksService.TimeLoggedEvent<Date | string>) {
        const count = this.eventEmitter.listenerCount('time.*');
        this.logger.log(`Total listeners for time.* event: ${count}`);
        this.logger.log(`Time Event Received: ${JSON.stringify(payload)}`);
    }

}