import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehicleLiveState } from '../database/entities/vehicle-live.entity';
import { MeterHistory } from '../database/entities/meter-history.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(VehicleLiveState)
    private readonly vehicleLiveRepo: Repository<VehicleLiveState>,
    @InjectRepository(MeterHistory)
    private readonly meterHistoryRepo: Repository<MeterHistory>,
  ) {}

  async getPerformance(vehicleId: string) {
    const vehicle = await this.vehicleLiveRepo.findOne({
      where: { vehicleId },
    });

    if (!vehicle) {
      throw new NotFoundException(`Vehicle ${vehicleId} not found`);
    }

    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const result = await this.meterHistoryRepo
      .createQueryBuilder('m')
      .select('SUM(m.kwhConsumedAc)', 'acTotal')
      .where('m.timestamp >= :since', { since })
      .getRawOne();

    const acTotal = Number(result.acTotal ?? 0);
    const dcTotal = vehicle.kwhDeliveredDc;

    return {
      vehicleId,
      acEnergyConsumed: acTotal,
      dcEnergyDelivered: dcTotal,
      efficiency: acTotal > 0 ? dcTotal / acTotal : 0,
      avgBatteryTemp: vehicle.batteryTemp,
    };
  }
}
