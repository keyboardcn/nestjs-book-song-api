import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';

export type DelayFn = (ms: number) => Promise<void>;

/** queue: consumer */
@Processor('audios')
export class AudiosService extends WorkerHost {
  private readonly logger = new Logger(AudiosService.name);
  constructor(
    private readonly delay: DelayFn = (ms) =>
      new Promise((r) => setTimeout(r, ms)),
  ) {
    super();
  }
  async process(job: any): Promise<any> {
    this.logger.log('Processing audio job:', job.id, job.name, job.data);

    switch (job.name) {
      case 'transcode':
        let progress = 0;
        for (let i = 0; i < 100; i++) {
          await this.delay(50);
          progress += 1;
          await job.updateProgress(progress);
        }
        this.logger.log('Audio job completed:', job.id, job.data);
        return { message: 'Audio processing completed' };
      default:
        throw new Error(`Unknown job name: ${job.name}`);
    }
  }
}
