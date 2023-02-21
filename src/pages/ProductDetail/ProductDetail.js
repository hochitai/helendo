import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import Header from '~/layouts/components/Header';
import styles from './ProductDetail.module.scss';
import Breadcrumb from '~/components/Breadcrumb';
import ProductDetailItem from '~/components/ProductDetailItem';

const cx = classNames.bind(styles);

function ProductDetail() {
    let { name } = useParams();

    name = name.replaceAll('-', ' ');

    return (
        <Fragment>
            <Header />
            <Breadcrumb title={name} />

            <ProductDetailItem title={name} />
        </Fragment>
    );
}
export default ProductDetail;
