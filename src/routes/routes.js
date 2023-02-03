import Home from '~/pages/Home';
import config from '~/config';

// Public Routes
const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
    },
];

// Private Routes
const privateRoutes = [];

export { publicRoutes, privateRoutes };
