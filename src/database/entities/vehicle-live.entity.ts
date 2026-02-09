import { Entity, PrimaryColumn, Column, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'vehicle_live_state' })
export class VehicleLiveState {
  @PrimaryColumn({ name: 'vehicle_id' })
  vehicleId: string;

  @Column({ type: 'int' })
  soc: number;

  @Column({ name: 'kwh_delivered_dc', type: 'float' })
  kwhDeliveredDc: number;

  @Column({ name: 'battery_temp', type: 'float' })
  batteryTemp: number;

  @UpdateDateColumn({ name: 'last_updated_at', type: 'timestamptz' })
  lastUpdatedAt: Date;
}
