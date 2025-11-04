import {Test, TestingModule} from '@nestjs/testing';
import { Job } from 'bullmq';
import { AudiosService } from './audios.service';
import { time } from 'console';

describe('AudiosService', () => {
  let service: AudiosService;

  const mockJob: Job = {
    id: '1',
    name: 'transcode',
    data: { filePath: '/path/to/audio/file.mp3' },
    updateProgress: jest.fn(),
  } as unknown as Job;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [AudiosService],
    }).compile();
    
    jest.spyOn(console, 'log').mockImplementation(() => {}); // Mock console.log
    jest.spyOn(global, 'setTimeout').mockImplementation((cb) => cb() as any); // Fast-forward timeouts

    service = module.get<AudiosService>(AudiosService);
  });

  afterAll(() => {
    (console.log as jest.Mock).mockRestore();
    (global.setTimeout as unknown as jest.Mock).mockRestore();
  });

    describe('process', () => { 
        it('should process transcode job and update progress', async () => {
            const result = await service.process(mockJob);
            expect(result).toEqual({ message: 'Audio processing completed' });
            expect(mockJob.updateProgress).toHaveBeenCalledTimes(100);
            expect(console.log).toHaveBeenCalledWith('Processing audio job:', mockJob.id, mockJob.name, mockJob.data);
            expect(console.log).toHaveBeenCalledWith('Audio job completed:', mockJob.id, mockJob.data);
        });

        it('should throw error for unknown job name', async () => {
            const unknownJob: Job = {
                id: '2',
                name: 'unknown',
                data: {},
                updateProgress: jest.fn(),
            } as unknown as Job;
            
            await expect(service.process(unknownJob)).rejects.toThrow('Unknown job name: unknown');
        });
    });
});