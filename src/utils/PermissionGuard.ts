import * as discord from 'discord.js' 


export class PermissionGuard {
    permissions: string[]

    constructor(permissions: string[]) {
      this.permissions = permissions;
    }
  
    check(memberPermissions: string[]) {
      return this.permissions.every(
        (permission) => memberPermissions.includes(permission)
      );
    }
  }