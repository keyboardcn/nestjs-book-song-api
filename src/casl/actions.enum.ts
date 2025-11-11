export enum Role {
    ADMIN= 'admin',
    READER= 'reader',
    CONTRIBUTOR= 'contributor',
}

export enum Action {
    MANAGE = 'manage',
    READ= 'read',
    CREATE= 'create',
    PATCH= 'patch',
    DELETE= 'delete',
}

export type RoleType = `${Role}`;
export type ActionType = `${Action}`;