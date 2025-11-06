import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { AudiosController } from './audios.controller';
import { AudiosService } from './audios.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'audios',
    }),
  ],
  controllers: [AudiosController],
  providers: [AudiosService],
})
export class AudiosModule {}
