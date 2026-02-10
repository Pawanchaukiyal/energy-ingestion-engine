import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeterController } from './meter/meter.controller';
import { MeterService } from './meter/meter.service';
import { VehicleController } from './vehicle/vehicle.controller';
import { VehicleService } from './vehicle/vehicle.service';
import { MeterHistory } from '../database/entities/meter-history.entity';
import { MeterLiveState } from '../database/entities/meter-live.entity';
import { VehicleHistory } from '../database/entities/vehicle-history.entity';
import { VehicleLiveState } from '../database/entities/vehicle-live.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      MeterHistory,
      MeterLiveState,
      VehicleHistory,
      VehicleLiveState,
    ]),
  ],
  controllers: [MeterController, VehicleController],
  providers: [MeterService, VehicleService],
})
export class IngestionModule {}
