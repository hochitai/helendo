import config from '~/config';
import Home from '~/pages/Home';
import Products from '~/pages/Products';
import ProductDetail from '~/pages/ProductDetail';
import Auth from '~/pages/Auth';

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
    },
];

// Private Routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
