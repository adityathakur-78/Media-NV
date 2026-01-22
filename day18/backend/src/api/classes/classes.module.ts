import { Module } from '@nestjs/common';
import { ClassesController } from './classes.controller';
import { ClassesService } from './classes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassEntity } from './class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClassEntity])],
  controllers: [ClassesController],
  providers: [ClassesService],
})
export class ClassesModule {}
