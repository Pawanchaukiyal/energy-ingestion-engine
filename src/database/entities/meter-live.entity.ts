import { Entity, PrimaryColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'meter_live_state' })
export class MeterLiveState {
  @PrimaryColumn({ name: 'meter_id' })
  meterId: string;

  @Column({ name: 'kwh_consumed_ac', type: 'float' })
  kwhConsumedAc: number;

  @Column({ type: 'float' })
  voltage: number;

  @UpdateDateColumn({ name: 'last_updated_at', type: 'timestamptz' })
  lastUpdatedAt: Date;
}
