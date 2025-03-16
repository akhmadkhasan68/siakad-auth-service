import { Controller, Get } from '@nestjs/common';
import {
    HealthCheck,
    HealthCheckService,
    MicroserviceHealthIndicator,
    TypeOrmHealthIndicator,
} from '@nestjs/terminus';

@Controller({
    path: 'health',
    version: '1',
})
export class HealthController {
    constructor(
        private readonly healthCheckService: HealthCheckService,
        private readonly microserviceHealthCheckService: MicroserviceHealthIndicator,
        private readonly databaseHealthCheckService: TypeOrmHealthIndicator,
    ) {}

    @Get()
    @HealthCheck()
    async health() {
        return this.healthCheckService.check([
            () => this.databaseHealthCheckService.pingCheck('database'),
        ]);
    }
}