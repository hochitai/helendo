import classNames from 'classnames/bind';
import images from '~/assets/images';
import routes from '~/config/routes';
import Button from '../Button';
import styles from './BlogMenuItem.module.scss';

const cx = classNames.bind(styles);

function BlogMenuItem() {
    return (
        <div className={cx('break-inside-avoid')}>
            <div className="blog-masonry-item overflow-hidden group">
                <div className="blog-img relative">
                    <Button text className="blog-img block" to={routes.blogs + '/unique-products'}>
                        <img className="object-cover object-center w-full" src={images.blog1} alt="Unique Products" />
                    </Button>
                </div>
                <div className="blog-content pt-[25px]">
                    <div className="blog-meta text-[14px] pb-[10px] flex items-center">
                        <span className='date after:text-[#999999] after:px-[8px] after:content-["/"]'>
                            November 27, 2023
                        </span>
                        <Button
                            text
                            className='author font-normal hover:text-primary transition-all after:text-[#999999] after:px-[8px] after:content-["/"]'
                            href="https://www.example.com/"
                        >
                            Admin
                        </Button>
                        <span className="flex items-center">
                            <span className="text-[#999999] mr-[5px]">in</span>
                            <Button
                                text
                                className="category font-normal hover:text-primary transition-all "
                                to={routes.blogs + '/unique-products'}
                            >
                                deco
                            </Button>
                        </span>
                    </div>
                    <h2 className="text-[20px] leading-7 ">
                        <Button
                            text
                            className="relative block text-[22px] transition-all hover:text-primary leading-[32px] font-medium"
                            to={routes.blogs + '/unique-products'}
                        >
                            Unique products that will impress your home in 2023.
                        </Button>
                    </h2>
                    <div className="btn-wrap flex pt-[45px]">
                        <Button
                            second
                            className="border text-[15px] px-[32px] h-[40px] leading-[38px] transition-all "
                            to={routes.blogs + '/unique-products'}
                        >
                            Read more
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogMenuItem;
