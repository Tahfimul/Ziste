import React from 'react';

const Loading:React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex justify-center items-center relative">
        <svg
          className="animate-spin ease-linear"
          width="30vw"
          height="30vh"
          viewBox="0 0 224 226"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="157.922" cy="25.0205" r="11.5" fill="#E07A5F" />
          <circle cx="163.922" cy="198.021" r="11.5" fill="#81B29A" />
          <circle cx="14.9219" cy="140.021" r="11.5" fill="#6E739E" />
          <path
            d="M75.9204 202.52C90.6328 208.739 100.257 209.74 106.203 209.186C108.809 208.943 112.769 212.429 111.821 214.868V214.868M75.9204 202.52C60.5162 196.008 51.923 189.738 47.2309 185.241C44.705 182.82 39.4444 183.013 38.178 186.274V186.274M75.9204 202.52C46.4883 190.078 52.2569 191.741 38.178 186.274M75.9204 202.52C105.352 214.961 97.7425 209.402 111.821 214.868M38.178 186.274C36.0082 191.862 57.5022 204.711 73.0595 210.383C87.3762 215.602 109.497 220.856 111.821 214.868"
            stroke="#F2CC8F"
            strokeWidth="15"
          />
          <path
            d="M205.922 111.27C205.273 91.9654 199.583 77.2161 195.667 69.2383C193.981 65.8035 195.655 61.5213 199.481 61.5218V61.5218M205.922 111.27C206.599 131.429 199.701 149.428 195.182 158.938C193.824 161.796 196.303 165.477 199.467 165.477V165.477M205.922 111.27C206.922 141.021 202.032 143.428 199.467 165.477M205.922 111.27C204.922 81.5189 199.478 81.3957 199.481 61.5218M199.467 165.477C205.462 165.478 216.263 133.055 215.922 111.27C215.608 91.2219 205.904 61.5227 199.481 61.5218"
            stroke="#3D405B"
            strokeWidth="15"
          />
          <path
            d="M43.4663 45.4138C29.8759 59.1391 23.0584 73.4023 19.9463 81.7265C18.6064 85.3105 14.344 87.0338 11.7175 84.2514V84.2514M43.4663 45.4138C57.6588 31.0806 75.4814 23.7395 85.4979 20.4959C88.5083 19.5211 89.4833 15.1918 87.3111 12.8907V12.8907M43.4663 45.4138C64.4112 24.2612 69.5187 26.1636 87.3111 12.8907M43.4663 45.4138C22.5215 66.5664 26.1692 70.6089 11.7175 84.2514M87.3111 12.8907C83.1961 8.53158 52.2067 22.9386 36.6008 38.143C22.2395 52.1348 7.30848 79.5809 11.7175 84.2514"
            stroke="#B5B2B2"
            strokeWidth="15"
          />
        </svg>

        {/*Logo SVG*/}
        <svg
          className="absolute animate-spin top-[8vh] left-[8vw] ease-in-out"
          width="15vw"
          height="15vh"
          viewBox="0 0 68 76"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M34.019 39.1111L10.4434 71.2509L59.6447 71.7778C54.2702 57.7039 47.9373 50.1393 34.019 39.1111Z"
            fill="#3D405B"
          />
          <path
            d="M58.7169 4.22223H7.42676C10.8796 15.8351 14.9115 22.9126 32.8179 38.8889L58.7169 4.22223Z"
            fill="#81B29A"
          />
          <path
            d="M12.8809 69.7778H55.7C55.7 69.7778 55.0495 63.9175 50.9423 62.3333C46.9969 59.8889 39.1574 62.2222 36.4372 56C35.4557 53.7551 35.2187 51 35.0447 50.3333C34.8706 49.6667 34.1164 42.7778 34.1164 42.7778C34.1164 42.7778 33.9028 49.4444 33.7682 50.3333C33.6337 51.2222 33.7133 54.1052 32.7239 56C29.7068 61.7778 19.9594 60.6667 17.9867 63.4444C15.4338 65.6667 12.8809 69.7778 12.8809 69.7778Z"
            fill="#F2CC8F"
          />
          <path
            d="M12.9286 11.7778C1.63663 11.7778 32.4859 36 32.4859 36C32.4859 36 56.6996 11.7778 49.4821 11.7778C42.2645 11.7778 38.3065 18.4834 32.4859 18.4834C26.6653 18.4834 24.2206 11.7778 12.9286 11.7778Z"
            fill="#F2CC8F"
          />
          <path
            d="M9.28295 5.11111C8.23858 17.5556 30.3163 34.1587 33.4459 37.8315C36.5754 41.5044 56.8598 56.0846 56.8598 71.7778"
            stroke="#E07A5F"
            strokeWidth="7"
          />
          <rect
            width="90.2878"
            height="6.73658"
            transform="matrix(-0.608047 0.793901 -0.818384 -0.574672 63.9189 4.08627)"
            fill="#B5B2B2"
          />
          <rect
            y="69.5556"
            width="66.3754"
            height="6.44444"
            rx="2"
            fill="#B5B2B2"
          />
          <rect width="68" height="6.44444" rx="2" fill="#B5B2B2" />
        </svg>
      </div>
      <h1 className="px-[1vw] py-[2vh] text-[2vw]">Loading...</h1>
    </div>
  );
};

export default Loading;