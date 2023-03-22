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
        path: config.routes.user,
        component: User,
    },
];

// Private Routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
