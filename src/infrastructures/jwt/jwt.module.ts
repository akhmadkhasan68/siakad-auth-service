import { Module } from "@nestjs/common";
import { UserModule } from "src/modules/user/user.module";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    imports: [
        UserModule,
    ],
    providers: [
        JwtStrategy
    ],
    exports: [JwtStrategy],
})
export class JwtModule {}