import { Types } from "mongoose";

export enum Role {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN= "ADMIN",
    USER="USER",
    GUIDE="GUIDE",
}

export interface IAuthProvider {
    provider: "google" | "credential"; //Google
    providerId: string;
}

export enum IsActive  {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
}

export interface IUser {
    name: string;
    email: string;
    password ?: string;
    phone ?: string;
    picture ?: string;
    address ?: string;
    isDeleted ?: string;
    isActive ?: IsActive;
    isVerified ?: boolean;
    role: Role;

    auths: IAuthProvider[]
    booking ?: Types.ObjectId[]
    guide ?: Types.ObjectId[]
}