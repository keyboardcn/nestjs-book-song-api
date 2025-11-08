import { Module } from '@nestjs/common';
import { DogsController } from './dogs.controllers';
import { DogsService } from './dogs.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [DogsController],
  providers: [DogsService],
})
export class DogsModule {}
