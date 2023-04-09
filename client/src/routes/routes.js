import config from '~/config';
import Home from '~/pages/Home';
import Products from '~/pages/Products';
import ProductDetail from '~/pages/ProductDetail';
import Auth from '~/pages/Auth';
import Cart from '~/pages/Cart';
import Checkout from '~/pages/Checkout';
import Blogs from '~/pages/Blogs';
import BlogDetail from '~/pages/BlogDetail';
import User from '~/pages/User';
import Admin from '~/pages/Admin';
import UserLayout from '~/layouts/UserLayout';
import AdminLayout from '~/layouts/AdminLayout/AdminLayout';
import { ProductAdmin } from '~/pages/Admin/Product';
import { OrderAdmin } from '~/pages/Admin/Order';
import { CustomerAdmin } from '~/pages/Admin/Customer';
import { OrderDetailAdmin } from '~/pages/Admin/OrderDetail';

// Public Routes
const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.products,
        component: Products,
    },
    {
        path: config.routes.productDetail,
        component: ProductDetail,
    },
    {
        path: config.routes.auth,
        component: Auth,
        isAuth: true,
    },
    {
        path: config.routes.cart,
        component: Cart,
    },
    {
        path: config.routes.checkout,
        component: Checkout,
    },
    {
        path: config.routes.blogs,
        component: Blogs,
    },
    {
        path: config.routes.blogDetail,
        component: BlogDetail,
    },

    {
        path: config.routes.admin,
        component: Admin,
        layout: AdminLayout,
    },
];

// Private Routes
const privateRoutes = [
    {
        path: config.routes.user,
        component: User,
        layout: UserLayout,
    },
    {
        path: config.routes.userInfo,
        component: User,
        layout: UserLayout,
    },
    {
        path: config.routes.orderAdmin,
        component: OrderAdmin,
        layout: AdminLayout,
    },
    {
        path: config.routes.orderDetailAdmin,
        component: OrderDetailAdmin,
        layout: AdminLayout,
    },
    {
        path: config.routes.productAdmin,
        component: ProductAdmin,
        layout: AdminLayout,
    },
    {
        path: config.routes.customerAdmin,
        component: CustomerAdmin,
        layout: AdminLayout,
    },
];

export { publicRoutes, privateRoutes };
