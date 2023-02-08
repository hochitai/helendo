import classNames from 'classnames/bind';
import images from '~/assets/images';
import CustomSlider from '~/components/CustomSlider';
import FeaturedProduct from '~/components/FeaturedProduct';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx('wapper')}>
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
        </div>
    );
}
export default Home;
