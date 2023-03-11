import { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import request from '~/utils/httpRequest';
import Header from '~/layouts/components/Header';
import styles from './ProductDetail.module.scss';
import Breadcrumb from '~/components/Breadcrumb';
import ProductDetailItem from '~/components/ProductDetailItem';

const cx = classNames.bind(styles);

function ProductDetail() {
    const { name } = useParams();

    const [product, setProduct] = useState({});

    useEffect(() => {
        request.get('/products/' + name).then((res) => {
            setProduct(res.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Fragment>
            <Header />
            <Breadcrumb title={product.name} />

            <ProductDetailItem data={product} classNames={cx()} />
        </Fragment>
    );
}
export default ProductDetail;
