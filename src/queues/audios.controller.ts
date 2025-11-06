import { InjectQueue } from '@nestjs/bullmq';
import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { Queue } from 'bullmq';

/** queue producer */
@Controller('audios')
@Injectable()
export class AudiosController {
  constructor(@InjectQueue('audios') private audioQueue: Queue) {}

  @Post('transcode')
  async transcodeAudio(@Body() body: any): Promise<any> {
    await this.audioQueue.add('transcode', body);
    return { message: 'Audio transcoding job added to the queue' };
  }
}
