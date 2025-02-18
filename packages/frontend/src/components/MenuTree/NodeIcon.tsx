import React from "react";

const NodeIcon: React.FC<{ type: "folder" | "folder-open" | null }> = ({
  type,
}) => {
  if (type === "folder")
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.013 2.40563C6.88362 2.27855 6.62643 2 6.18655 2C5.10958 1.99997 3.02037 2 2.4 2C1.63 2 1.007 2.61875 1.007 3.375L1 11.625C1 12.3813 1.63 13 2.4 13H13.6C14.37 13 15 12.3813 15 11.625V4.75C15 3.99375 14.37 3.375 13.6 3.375H8L7.013 2.40563Z"
          fill="#6F7E8C"
        />
      </svg>
    );
  if (type === "folder-open")
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.013 2.40563C6.88362 2.27855 6.62643 2 6.18655 2C5.10958 1.99997 3.02037 2 2.4 2C1.63 2 1.007 2.61875 1.007 3.375L1 11.625C1 12.3813 1.63 13 2.4 13H13.6C14.37 13 15 12.3813 15 11.625V4.75C15 3.99375 14.37 3.375 13.6 3.375H8L7.013 2.40563Z"
          fill="#9CAEBE"
        />
        <path
          d="M1.8905 5.87596C1.95306 5.37554 2.37846 5 2.88278 5H14.8672C15.4687 5 15.9341 5.52718 15.8595 6.12403L15.1095 12.124C15.0469 12.6245 14.6215 13 14.1172 13H2.13278C1.53128 13 1.0659 12.4728 1.1405 11.876L1.8905 5.87596Z"
          fill="#6F7E8C"
        />
      </svg>
    );
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2878_11221)">
        <path
          d="M6.9585 9.9804V9.84207C6.96121 9.3674 7.00326 8.98902 7.08463 8.70693C7.16871 8.42485 7.29077 8.197 7.4508 8.02341C7.61083 7.84982 7.80341 7.6925 8.02854 7.55146C8.19671 7.44296 8.34725 7.33039 8.48015 7.21376C8.61306 7.09713 8.71885 6.96829 8.7975 6.82725C8.87616 6.68349 8.91549 6.52346 8.91549 6.34715C8.91549 6.16 8.87074 5.9959 8.78123 5.85485C8.69172 5.71381 8.57102 5.60531 8.41913 5.52937C8.26994 5.45342 8.10449 5.41545 7.92276 5.41545C7.74645 5.41545 7.57964 5.45478 7.42232 5.53344C7.265 5.60938 7.13616 5.7233 7.03581 5.8752C6.93545 6.02438 6.8812 6.21018 6.87306 6.43259H5.21308C5.22664 5.89011 5.35683 5.44257 5.60366 5.08996C5.85049 4.73464 6.17733 4.47018 6.58419 4.29658C6.99105 4.12028 7.43995 4.03213 7.93089 4.03213C8.47066 4.03213 8.94804 4.12163 9.36304 4.30065C9.77803 4.47696 10.1035 4.73328 10.3395 5.06962C10.5755 5.40595 10.6935 5.81146 10.6935 6.28612C10.6935 6.60347 10.6406 6.88556 10.5348 7.13239C10.4317 7.37651 10.2866 7.5935 10.0995 7.78336C9.9123 7.97052 9.69124 8.14004 9.43627 8.29194C9.22199 8.41942 9.04569 8.55233 8.90736 8.69066C8.77174 8.82899 8.67002 8.98902 8.60221 9.17075C8.53711 9.35248 8.50321 9.57626 8.5005 9.84207V9.9804H6.9585ZM7.76408 12.5843C7.49284 12.5843 7.26093 12.4894 7.06835 12.2995C6.87849 12.1069 6.78491 11.8764 6.78762 11.6078C6.78491 11.342 6.87849 11.1142 7.06835 10.9243C7.26093 10.7344 7.49284 10.6395 7.76408 10.6395C8.02176 10.6395 8.24825 10.7344 8.44354 10.9243C8.63883 11.1142 8.73783 11.342 8.74054 11.6078C8.73783 11.7869 8.69037 11.951 8.59814 12.1001C8.50863 12.2466 8.39065 12.3646 8.24418 12.4541C8.09771 12.5409 7.93768 12.5843 7.76408 12.5843Z"
          fill="#6F7E8C"
        />
        <rect
          x="0.5"
          y="0.5"
          width="15"
          height="15"
          rx="3.5"
          stroke="#6F7E8C"
        />
      </g>
      <defs>
        <clipPath id="clip0_2878_11221">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default NodeIcon;
