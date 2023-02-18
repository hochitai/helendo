import config from '~/config';
import Home from '~/pages/Home';
import Products from '~/pages/Products';

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
];

// Private Routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
