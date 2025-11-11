import { AppAbility } from "./caslAbilityFactory.service";
interface IPolicyHandler {
    handle(ability: AppAbility): boolean;
}

type PolicyHandlerCallback = (ability: AppAbility) => boolean;
export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;