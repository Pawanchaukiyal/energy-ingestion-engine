import { Module } from '@nestjs/common';

import { IngestionModule } from './ingestion/ingestion.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [IngestionModule, AnalyticsModule, DatabaseModule]
})
export class AppModule {}
