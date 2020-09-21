"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionGuard = void 0;
class PermissionGuard {
    constructor(permissions) {
        this.permissions = permissions;
    }
    check(memberPermissions) {
        return this.permissions.every((permission) => memberPermissions.includes(permission));
    }
}
exports.PermissionGuard = PermissionGuard;
