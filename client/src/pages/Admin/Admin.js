import classNames from 'classnames/bind';

import styles from './Admin.module.scss';
import { useEffect, useState } from 'react';
import request from '~/utils/httpRequest';
import config from '~/config';

const cx = classNames.bind(styles);

function Admin() {
    const [year, setYear] = useState('2023');
    const [statistics, setStatistics] = useState([]);

    useEffect(() => {
        request
            .get(config.apis.getStatisticOfYear, {
                params: {
                    year,
                },
            })
            .then((res) => setStatistics(res.data))
            .catch((error) => console.log(error));
    }, [year]);

    return (
        <>
            <div className="chart border px-40">
                <div className="flex justify-between items-center">
                    <h1>Statistics</h1>
                    <select
                        className="border border-gray-400 px-4 py-2 rounded-sm"
                        onChange={(e) => setYear(e.target.value)}
                    >
                        <option value="2023">2023</option>
                        <option value="2022">2022</option>
                        <option value="2021">2021</option>
                    </select>
                </div>
                <div className="grid grid-cols-12 grid-rows-[1fr,30px] h-[500px] text-center">
                    {statistics.length > 0 &&
                        [...Array(12)].map((value, index) => {
                            const TOTAL = 1000;
                            const valueStatistic = statistics.find(
                                (value) => value._id.month === index + 1 && value._id.year.toString() === year,
                            );
                            let colorSta = '';
                            if (!!valueStatistic) {
                                colorSta = `bg-blue-400 h-[${Math.floor((TOTAL / valueStatistic.total) * 100)}px]`;
                            }
                            return (
                                <div
                                    key={index}
                                    className={cx(
                                        'group flex justify-self-center self-end w-[40px]  rounded-t-full relative',
                                        {
                                            [colorSta]: !!valueStatistic,
                                            'bg-slate-400 h-[100px] opacity-70': !!!valueStatistic,
                                        },
                                    )}
                                >
                                    {!!valueStatistic && (
                                        <div className="absolute -top-16 left-1/2 -translate-x-1/2  opacity-0 group-hover:opacity-100 transition-all bg-blue-400 px-6 py-2 rounded-full">
                                            ${valueStatistic.total}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    {/* <div className="group flex justify-self-center self-end w-[20px] h-[100px] bg-blue-400 rounded-t-full relative">
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2  opacity-0 group-hover:opacity-100 transition-all bg-blue-400 px-6 py-2 rounded-full">
                            $4300
                        </div>
                    </div> */}
                    {/* <div className="group flex justify-self-center self-end w-[20px] h-[100px] bg-blue-400 rounded-t-full relative">
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all bg-blue-400 px-6 py-2 rounded-full">
                            $4300
                        </div>
                    </div>
                    <div className="group flex justify-self-center self-end w-[20px] h-[100px] bg-blue-400 rounded-t-full relative">
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2  opacity-0 group-hover:opacity-100 transition-all bg-blue-400 px-6 py-2 rounded-full">
                            $4300
                        </div>
                    </div>
                    <div className="group flex justify-self-center self-end w-[20px] h-[100px] bg-blue-400 rounded-t-full relative">
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2  opacity-0 group-hover:opacity-100 transition-all bg-blue-400 px-6 py-2 rounded-full">
                            $4300
                        </div>
                    </div>
                    <div className="group flex justify-self-center self-end w-[20px] h-[100px] bg-blue-400 rounded-t-full relative">
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2  opacity-0 group-hover:opacity-100 transition-all bg-blue-400 px-6 py-2 rounded-full">
                            $4300
                        </div>
                    </div>
                    <div className="group flex justify-self-center self-end w-[20px] h-[100px] bg-blue-400 rounded-t-full relative">
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2  opacity-0 group-hover:opacity-100 transition-all bg-blue-400 px-6 py-2 rounded-full">
                            $4300
                        </div>
                    </div>
                    <div className="group flex justify-self-center self-end w-[20px] h-[100px] bg-blue-400 rounded-t-full relative">
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2  opacity-0 group-hover:opacity-100 transition-all bg-blue-400 px-6 py-2 rounded-full">
                            $4300
                        </div>
                    </div>
                    <div className="group flex justify-self-center self-end w-[20px] h-[100px] bg-blue-400 rounded-t-full relative">
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2  opacity-0 group-hover:opacity-100 transition-all bg-blue-400 px-6 py-2 rounded-full">
                            $4300
                        </div>
                    </div>
                    <div className="group flex justify-self-center self-end w-[20px] h-[100px] bg-blue-400 rounded-t-full relative">
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2  opacity-0 group-hover:opacity-100 transition-all bg-blue-400 px-6 py-2 rounded-full">
                            $4300
                        </div>
                    </div>
                    <div className="group flex justify-self-center self-end w-[20px] h-[100px] bg-blue-400 rounded-t-full relative">
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2  opacity-0 group-hover:opacity-100 transition-all bg-blue-400 px-6 py-2 rounded-full">
                            $4300
                        </div>
                    </div>
                    <div className="group flex justify-self-center self-end w-[20px] h-[100px] bg-blue-400 rounded-t-full relative">
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2  opacity-0 group-hover:opacity-100 transition-all bg-blue-400 px-6 py-2 rounded-full">
                            $4300
                        </div>
                    </div>
                    <div className="group flex justify-self-center self-end w-[20px] h-[100px] bg-blue-400 rounded-t-full relative">
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2  opacity-0 group-hover:opacity-100 transition-all bg-blue-400 px-6 py-2 rounded-full">
                            $4300
                        </div>
                    </div> */}
                    <p className="leading-[30px]">Jan</p>
                    <p className="leading-[30px]">Feb</p>
                    <p className="leading-[30px]">Mar</p>
                    <p className="leading-[30px]">Apr</p>
                    <p className="leading-[30px]">May</p>
                    <p className="leading-[30px]">Jun</p>
                    <p className="leading-[30px]">Jul</p>
                    <p className="leading-[30px]">Aug</p>
                    <p className="leading-[30px]">Sep</p>
                    <p className="leading-[30px]">Oct</p>
                    <p className="leading-[30px]">Nov</p>
                    <p className="leading-[30px]">Dec</p>
                </div>
                {/* <div className="h-[200px]">
                    <div className="w-[20px] h-full bg-blue-400"></div>
                </div>
                <div className=" flex justify-between items-center">
                    <p>Jan</p>
                    <p>Feb</p>
                    <p>Mar</p>
                    <p>Apr</p>
                    <p>May</p>
                    <p>Jun</p>
                    <p>Jul</p>
                    <p>Aug</p>
                    <p>Sep</p>
                    <p>Oct</p>
                    <p>Nov</p>
                    <p>Dec</p>
                </div> */}
            </div>
        </>
    );
}
export default Admin;
