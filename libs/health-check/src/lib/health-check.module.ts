import { Module, DynamicModule } from '@nestjs/common';
import {
  ConfigureHealthController,
  HealthControllerOptions,
} from './health-check.controller';

@Module({})
export class HealthCheckModule {
  static register({ service }: HealthControllerOptions): DynamicModule {
    return {
      imports: [],
      module: HealthCheckModule,
      controllers: [ConfigureHealthController({ service })],
      exports: [],
    };
  }
}
