import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseFilters,
} from '@nestjs/common';
import { FilterExeptionFilter } from 'src/filters/filter-exeption/filter-exeption.filter';

@Controller('exception')
@UseFilters(FilterExeptionFilter)
export class ExceptionController {
  @Get('hello/:id')
  getHello(@Param('id', ParseIntPipe) id: number) {
    return { message: `Your ID is: ${id}` };
  }
}
