import { Controller, NotFoundException } from "@nestjs/common";
import { MessagePattern, RpcException } from "@nestjs/microservices";

@Controller()
export class MainController {
    constructor() {}

    @MessagePattern('test')
    async test(data: string): Promise<string> {
        throw new RpcException(new NotFoundException('test'));
        return data;
    }
}
