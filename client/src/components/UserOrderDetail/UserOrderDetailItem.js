import { Link } from 'react-router-dom';
import images from '~/assets/images';
import config from '~/config';

function UserOrderDetailItem() {
    return (
        <tr>
            <td className="p-6 flex ">
                <Link className="product-img w-[100px]" to={config.routes.products}>
                    <img src={images.product1} alt="Art Deco Home" className="w-[74px] h-[74px] rounded-lg" />
                </Link>
                <Link className="flex flex-col justify-between group py-2" to={config.routes.products}>
                    {' '}
                    <h2 className="product-name text-[18px] transition-all group-hover:text-primary">Art Deco Home</h2>
                    <h2 className="product-name text-[14px] text-gray-400">#134567</h2>
                </Link>
            </td>
            <td className="py-6 ">1</td>
            <td className="py-6 ">$120.00</td>
            <td className="py-6">$120.00</td>
        </tr>
    );
}

export default UserOrderDetailItem;
