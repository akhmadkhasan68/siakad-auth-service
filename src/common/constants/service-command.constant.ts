export const ServiceCommands = {
    V1: {
        Login: {
            VerifyUserByEmailAndPassword:
                'auth.v1.login.verifyUserByEmailAndPassword',
            GetUserById: 'auth.v1.login.getUserById',
            GetUserByEmail: 'auth.v1.login.getUserByEmail',
        },
        Permissions: {
            FetchPaginate: 'auth.v1.permissions.fetchPaginate',
            FindOneById: 'auth.v1.permissions.findOneById',
            GetPermissionsByRoleIds:
                'auth.v1.permissions.GetPermissionsByRoleIds',
        },
        Roles: {
            FetchPaginate: 'auth.v1.roles.fetchPaginate',
            FindOneById: 'auth.v1.roles.findOneById',
            Create: 'auth.v1.roles.create',
            Update: 'auth.v1.roles.update',
            Delete: 'auth.v1.roles.delete',
        },
        Otp: {
            RequestOtp: 'auth.v1.otp.requestOtp',
            VerifyOtp: 'auth.v1.otp.verifyOtp',
        },
    },
};
