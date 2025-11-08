import { Test, TestingModule } from '@nestjs/testing';
import { Job } from 'bullmq';
import { AudiosService } from './audios.service';
import { Logger } from '@nestjs/common';

const mockLogger = {
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
  debug: jest.fn(),
  verbose: jest.fn(),
};

describe('AudiosService', () => {
  let service: AudiosService;
  let mockDelay: jest.Mock;

  const mockJob: Job = {
    id: '1',
    name: 'transcode',
    data: { filePath: '/path/to/audio/file.mp3' },
    updateProgress: jest.fn(),
  } as unknown as Job;

  beforeEach(async () => {
    mockDelay = jest.fn().mockResolvedValue(undefined);
    jest.spyOn(Logger.prototype, 'log').mockImplementation(mockLogger.log);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: AudiosService,
          useFactory: () => new AudiosService(mockDelay),
        },
      ],
    }).compile();
    service = module.get<AudiosService>(AudiosService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should process transcode job and update progress', async () => {
    const result = await service.process(mockJob);

    expect(result).toEqual({ message: 'Audio processing completed' });
    expect(mockJob.updateProgress).toHaveBeenCalledTimes(100);
    expect(mockLogger.log).toHaveBeenCalledWith(
      'Processing audio job:',
      mockJob.id,
      mockJob.name,
      mockJob.data,
    );
    expect(mockLogger.log).toHaveBeenCalledWith(
      'Audio job completed:',
      mockJob.id,
      mockJob.data,
    );
  });

  it('should throw error for unknown job name', async () => {
    const unknownJob: Job = {
      id: '2',
      name: 'unknown',
      data: {},
      updateProgress: jest.fn(),
    } as unknown as Job;

    await expect(service.process(unknownJob)).rejects.toThrow(
      'Unknown job name: unknown',
    );
  });
});
