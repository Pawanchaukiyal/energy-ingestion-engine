import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  root() {
    return {
      service: 'Energy Ingestion Engine',
      status: 'running',
      version: '1.0.0',
      docs: 'See README for API usage',
      timestamp: new Date().toISOString(),
    };
  }
}
