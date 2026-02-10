import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeterHistory } from './entities/meter-history.entity';
import { VehicleHistory } from './entities/vehicle-history.entity';
import { MeterLiveState } from './entities/meter-live.entity';
import { VehicleLiveState } from './entities/vehicle-live.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        MeterHistory,
        VehicleHistory,
        MeterLiveState,
        VehicleLiveState,
      ],
      synchronize: false, // 👈 TEMPORARY, VERY IMPORTANT
    }),
  ],
})
export class DatabaseModule {}
