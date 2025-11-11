import { AbilityBuilder, createMongoAbility, detectSubjectType, ExtractSubjectType, InferSubjects, MongoAbility } from "@casl/ability";
import { Injectable, Logger } from "@nestjs/common";
import { Book } from "src/models/book.model";
import { User } from "src/models/user.model";
import { Action, Role } from "./actions.enum";
import { Author } from "src/models/author.model";

type Subjects = InferSubjects<typeof Book | typeof User> | 'all';
export type AppAbility = MongoAbility<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactoryService {
    private readonly logger = new Logger(CaslAbilityFactoryService.name);
    
    createForUser(user: User) {
        this.logger.log(`${JSON.stringify(user)}`);
        const { can, cannot, build } = new AbilityBuilder(createMongoAbility);
        if (user.roles === Role.ADMIN) {
            can(Action.MANAGE, 'all');
        } else if (user.roles === Role.READER) {
            can(Action.READ, 'all');
        } else if (user.roles === Role.CONTRIBUTOR) {
            can(Action.READ, 'all');
            can(Action.DELETE, Book, { 'author.user_id': user.id } as any);
            can(Action.PATCH, Book, { 'author.user_id': user.id } as any);
        }
        return build({
            detectSubjectType: (item) => 
                item.constructor as ExtractSubjectType<Subjects>,
        });
    }
}