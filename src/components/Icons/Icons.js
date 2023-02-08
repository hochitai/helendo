export const SearchIcon = ({ width = '2.4rem', height = '2.4rem', className }) => (
    <svg
        className={className}
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 512 512"
        height={height}
        width={width}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill="none"
            strokeMiterlimit="10"
            strokeWidth="32"
            d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
        ></path>
        <path
            fill="none"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="32"
            d="M338.29 338.29L448 448"
        ></path>
    </svg>
);

export const UserIcon = ({ width = '2.4rem', height = '2.4rem', className }) => (
    <svg
        className={className}
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 512 512"
        height={height}
        width={width}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"
        ></path>
        <path
            fill="none"
            strokeMiterlimit="10"
            strokeWidth="32"
            d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z"
        ></path>
    </svg>
);

export const HeartIcon = ({ width = '2.4rem', height = '2.4rem', className }) => (
    <svg
        className={className}
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 512 512"
        height={height}
        width={width}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
        ></path>
    </svg>
);

export const MiniCartIcon = ({ width = '2.4rem', height = '2.4rem', className }) => (
    <svg
        className={className}
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 512 512"
        height={height}
        width={width}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M80 176a16 16 0 00-16 16v216c0 30.24 25.76 56 56 56h272c30.24 0 56-24.51 56-54.75V192a16 16 0 00-16-16zm80 0v-32a96 96 0 0196-96h0a96 96 0 0196 96v32"
        ></path>
        <path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M160 224v16a96 96 0 0096 96h0a96 96 0 0096-96v-16"
        ></path>
    </svg>
);

export const ArrowRightIcon = ({ width = '1.8rem', height = '1.8rem', className }) => (
    <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 512 512"
        className={`light-stroke ml-[5px] ${className || ''}`}
        height={height}
        width={width}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="48"
            d="M268 112l144 144-144 144m124-144H100"
        ></path>
    </svg>
);

export const ArroUpIcon = ({ width = '2.4rem', height = '2.4rem', className }) => (
    <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 512 512"
        className="h-8 w-8"
        aria-hidden="true"
        height={height}
        width={width}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill="none"
            strokeLinecap="square"
            strokeMiterlimit="10"
            strokeWidth="48"
            d="M112 244l144-144 144 144M256 120v292"
        ></path>
    </svg>
);

export const ExitIcon = ({ width = '3.2rem', height = '3.2rem', className }) => (
    <svg
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0"
        viewBox="0 0 512 512"
        className={`text-[#212121] text-[32px] cursor-pointer ${className || ''}`}
        height={height}
        width={width}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M368 368L144 144m224 0L144 368"
        ></path>
    </svg>
);
