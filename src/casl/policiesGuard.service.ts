import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AppAbility, CaslAbilityFactoryService } from "./caslAbilityFactory.service";
import { PolicyHandler } from "./policy.handlers.interface";
import { CHECK_POLICIES_KEY } from "./policy.decorator";
import { ActionType } from "./actions.enum";

@Injectable()
export class PolicyGuardService implements CanActivate {
    private readonly logger = new Logger(PolicyGuardService.name);
    
    constructor(
        private reflector: Reflector,
        private caslAbilityFactoryService: CaslAbilityFactoryService,
    ){}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        this.logger.log('Test policy guard')
        const policyHandlers = this.reflector.get<PolicyHandler[]>(
            CHECK_POLICIES_KEY,
            context.getHandler()
        ) || [];
        const { user } = context.switchToHttp().getRequest();
        const ability = this.caslAbilityFactoryService.createForUser(user) as AppAbility;
        this.logger.log(`${JSON.stringify(ability)}`);
        return policyHandlers.every((handler) =>
            this.execPolicyHandler(handler, ability),
        )
    }
    private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
        if (typeof handler === 'function') {
            this.logger.log(handler(ability));
            return handler(ability);
        }
        return handler.handle(ability);
    }
}