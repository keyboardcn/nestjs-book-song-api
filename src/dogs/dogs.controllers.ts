import { Controller, Get, Res, StreamableFile } from '@nestjs/common';
import { DogsService } from './dogs.service';
import type { Response } from 'express';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Get()
  async getDogs(
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile | undefined> {
    try {
      const imageBuffer = await this.dogsService.getDogs();
      res.set({
        'Content-Type': 'image/jpeg',
        'Content-Disposition': 'inline; filename="dog.jpg"',
      });
      return new StreamableFile(Buffer.from(imageBuffer));
    } catch (error) {
      res.status(500).send('Error retrieving dog image');
    }
  }
}
