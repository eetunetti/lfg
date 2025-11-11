export type UserId = string;

export type Role = {
    name: string;
    description?: string;
    supervisorUserId?: UserId;
};

export type Group = {
    groupId: string;
    name: string;
    description?: string;
    creationDateIso: string;
    creatorUserId: UserId;
    adminUserIds: UserId[];
    memberUserIds: UserId[];
    roles?: Role[];
};

export type CreateGroupInput = {
    name: string;
    description?: string;
    creatorUserId: UserId;
};

