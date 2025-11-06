import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
export type TimeLoggedEvent<T> = {
  mark: T;
  payload?: any;
};

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    private schedulerRegistry: SchedulerRegistry,
    private eventEmitter: EventEmitter2,
  ) {}

  @Cron(CronExpression.EVERY_30_SECONDS, {
    name: 'logTimeTask',
  })
  handleCron() {
    const date = new Date();
    this.logger.log(`Current Time: ${date.toISOString()}`);
    this.eventEmitter.emit('time.logged', 
      { mark: date, payload: 'logTimeTask' } as TimeLoggedEvent<Date>
    );
  }

  // Scheduled task to run every 5 minutes
  @Cron('0 5,15,25,35,45,55 * * * *', {
    name: 'cleanupTask',
  })
  handleCleanup() {
    this.logger.log('Performing cleanup task...');
    // Add your cleanup logic here
    const job = this.schedulerRegistry.getCronJob('logTimeTask');
    job.stop();
    this.logger.log('Stopped logTimeTask cron job.');
    this.eventEmitter.emit('time.cleaned', 
      { mark: new Date().toISOString(), payload: 'cleanupTask' } as TimeLoggedEvent<string>
    );
  }

  @Cron(CronExpression.EVERY_10_MINUTES, {
    name: 'reStartLogTimeTask',
  })
  reStartLogTimeTask() {
    this.logger.log('This task restart.');
    const job = this.schedulerRegistry.getCronJob('logTimeTask');
    job.start();
    this.logger.log(`Restarted ${job.name} cron job.`);
    this.eventEmitter.emit('time.restarted', 
      { mark: job.name, payload: null } as TimeLoggedEvent<string>
    );
  }
}