import { Processor, WorkerHost } from "@nestjs/bullmq";

/** queue: consumer */
@Processor('audios')
export class AudiosService extends WorkerHost {
    async process(job: any): Promise<any> {
        console.log('Processing audio job:', job.id, job.name, job.data);
        // Simulate audio processing task
        switch (job.name) {
            case 'transcode':
                let progress = 0;
                for (let i =0; i<100; i++) {
                    await new Promise(resolve => setTimeout(resolve, 50)); // Simulate work
                    progress += 1;
                    await job.updateProgress(progress);
                }
                console.log('Audio job completed:', job.id, job.data);
                return { message: 'Audio processing completed' };
            default:
                throw new Error(`Unknown job name: ${job.name}`);
        }
    }
}