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
interface ChangePassWordAction {
    label: 'change passowrd',
    title: 'change password | MOERRA',
    api: 'api/user/changepassword'  
}

// Combine individual action types into a union type for AuthSlug
type AuthSlugActions =
    | LoginAction
    | LoginOtherAction
    | ForgotPasswordAction
    | RegisterAction
    | LogoutAction
    | ResetPassowrdAction
    | RenewTokenAction
    | ChangePassWordAction;

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
    } as RenewTokenAction,
    ChangePassword: {
        label: 'change passowrd',
        title: 'change password | MOERRA',
        api: 'api/user/changepassword'
    } as ChangePassWordAction
};
    

export const UserSlug = {
    AddUser: {
        label: 'Add User',
        title: 'Add User | MOERRA',
        api: 'api/User/addnewuser'  
    },
    ListUser: {
        label: 'List User',
        title: 'List User | MOERRA',
        api: 'api/User/Listuser'
    },
    FilterUser: {
        label: 'Filter User',
        title: 'Filter User| MOERRA',
        api: 'api/User/Filteruser'
    },
    GetUser: {
        label: 'View Profile',
        title: 'View Profile | MOERRA',
        api: 'api/user/viewprofile?UserName='  
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

export const PostSlug = {
    AddPost: {
        label: 'Add Post',
        title: 'Add Post | MOERRA',
        api: 'api/Post/addnewpost'  
    },
    ListPost: {
        label: 'List Post',
        title: 'List Post | MOERRA',
        api: 'api/Post/Listpost'
    },
    FilterPost: {
        label: 'Filter Post',
        title: 'Filter Post| MOERRA',
        api: 'api/Post/Filterpost'
    },
    GetPost: {
        label: 'View Post',
        title: 'View Post | MOERRA',
        api: 'api/Post/?postId ='  
    },
    UpdatePost: {
        label: 'Update Post',
        title: 'Update Post | MOERRA',
        api: 'Update Post'  
    },
    ActivePost: {
        label: 'Active Post',
        title: 'Active Post | MOERRA',
        api: 'ActivePost'  
    }
}