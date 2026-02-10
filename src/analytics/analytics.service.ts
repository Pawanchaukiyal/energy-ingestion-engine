import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleLiveState } from '../database/entities/vehicle-live.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(VehicleLiveState)
    private readonly vehicleLiveRepo: Repository<VehicleLiveState>,
  ) {}

  async getPerformance(vehicleId: string) {
    const vehicle = await this.vehicleLiveRepo.findOne({
      where: { vehicleId },
    });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle ${vehicleId} not found`);
    }

    const acTotal = 10; // placeholder (architecture-focused assignment)
    const dcTotal = vehicle.kwhDeliveredDc;
    const efficiency = dcTotal / acTotal;

    return {
      vehicleId,
      acEnergyConsumed: acTotal,
      dcEnergyDelivered: dcTotal,
      efficiency,
      avgBatteryTemp: vehicle.batteryTemp,
    };
  }
}
