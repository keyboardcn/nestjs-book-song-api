import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { AudiosController } from './audios.controller';
import { AudiosService, DelayFn } from './audios.service';
const delay: DelayFn = (ms: number): Promise<void> => {
  return new Promise((r) => {
    r();
    setTimeout(() => {}, ms);
  });
};
@Module({
  imports: [
    BullModule.registerQueue({
      name: 'audios',
    }),
  ],
  controllers: [AudiosController],
  providers: [
    {
      provide: AudiosService,
      useFactory: () => new AudiosService(delay),
    },
  ],
})
export class AudiosModule {}
