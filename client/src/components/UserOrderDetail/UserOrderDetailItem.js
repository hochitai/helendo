import { Link } from 'react-router-dom';
import images from '~/assets/images';
import config from '~/config';

function UserOrderDetailItem({ data }) {
    return (
        <tr>
            <td className="p-6 flex ">
                <Link className="product-img w-[100px]" to={config.routes.products + '/' + data.productDetail[0].slug}>
                    <img
                        src={data.productDetail[0].image}
                        alt="Art Deco Home"
                        className="w-[74px] h-[74px] rounded-lg"
                    />
                </Link>
                <Link
                    className="flex flex-col justify-between group py-2"
                    to={config.routes.products + '/' + data.productDetail[0].slug}
                >
                    <h2 className="product-name text-[18px] transition-all group-hover:text-primary">
                        {data.productDetail[0].name}
                    </h2>
                    <h2 className="product-name text-[14px] text-gray-400">{data.productDetail[0]._id.slice(0, 8)}</h2>
                </Link>
            </td>
            <td className="py-6 ">{data.quantity}</td>
            <td className="py-6 ">${data.price.toFixed(2)}</td>
            <td className="py-6">${data.subTotal.toFixed(2)}</td>
        </tr>
    );
}

export default UserOrderDetailItem;
