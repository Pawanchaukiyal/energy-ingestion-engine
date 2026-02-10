import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MeterHistory } from '../../database/entities/meter-history.entity';
import { MeterLiveState } from '../../database/entities/meter-live.entity';
import { CreateMeterDto } from './dto/create-meter.dto';

@Injectable()
export class MeterService {
  constructor(
    @InjectRepository(MeterHistory)
    private readonly historyRepo: Repository<MeterHistory>,
    @InjectRepository(MeterLiveState)
    private readonly liveRepo: Repository<MeterLiveState>,
  ) {}

  async ingest(data: CreateMeterDto) {
    try {
      await this.historyRepo.insert({
        meterId: data.meterId,
        kwhConsumedAc: data.kwhConsumedAc,
        voltage: data.voltage,
        timestamp: data.timestamp,
      });

      await this.liveRepo.save({
        meterId: data.meterId,
        kwhConsumedAc: data.kwhConsumedAc,
        voltage: data.voltage,
      });

      return { status: 'ok' };
    } catch (error) {
      console.error('Meter ingestion failed:', error);
      throw new InternalServerErrorException('Meter ingestion failed');
    }
  }
}
