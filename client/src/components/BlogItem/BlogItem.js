import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import images from '~/assets/images';
import routes from '~/config/routes';
import { PlusIcon } from '../Icons';
import styles from './BlogItem.module.scss';

const cx = classNames.bind(styles);

function BlogItem() {
    return (
        <div className={cx('blog-item', 'overflow-hidden group')}>
            <div className={cx('blog-img', 'relative')}>
                <Link to={routes.blogs}>
                    <img src={images.blog1} alt="blog" className="object-cover object-center w-full" />
                </Link>
                <Link
                    to={routes.blogs}
                    className="flex justify-center items-center bg-white  font-normal leading-[28px] text-[16px] py-[5px] px-[14px] absolute bottom-0 right-0 transition ease-in-out duration-500 transform translate-x-full group-hover:translate-x-0"
                >
                    <span>Read more</span>
                    <PlusIcon width="1.6rem" height="1.6rem" className="ml-[5px]" />
                </Link>
            </div>
            <div className="blog-content pt-[25px]">
                <h2 className="text-[20px] leading-[28px]  ">
                    <Link
                        className="relative block pb-[15px] mb-[10px] before:bg-[#cacaca] before:absolute before:left-0 before:bottom-[-3px] before:h-[1.5px] before:w-[70px] before:transition before:ease-in-out before:duration-[800ms] after:bg-primary after:absolute after:left-0 after:bottom-[-3px] after:h-[1.5px] after:w-0 after:transform after:transition-all after:duration-500 group-hover:after:w-[70px]"
                        to={routes.blogs}
                    >
                        Unique products that will impress your home in 2023.
                    </Link>
                </h2>
                <div className="blog-meta text-[14px]">
                    <span className='date after:text-[#999999] after:px-[8px] after:content-["/"]'>
                        November 27, 2023
                    </span>
                    <a
                        className='author font-normal hover:text-primary transition-all after:text-[#999999] after:px-[8px] after:content-["/"]'
                        href="https://www.example.com/"
                    >
                        Admin
                    </a>
                    <span>
                        <span className="text-[#999999] mr-[5px]">in</span>
                        <Link className="category font-normal hover:text-primary transition-all" to={routes.blogs}>
                            deco
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default BlogItem;
