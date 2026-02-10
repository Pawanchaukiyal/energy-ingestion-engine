import { IsString, IsInt, IsNumber, IsDateString } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  vehicleId: string;

  @IsInt()
  soc: number;

  @IsNumber()
  kwhDeliveredDc: number;

  @IsNumber()
  batteryTemp: number;

  @IsDateString()
  timestamp: string;
}
