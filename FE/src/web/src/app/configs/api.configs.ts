interface LoginAction {
    label: 'login';
    title: 'login | MOERRA';
    api: 'api/user/loginbyusernamepassword';
}

interface LoginOtherAction {
    label: 'login external';
    title: 'login external | MOERRA';
    api: 'api/user/externallogin';
}

interface ForgotPasswordAction {
    label: 'forgot password';
    title: 'forgot password | MOERRA';
    api: 'api/user/forgotpassword';
}

interface ResetPassowrdAction {
    label: 'reset password';
    title: 'reset password | MOERRA';
    api: 'api/user/resetpassword';
}
interface RegisterAction {
    label: 'register';
    title: 'register | MOERRA';
    api: 'api/user/register';
}

interface LogoutAction {
    label: '';
    title: '';
    api: 'api/user/logout';
}

interface RenewTokenAction {
    label: 'renew token';
    api: 'renew-token';
}

// Combine individual action types into a union type for AuthSlug
type AuthSlugActions =
    | LoginAction
    | LoginOtherAction
    | ForgotPasswordAction
    | RegisterAction
    | LogoutAction
    | ResetPassowrdAction
    | RenewTokenAction;

// Define AuthSlug as an object with specific actions
export const AuthSlug = {
    Login: {
        label: 'login',
        title: 'login | MOERRA',
        api: 'api/user/loginbyusernamepassword'
    } as LoginAction,
    LoginOther: {
        label: 'login external',
        title: 'login external | MOERRA',
        api: 'api/user/externallogin'
    } as LoginOtherAction,
    ForgotPassWord: {
        label: 'forgot password',
        title: 'forgot password | MOERRA',
        api: 'api/user/forgotpassword'
    } as ForgotPasswordAction,
    ResetPassWord: {
        label: 'reset password',
        title: 'reset password | MOERRA',
        api: 'api/user/resetpassword',
    },
    Register: {
        label: 'register',
        title: 'register | MOERRA',
        api: 'api/user/register'
    } as RegisterAction,
    Logout: {
        label: '',
        title: '',
        api: 'api/user/logout'
    } as LogoutAction,
    RenewToken: {
        label: 'renew token',
        api: 'renew-token'
    } as RenewTokenAction
};
    ChangePassWord: {
        label: 'change passowrd',
        title: 'change password | MOERRA',
        api: 'change password'  
    }
}
export const UserSlug = {
    AddUser: {
        label: 'Add User',
        title: 'Add User | MOERRA',
        api: 'AddUser'  
    },
    ListUser: {
        label: 'List User',
        title: 'List User | MOERRA',
        api: 'list user'
    },
    FilterUser: {
        label: 'Filter User',
        title: 'Filter User| MOERRA',
        api: 'FilterUser'
    },
    GetUser: {
        label: 'Get User',
        title: 'Get User | MOERRA',
        api: 'GetUser'  
    },
    UpdateUser: {
        label: 'Update User',
        title: 'Update User | MOERRA',
        api: 'Update User'  
    },
    ActiveUser: {
        label: 'Active User',
        title: 'Active User | MOERRA',
        api: 'ActiveUser'  
    }
}

