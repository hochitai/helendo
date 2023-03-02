import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import Header from '~/layouts/components/Header';
import styles from './BlogDetail.module.scss';
import images from '~/assets/images';
import { CommaIcon } from '~/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function BlogDetail() {
    let { name } = useParams();
    console.log(name);
    return (
        <Fragment>
            <Header />
            <div
                className={cx(
                    'blog-detail border-b border-[#ededed] xl:py-[120px] lg:py-[100px] md:py-[80px] py-[50px]',
                )}
            >
                <div className="container mx-auto">
                    <div className="blog-detail-item">
                        <div className="blog-detail-img">
                            <img
                                className="object-cover object-center w-full"
                                src={images.blog1Big}
                                alt="Unique Products"
                                width="1170"
                                height="761"
                            />
                        </div>
                        <div className="blog-detail-content pt-[25px]">
                            <h2 className="lm:text-[30px] text-[24px] mb-[15px] font-medium">
                                Unique products that will impress your home in 2023.
                            </h2>
                            <div className="inner-content lg:ml-[145px]">
                                <div className="blog-meta text-[14px] mb-[15px]">
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
                                        <span className="category font-norma">deco</span>
                                    </span>
                                </div>
                                <p className="lg:max-w-[810px] leading-[28px]">
                                    Contrary to popular belief, Lorem Ipsum indignation and dislike men who are so
                                    beguiled and demoralized by the charms of pleasure of the moment, so blinded by
                                    desire, that they cannot foresee the pain and trouble that are bound to ensue; and
                                    equal blame belongs to those who fail in…
                                </p>
                                <blockquote className="relative pt-[4px] pl-[35px] my-[35px] ml-[35px] ">
                                    <span className="absolute top-0 left-0 transform -rotate-[180deg]">
                                        <CommaIcon />
                                    </span>
                                    <p className="blockquote-desc font-medium leading-[24px]">
                                        Dalena dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                                        incididunt ut labore etyt dolore magna aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris nisi utino aliquip ex ea commodo consequat.
                                    </p>
                                </blockquote>
                            </div>
                            <div className="rich-text-item">
                                <div className="rich-text-img grid grid-cols-2 gap-[30px]">
                                    <div className="single-img">
                                        <img className="w-full" src={images.blog1} alt="Single Blog" />
                                    </div>
                                    <div className="single-img">
                                        <img className="w-full" src={images.blog1} alt="Single Blog" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="page-navigation pt-[60px]">
                        <div className="page-navigation-inner border-t border-b border-[#cacaca] py-[40px]">
                            <div className="grid lm:grid-cols-2 grid-cols-1 relative text-[18px] z-[1]">
                                <div className="page-navigation-holder flex">
                                    <a
                                        className="prev flex justify-start pointer-events-none opacity-60"
                                        href="/blogs/undefined"
                                    >
                                        <span className="icon flex items-center justify-center bg-[#f4f5f7] min-w-[30px] h-[70px] mr-[40px] transition-all hover:bg-primary hover:text-white">
                                            <FontAwesomeIcon icon={faChevronLeft} className="w-[8px] h-[14px]" />
                                        </span>
                                    </a>
                                    <div className="page-navigation-item flex items-center">
                                        <div className="page-navigation-info">
                                            <h2 className="text-[16px] font-normal max-w-[320px] text-[#666666] mb-[15px] hidden">
                                                {' '}
                                            </h2>
                                            <a
                                                className="prev text-[16px] font-normal pointer-events-none opacity-60"
                                                href="/blogs/undefined"
                                            >
                                                Previous
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="page-navigation-holder flex justify-end max-sm:border-t max-sm:pt-[30px] max-sm:mt-[30px]">
                                    <div className="page-navigation-item flex items-center">
                                        <div className="page-navigation-info">
                                            <h2 className="text-[16px] font-normal max-w-[320px] text-[#666666] mb-[15px]">
                                                Navy Blue &amp; White Striped Area Rugs
                                            </h2>
                                            <a
                                                className="prev text-[16px] font-normal text-[#666666]"
                                                href="/blogs/striped-rug"
                                            >
                                                Next
                                            </a>
                                        </div>
                                    </div>
                                    <a className="prev flex justify-end text-[#666666]" href="/blogs/striped-rug">
                                        <span className="icon flex items-center justify-center bg-[#f4f5f7] min-w-[30px] h-[70px] ml-[40px] transition-all hover:bg-primary hover:text-white">
                                            <FontAwesomeIcon icon={faChevronRight} className="w-[8px] h-[14px]" />
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
export default BlogDetail;
