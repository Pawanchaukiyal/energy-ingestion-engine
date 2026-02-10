import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { IngestionModule } from './ingestion/ingestion.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [DatabaseModule, IngestionModule, AnalyticsModule],
  controllers: [AppController],
})
export class AppModule {}
