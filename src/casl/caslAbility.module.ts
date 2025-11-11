import { Module } from "@nestjs/common";
import { CaslAbilityFactoryService } from "./caslAbilityFactory.service";
import { PolicyGuardService } from "./policiesGuard.service";

@Module({
    providers: [
        CaslAbilityFactoryService,
        PolicyGuardService
    ],
    exports: [CaslAbilityFactoryService, PolicyGuardService],
})
export class CaslModule {}