import React from 'react';

const IconArrow = (props: any) => {
  return (
    <svg
      width={props?.size ? props.size : '34'}
      height={props?.size ? props.size : '34'}
      className={props?.right ? 'rotate-180' : ''}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.5 17L9.5 12L14.5 7"
        stroke={props?.color ? props.color : '#616161'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconArrow;
