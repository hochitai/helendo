import { Fragment } from 'react';
import classNames from 'classnames/bind';

import Header from '~/layouts/components/Header';
import Breadcrumb from '~/components/Breadcrumb';
import styles from './Blogs.module.scss';
import BlogMenuItem from '~/components/BlogMenuItem';

const cx = classNames.bind(styles);

function Blogs() {
    return (
        <Fragment>
            <Header />
            <Breadcrumb title={'Blogs'} />
            <div className={cx('blog border-b border-[#ededed] xl:py-[120px] lg:py-[100px] md:py-[80px] py-[50px]')}>
                <div className="container mx-auto">
                    <div className="lg:columns-3 lm:columns-2 columns-1 xl:w-[1145px] mx-auto gap-x-[25px] space-y-[40px]">
                        <BlogMenuItem />
                        <BlogMenuItem />
                        <BlogMenuItem />
                        <BlogMenuItem />
                        <BlogMenuItem />
                        <BlogMenuItem />
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
export default Blogs;
