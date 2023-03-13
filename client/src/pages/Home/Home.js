import { useState, createContext, Fragment, useEffect } from 'react';
import classNames from 'classnames/bind';

import request from '~/utils/httpRequest';
import images from '~/assets/images';
import routes from '~/config/routes';
import apis from '~/config/apis';
import { ArrowRightIcon } from '~/components/Icons';
import Header from '~/layouts/components/Header';
import CustomSlider from '~/components/CustomSlider';
import FeaturedProduct from '~/components/FeaturedProduct';
import CustomCarousel from '~/components/CustomCarousel';
import QuickView from '~/components/QuickView';
import ProductItem from '~/components/ProductItem';
import BlogItem from '~/components/BlogItem';
import Button from '~/components/Button';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

export const QuickViewContext = createContext();

function Home() {
    const [dataQuickView, setDataQuickView] = useState({});
    const handleSetDataQuickView = (data) => {
        setDataQuickView(data);
    };

    const [productList, setProductList] = useState([]);

    useEffect(() => {
        request.get(apis.getAllProducts).then((res) => {
            setProductList(res.data);
        });
    }, []);

    const checkedObjectIsEmpty = (data) => {
        return Object.keys(data).length !== 0;
    };

    return (
        <Fragment>
            <Header type="transparent" />
            <div className={cx('wrapper')}>
                {checkedObjectIsEmpty(dataQuickView) && (
                    <QuickViewContext.Provider value={handleSetDataQuickView}>
                        <QuickView data={dataQuickView} />
                    </QuickViewContext.Provider>
                )}
                <CustomSlider />
                <FeaturedProduct
                    name="Nancy Chair"
                    desc="When an unknown printer took a galley of type and scrambled it to make a type specimen book. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia."
                    price="90"
                    img={images.featuredProduct1}
                />
                <FeaturedProduct
                    type="rightImg"
                    name="Table Wood Pine"
                    desc="Excepteur sint occaecat cupidatat non proident, sunt in culpaqui officia deserunt mollit anim id est laborum."
                    price="50"
                    img={images.featuredProduct2}
                />
                <FeaturedProduct
                    name="Art Deco Home"
                    desc="Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for."
                    price="30"
                    img={images.featuredProduct3}
                />
                <QuickViewContext.Provider value={handleSetDataQuickView}>
                    <CustomCarousel
                        title="Best Selling"
                        quantityInSlide={4}
                        comp={ProductItem}
                        data={productList}
                        className="pt-[120px]"
                    />
                </QuickViewContext.Provider>
                <div className="pt-[130px]">
                    <div
                        className="bg-no-repeat bg-cover bg-center flex items-center h-[635px]"
                        style={{ backgroundImage: `url(${images.countdown})` }}
                    >
                        <div className="content width-content mx-auto ">
                            <div className="w-1/2">
                                <h2 className="offer-colection-title relative text-[36px] font-medium pb-[10px] mb-[30px] hover:bg-primary after:left-0 after:bottom-0 after:h-[4px] after:w-[70px]">
                                    Deco Collection <span className="offer text-red-500">50% OFF</span>
                                </h2>
                                <p className="mb-[50px]">
                                    The standard chunk of Lorem Ipsum used since the 1500s is reproduced for those.
                                    Sections 1.10.32 and 1.10.33 from “de Finibus Bonorum et Malorum
                                </p>
                                <div className="timer-container">
                                    <div className="timer">
                                        <div className="clock flex text-center">
                                            <div className="mr-[80px]">
                                                <h4 className='font-prata text-black text-[48px]  relative after:content-[":"] after:text-[48px] after:absolute after:top-1/2 after:right-[-42.5px]  after:transform after:-translate-y-1/2'>
                                                    291
                                                </h4>
                                                <span className="uppercase font-medium">Days</span>
                                            </div>
                                            <div className="mr-[80px]">
                                                <h4 className='font-prata text-black text-[48px]  relative after:content-[":"] after:text-[48px] after:absolute after:top-1/2 after:right-[-42.5px]  after:transform after:-translate-y-1/2'>
                                                    6
                                                </h4>
                                                <span className="uppercase font-medium">Hours</span>
                                            </div>
                                            <div className="mr-[80px]">
                                                <h4 className='font-prata text-black text-[48px]  relative after:content-[":"] after:text-[48px] after:absolute after:top-1/2 after:right-[-42.5px]  after:transform after:-translate-y-1/2'>
                                                    36
                                                </h4>
                                                <span className="uppercase font-medium">Mints</span>
                                            </div>
                                            <div>
                                                <h4 className="font-prata text-black text-[48px]">11</h4>
                                                <span className="uppercase font-medium">Secs</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-[60px] shopping-link">
                                    <Button
                                        to={routes.products}
                                        className="text-[18px] w-full transition-all font-medium flex items-center"
                                        rightIcon={<ArrowRightIcon />}
                                        primary
                                        small
                                    >
                                        Shop now
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <CustomCarousel title="Our Blog" quantityInSlide={3} comp={BlogItem} className="py-[90px]" />
                <div className="newsletter-area flex justify-between width-content mx-auto">
                    <div className="section-title pb-[10px] md:mb-0 mb-[30px] relative after:bg-primary after:absolute after:left-0 after:transform after:bottom-0 after:h-[4px] after:w-[70px]">
                        <h2 className="text-[36px] font-medium">Our Newsletter</h2>
                    </div>
                    <form className="newsletter-form relative flex w-1/2">
                        <input
                            className="w-full bg-[#f4f5f7] h-[54px] lm:p-[10px_170px_10px_20px] p-[10px] focus:outline-none"
                            type="email"
                            placeholder="Your email address"
                        />
                        <Button
                            primary
                            type="submit"
                            className="lm:absolute lm:top-0 lm:right-0 px-[40px] h-[54px] max-sm:mt-[30px]"
                        >
                            Subscribe
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
}
export default Home;
