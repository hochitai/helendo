const apis = {
    getAllProducts: '/products',
    searchProducts: '/products/search',
    createProduct: '/products/create',
    updateProduct: '/products/update',
    searchCate: '/types/cate/search',
    searchTag: '/types/tag/search',
    searchSize: '/types/size/search',
    login: '/customers/login',
    register: '/customers/register',
    getAllCustomer: '/customers',
    getTypes: '/types',
    createBill: '/bills/create',
    getBill: '/bills',
    getAllBill: '/bills/all',
    getBillByState: '/bills/state',
    changeBillState: '/bills/changeState',
    updateInfo: '/customers/updateInfo',
    changePassword: '/customers/changePassword',
    loginAdmin: '/users/login',
};

export default apis;
