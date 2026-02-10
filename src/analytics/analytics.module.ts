import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { VehicleLiveState } from '../database/entities/vehicle-live.entity';
import { MeterLiveState } from '../database/entities/meter-live.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleLiveState, MeterLiveState])],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
