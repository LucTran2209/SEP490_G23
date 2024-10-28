// Define AuthSlug as an object with specific actions
export const AuthSlug = {
  Login: {
    label: 'login',
    title: 'login | ERMS',
    api: 'api/Authentication/Login',
  },
  LoginOther: {
    label: 'login external',
    title: 'login external | ERMS',
    api: 'api/user/externallogin',
  },
  ForgotPassWord: {
    label: 'forgot-password',
    title: 'forgot password | ERMS',
    api: 'api/Authentication/ForgotPassword',
  },
  Register: {
    label: 'register',
    title: 'register | ERMS',
    api: 'api/Authentication/Register',
  },
  RenewToken: {
    label: 'renew token',
    api: 'renew-token',
  },
  ChangePassword: {
    label: 'change-passowrd',
    title: 'change password | ERMS',
    api: 'api/user/changepassword',
  },
  ResetPassWord: {
    label: 'reset-password/:token/:email',
    title: 'reset password | ERMS',
    api: 'api/Authentication/ResetPassword',
  },
};

export const StepRegisterLessor = {
  Step_register: {
    label: 'Step Register Lessor',
    title: 'Step Register Lessor | ERMS',
    api: 'RentalShop',
  },
};

export const UserSlug = {
  AddUser: {
    label: 'Add User',
    title: 'Add User | ERMS',
    api: 'User',
  },
  ListUser: {
    label: 'List User',
    title: 'List User | ERMS',
    api: 'User/listuser',
  },
  GetUser: {
    label: 'View Profile',
    title: 'View Profile | ERMS',
    api: 'User/viewprofile?Id=',
  },
  UpdateUser: {
    label: 'Update User',
    title: 'Update User | ERMS',
    api: 'User/updateprofile',
  },
  ActiveUser: {
    label: 'Active User',
    title: 'Active User | ERMS',
    api: 'User/activeuser',
  },
};

export const PostSlug = {
  AddPost: {
    label: 'Add Post',
    title: 'Add Post | ERMS',
    api: 'api/Post/addnewpost',
  },
  ListPost: {
    label: 'List Post',
    title: 'List Post | ERMS',
    api: 'api/Post/Listpost',
  },
  GetPost: {
    label: 'View Post',
    title: 'View Post | ERMS',
    api: 'api/Post/?postId =',
  },
  UpdatePost: {
    label: 'Update Post',
    title: 'Update Post | ERMS',
    api: 'Update Post',
  },
  ActivePost: {
    label: 'Active Post',
    title: 'Active Post | ERMS',
    api: 'ActivePost',
  },
};
export const ProductSlug = {
  AddProduct: {
    label: 'Add Product',
    title: 'Add Product | ERMS',
    api: 'Product',
  },
  ListProduct: {
    label: 'List Product',
    title: 'List Product | ERMS',
    api: 'Product/list',
  },
  GetProduct: {
    label: 'View Product',
    title: 'View Product | ERMS',
    api: 'api/Post/?postId =',
  },
  UpdateProduct: {
    label: 'Update Product',
    title: 'Update Product | ERMS',
    api: 'Product/',
  },
  ActiveProduct: {
    label: 'Active Product',
    title: 'Active Product | ERMS',
    api: 'ActivePost',
  },
};
export const OrderSlug = {
  AddOrder: {
    label: 'Add Order',
    title: 'Add Order | ERMS',
    api: 'api/Order',
  },
  ListOrder: {
    label: 'List Order',
    title: 'List Order | ERMS',
    api: 'api/Order',
  },
  GetOrder: {
    label: 'View Order',
    title: 'View Order | ERMS',
    api: 'api/Post/?postId =',
  },
  UpdateOrder: {
    label: 'Update Order',
    title: 'Update Order | ERMS',
    api: 'Order/',
  },
  ActiveOrder: {
    label: 'Active Order',
    title: 'Active Order | ERMS',
    api: 'ActiveOrder',
  },
};
export const CategorySlug = {
  ListCategory: {
    label: 'List Category',
    title: 'List Category | ERMS',
    api: 'api/Category',
  },
  ListSubCategory: {
    label: 'List SubCategory',
    title: 'List SubCategory | ERMS',
    api: 'SubCategory',
  }

}