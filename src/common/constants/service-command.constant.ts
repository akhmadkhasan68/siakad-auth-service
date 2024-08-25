export const ServiceCommands = {
    AuthService: {
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
            ForgotPassword: {
                RequestForgotPassword:
                    'auth.v1.forgotPassword.requestForgotPassword',
                VerifyForgotPassword:
                    'auth.v1.forgotPassword.verifyForgotPassword',
                ResetPassword: 'auth.v1.forgotPassword.resetPassword',
            },
        },
    },
    NotificationService: {
        V1: {
            Email: {
                SendEmail: 'notification.v1.email.sendEmail',
                SendBulkEmail: 'notification.v1.email.sendBulkEmail',
                SendEmailOTP: 'notification.v1.email.sendEmailOTP',
                SendEmailForgotPassword:
                    'notification.v1.email.sendEmailForgotPassword',
            },
            InApp: {
                FetchPaginate: 'notification.v1.inApp.fetchPaginate',
                FindOneById: 'notification.v1.inApp.findOneById',
            },
        },
    },
};
