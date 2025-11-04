import {Test, TestingModule} from '@nestjs/testing';
import { AudiosController } from './audios.controller';

describe('AudiosController', () => {
    let audiosController: AudiosController;
    const mockAudioQueue = {
        add: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AudiosController],
            providers: [
                {
                    provide: 'BullQueue_audios',
                    useValue: mockAudioQueue,
                },
            ],
        }).compile();

        audiosController = module.get<AudiosController>(AudiosController);
    });

    it('should be defined', () => {
        expect(audiosController).toBeDefined();
    });

    describe('transcodeAudio', () => {
        it('should add a transcode job to the audio queue', async () => {
            const body = { filePath: '/path/to/audio/file.mp3' };
            const ans = await audiosController.transcodeAudio(body);
            expect(mockAudioQueue.add).toHaveBeenCalledWith('transcode', body);
            expect(ans).toEqual({ message: 'Audio transcoding job added to the queue' });
        });
    }); 
});