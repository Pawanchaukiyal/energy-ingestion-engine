import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { IngestionModule } from './ingestion/ingestion.module';
import { AnalyticsModule } from './analytics/analytics.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [IngestionModule, AnalyticsModule, DatabaseModule],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}
