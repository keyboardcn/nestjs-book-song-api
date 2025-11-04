import { Injectable } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  @Cron(CronExpression.EVERY_30_SECONDS, {
    name: 'logTimeTask',
  })
  handleCron() {
    const date = new Date();
    console.log(`Current Time: ${date.toISOString()}`);
  }

  // Scheduled task to run every 5 minutes
  @Cron('0 5,15,25,35,45,55 * * * *', {
    name: 'cleanupTask',
  })
  handleCleanup() {
    console.log('Performing cleanup task...');
    // Add your cleanup logic here
    const job = this.schedulerRegistry.getCronJob('logTimeTask');
    job.stop();
    console.log('Stopped logTimeTask cron job.');
  }

  @Cron(CronExpression.EVERY_10_MINUTES, {
    name: 'reStartLogTimeTask',
  })
  reStartLogTimeTask() {
    console.log('This task restart.');
    const job = this.schedulerRegistry.getCronJob('logTimeTask');
    job.start();
    console.log(`Restarted ${job.name} cron job.`);
  }
}