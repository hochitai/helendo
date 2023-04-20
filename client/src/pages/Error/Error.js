import { Fragment } from 'react';
import classNames from 'classnames/bind';
import Header from '~/layouts/components/Header';

import styles from './Error.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Error() {
    return (
        <Fragment>
            <Header />
            <div className="container mx-auto">
                <div className="flex justify-center my-40">
                    <img src={images.error404} alt="Error 404" />
                </div>
            </div>
        </Fragment>
    );
}
export default Error;
