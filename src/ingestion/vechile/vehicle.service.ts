import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleHistory } from '../../database/entities/vehicle-history.entity';
import { VehicleLiveState } from '../../database/entities/vehicle-live.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectRepository(VehicleHistory)
    private readonly historyRepo: Repository<VehicleHistory>,
    @InjectRepository(VehicleLiveState)
    private readonly liveRepo: Repository<VehicleLiveState>,
  ) {}

  async ingest(data: CreateVehicleDto) {
    // 1️⃣ History INSERT
    await this.historyRepo.insert({
      vehicleId: data.vehicleId,
      soc: data.soc,
      kwhDeliveredDc: data.kwhDeliveredDc,
      batteryTemp: data.batteryTemp,
      timestamp: data.timestamp,
    });

    // 2️⃣ Live UPSERT
    await this.liveRepo.save({
      vehicleId: data.vehicleId,
      soc: data.soc,
      kwhDeliveredDc: data.kwhDeliveredDc,
      batteryTemp: data.batteryTemp,
    });

    return { status: 'ok' };
  }
}
