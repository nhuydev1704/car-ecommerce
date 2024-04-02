import LoginPage from '@/features/Auth/Login/pages';
import HomePage from '@/features/App/home/page';
import CustomerPage from '@/features/App/customer/pages';
import NotFoundPage from '@/features/Notfound';
import RegisterPage from '@/features/Auth/Register';
import CategoryPage from '@/features/App/category/pages';
import ProductPage from '@/features/App/product/pages';
import IntroducePage from '@/features/App/introduce/pages';

// định nghĩa router
export const routerPage = {
    // public....

    // private....
    home: '/',
    dashboard: '/dashboard',
    customer: '/customer',
    category: '/category',
    product: '/product',
    introduce: '/introduce',
    // auth....
    login: '/auth/login',
    register: '/auth/register',
};

// public chứa những router không cần đăng nhập hoặc web view
const PublicRoutes = [{ path: '*', element: <NotFoundPage /> }];

// private router khi đã đăng nhập
const PrivateRoutes = [
    // {
    //     path: routerPage.home,
    //     element: <HomePage />,
    // },
    {
        path: routerPage.home,
        element: <HomePage />,
    },
    {
        path: routerPage.category,
        element: <CategoryPage />,
    },
    {
        path: routerPage.product,
        element: <ProductPage />,
    },
    {
        path: routerPage.introduce,
        element: <IntroducePage />,
    },
    {
        path: routerPage.customer,
        element: <CustomerPage />,
    },
    ...PublicRoutes,
];

// auth router khi chưa đăng nhập
const AuthRoutes = [
    {
        path: routerPage.login,
        element: <LoginPage />,
    },
    {
        path: routerPage.register,
        element: <RegisterPage />,
    },
    ...PublicRoutes,
];

export { PrivateRoutes, AuthRoutes };
