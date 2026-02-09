import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'meter_history' })
export class MeterHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'meter_id' })
  meterId: string;

  @Column({ name: 'kwh_consumed_ac', type: 'float' })
  kwhConsumedAc: number;

  @Column({ type: 'float' })
  voltage: number;

  @Column({ type: 'timestamptz' })
  timestamp: Date;
}
