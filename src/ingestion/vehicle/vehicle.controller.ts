import { Controller, Post, Body } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Controller('ingest/vehicle')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  ingestVehicle(@Body() body: CreateVehicleDto) {
    return this.vehicleService.ingest(body);
  }
}
