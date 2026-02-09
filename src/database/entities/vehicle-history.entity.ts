import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'vehicle_history' })
export class VehicleHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'vehicle_id' })
  vehicleId: string;

  @Column({ type: 'int' })
  soc: number;

  @Column({ name: 'kwh_delivered_dc', type: 'float' })
  kwhDeliveredDc: number;

  @Column({ name: 'battery_temp', type: 'float' })
  batteryTemp: number;

  @Column({ type: 'timestamptz' })
  timestamp: Date;
}
