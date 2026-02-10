import { Controller, Post, Body } from '@nestjs/common';
import { MeterService } from './meter.service';
import { CreateMeterDto } from './dto/create-meter.dto';

@Controller('ingest/meter')
export class MeterController {
  constructor(private readonly meterService: MeterService) {}

  @Post()
  ingestMeter(@Body() body: CreateMeterDto) {
    return this.meterService.ingest(body);
  }
}
