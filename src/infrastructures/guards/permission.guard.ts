import {
    ExecutionContext,
    ForbiddenException,
    Inject,
    mixin,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleGroupEnum } from 'src/common/enums/role-group.enum';
import { IUser } from 'src/databases/interaces/user.interface';
import { PermissionService } from 'src/modules/permission/services/permission.service';

export const PermissionGuard = (permissionKey: string): any => {
    class PermissionGuardMixin extends AuthGuard('jwt') {
        constructor(
            @Inject(PermissionService)
            private readonly permissionService: PermissionService,
        ) {
            super();
        }

        async canActivate(context: ExecutionContext) {
            const user = context.switchToHttp().getRequest().user as IUser;

            const roles = user.roles;
            const roleIds = roles.map((role) => role.id);
            const permissions = await this.permissionService.getPermissionsByRoleIds(roleIds,);

            if (
                roles.some(
                    (role) => role.roleGroup?.key !== RoleGroupEnum.Admin,
                )
            ) {
                return true;
            }

            if (!permissions) {
                throw new ForbiddenException('Forbidden');
            }

            const permissionKeys = permissions.map(
                (permission) => permission.key,
            );

            if (!permissionKeys.includes(permissionKey)) {
                throw new ForbiddenException('Forbidden');
            }

            return true;
        }
    }

    const guard = mixin(PermissionGuardMixin);
    return guard;
};
