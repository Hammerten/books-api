import { Controller, Get } from '@nestjs/common';

type HealthControllerType = { new (...args: any[]): any };

export interface HealthControllerOptions {
  service: string;
}

export function ConfigureHealthController({
  service,
}: HealthControllerOptions): HealthControllerType {
  @Controller('/')
  class HealthController {
    @Get('/')
    public check() {
      return {
        status: 200,
        message: 'ok',
        service,
      };
    }
  }

  return HealthController;
}
