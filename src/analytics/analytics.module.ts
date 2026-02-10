import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { VehicleLiveState } from '../database/entities/vehicle-live.entity';
import { MeterHistory } from '../database/entities/meter-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      VehicleLiveState,
      MeterHistory, // 👈 THIS WAS MISSING
    ]),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
