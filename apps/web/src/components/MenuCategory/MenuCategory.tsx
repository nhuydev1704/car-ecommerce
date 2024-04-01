'use client';

import 'react-horizontal-scrolling-menu/dist/styles.css';

import React from 'react';
import { ScrollMenu } from 'react-horizontal-scrolling-menu';

import useDrag from '@/hooks/useDrag';

import { LeftArrow, RightArrow } from './Arrow';

function onWheel(apiObj: any, ev: React.WheelEvent): void {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}

const MenuCategory = () => {
  // NOTE: for drag by mouse
  const { dragStart, dragStop, dragMove } = useDrag();
  const handleDrag =
    ({ scrollContainer }: any) =>
    (ev: React.MouseEvent) =>
      dragMove(ev, (posDiff) => {
        if (scrollContainer.current) {
          // eslint-disable-next-line no-param-reassign
          scrollContainer.current.scrollLeft += posDiff;
        }
      });

  const attributes = [
    {
      id: 118,
      created_at: '2024-01-05T05:36:58.192Z',
      updated_at: '2024-01-29T04:53:39.258Z',
      deleted_at: null,
      is_enabled: 1,
      value: 'Kohaku',
      image:
        'https://api.sanxaxi.com/uploads/1dac219081d6298870c73-20290a23-7a69-405f-a7a6-890c43623e50.jpg',
      position: 1,
    },
    {
      id: 2,
      created_at: '2023-12-12T08:46:24.100Z',
      updated_at: '2024-01-29T04:53:39.258Z',
      deleted_at: null,
      is_enabled: 1,
      value: 'Showa',
      image:
        'https://api.sanxaxi.com/uploads/0dcbf5da7d99d5c78c88-f0f1763e-46ff-4b68-93b5-8f8e38c9b282.jpg',
      position: 999,
    },
    {
      id: 3,
      created_at: '2023-12-12T08:46:24.105Z',
      updated_at: '2024-01-29T04:53:39.258Z',
      deleted_at: null,
      is_enabled: 1,
      value: 'Sanke',
      image:
        'https://api.sanxaxi.com/uploads/0b8450455a87f2d9ab96-05cbb8f1-d54a-4350-9e0d-93942c676ad5.jpg',
      position: 999,
    },
    {
      id: 4,
      created_at: '2023-12-12T08:46:24.109Z',
      updated_at: '2024-01-29T04:53:39.258Z',
      deleted_at: null,
      is_enabled: 1,
      value: 'Tancho',
      image:
        'https://api.sanxaxi.com/uploads/a5ec0e0f934d3b13625c5-4489418a-f9fc-4cc4-bc72-ae67517a2fdc.jpg',
      position: 999,
    },
    {
      id: 5,
      created_at: '2023-12-12T08:46:24.112Z',
      updated_at: '2024-01-29T04:53:39.258Z',
      deleted_at: null,
      is_enabled: 1,
      value: 'Hi Utsuri',
      image:
        'https://api.sanxaxi.com/uploads/73fb3c12a150090e50412-5eb7a422-3cea-4426-92b0-e13d207c09e0.jpg',
      position: 999,
    },
    {
      id: 6,
      created_at: '2023-12-12T08:46:24.117Z',
      updated_at: '2024-01-29T04:53:39.258Z',
      deleted_at: null,
      is_enabled: 1,
      value: 'Shiro Utsuri',
      image:
        'https://api.sanxaxi.com/uploads/b64c295b5616fe48a70714-c4a31a4c-faf4-481d-903e-e071dc296fdf.jpg',
      position: 999,
    },
    {
      id: 7,
      created_at: '2023-12-12T08:46:24.122Z',
      updated_at: '2024-01-29T04:53:39.258Z',
      deleted_at: null,
      is_enabled: 1,
      value: 'Ki Utsuri',
      image:
        'https://api.sanxaxi.com/uploads/d46854722b3f8361da2e15-3894f1d0-d3cd-4ebe-851c-e800fc266929.jpg',
      position: 999,
    },
    {
      id: 8,
      created_at: '2023-12-12T08:46:24.126Z',
      updated_at: '2024-01-29T04:53:39.258Z',
      deleted_at: null,
      is_enabled: 1,
      value: 'Benigoi',
      image:
        'https://api.sanxaxi.com/uploads/90ad364eab0c03525a1d8-3b3b8095-52f1-499b-b9e8-082ae2df3c73.jpg',
      position: 999,
    },
    {
      id: 9,
      created_at: '2023-12-12T08:46:24.132Z',
      updated_at: '2024-01-29T04:53:39.258Z',
      deleted_at: null,
      is_enabled: 1,
      value: 'Karashi',
      image:
        'https://api.sanxaxi.com/uploads/6e3965daf89850c609897-f418bd11-1317-4810-ad74-b4e3356b36aa.jpg',
      position: 999,
    },
    {
      id: 10,
      created_at: '2023-12-12T08:46:24.136Z',
      updated_at: '2024-01-29T04:53:39.258Z',
      deleted_at: null,
      is_enabled: 1,
      value: 'Yamabuki',
      image:
        'https://api.sanxaxi.com/uploads/688fa469392b9175c83a3-589e2f06-b788-41f0-8cba-0013fe9bf12d.jpg',
      position: 999,
    },
    {
      id: 11,
      created_at: '2023-12-12T08:46:24.140Z',
      updated_at: '2024-01-29T04:53:39.258Z',
      deleted_at: null,
      is_enabled: 1,
      value: 'Asagi',
      image:
        'https://api.sanxaxi.com/uploads/b47bba9827da8f84d6cb4-254dbfb3-ec34-45a1-b624-d7d7eda3779b.jpg',
      position: 999,
    },
    {
      id: 12,
      created_at: '2023-12-12T08:46:24.144Z',
      updated_at: '2024-01-29T04:53:39.258Z',
      deleted_at: null,
      is_enabled: 1,
      value: 'Kujaku',
      image:
        'https://api.sanxaxi.com/uploads/1b59404b2f068758de17-334bc14a-fe38-40d1-b49b-fb930abc20eb.jpg',
      position: 999,
    },
    {
      id: 13,
      created_at: '2023-12-12T08:46:24.152Z',
      updated_at: '2024-01-29T04:53:39.258Z',
      deleted_at: null,
      is_enabled: 1,
      value: 'Chagoi',
      image:
        'https://api.sanxaxi.com/uploads/857b0b9996db3e8567ca9-5587c3ea-3ad7-484c-b5e1-ad4ae8664423.jpg',
      position: 999,
    },
    {
      id: 14,
      created_at: '2023-12-12T08:46:24.156Z',
      updated_at: '2024-01-29T04:53:39.258Z',
      deleted_at: null,
      is_enabled: 1,
      value: 'Matsuba',
      image:
        'https://api.sanxaxi.com/uploads/8ce18d021040b81ee15110-b2824a56-6d89-4cf0-a996-55875350e777.jpg',
      position: 999,
    },
    {
      id: 15,
      created_at: '2023-12-12T08:46:24.161Z',
      updated_at: '2024-01-29T04:53:39.258Z',
      deleted_at: null,
      is_enabled: 1,
      value: 'Platium',
      image:
        'https://api.sanxaxi.com/uploads/601bddf840bae8e4b1ab11-ae581e72-ee6d-4887-aade-e8bc5d5cc274.jpg',
      position: 999,
    },
    {
      id: 16,
      created_at: '2023-12-12T08:46:24.165Z',
      updated_at: '2024-01-29T04:53:39.258Z',
      deleted_at: null,
      is_enabled: 1,
      value: 'Goshiki',
      image:
        'https://api.sanxaxi.com/uploads/cde4bd112053880dd14213-595b0c8d-8d14-4f1e-8a8b-733f5be3466a.jpg',
      position: 999,
    },
    {
      id: 17,
      created_at: '2023-12-12T08:46:24.169Z',
      updated_at: '2024-01-29T04:53:39.258Z',
      deleted_at: null,
      is_enabled: 1,
      value: 'Koromo',
      image:
        'https://api.sanxaxi.com/uploads/856db89625d48d8ad4c512-08a2ae6c-7843-4980-8dd9-28aeff9923e4.jpg',
      position: 999,
    },
    {
      id: 18,
      created_at: '2023-12-12T08:46:24.173Z',
      updated_at: '2024-01-29T04:53:39.258Z',
      deleted_at: null,
      is_enabled: 1,
      value: 'Mix',
      image:
        'https://api.sanxaxi.com/uploads/216204810ec3a69dffd2-ea49f230-6dbc-4d2a-af83-805c35a11675.jpg',
      position: 999,
    },
    {
      id: 19,
      created_at: '2023-12-12T08:46:24.176Z',
      updated_at: '2024-01-29T04:53:39.258Z',
      deleted_at: null,
      is_enabled: 1,
      value: 'Khác',
      image:
        'https://api.sanxaxi.com/uploads/de65488a74c7dc9985d6-(1)-9cee6d28-f8ad-41c8-858e-aabdb2908ba0.jpg',
      position: 999,
    },
  ];

  return (
    <div
      onMouseLeave={dragStop}
      className="max-w-screen-xl bg-[#F9F9F9] px-[5px] py-[20px]"
    >
      <ScrollMenu
        LeftArrow={LeftArrow}
        RightArrow={RightArrow}
        onWheel={onWheel}
        onMouseDown={() => dragStart}
        onMouseUp={() => dragStop}
        onMouseMove={handleDrag}
        scrollContainerClassName="gap-2 overflow-hidden"
        Footer={<div />}
      >
        {attributes.map(({ id, value, image }: any) => (
          <div
            aria-hidden
            onClick={() => {}}
            className="flex cursor-pointer select-none flex-col items-center"
            key={id}
          >
            <div className="w-[40px] md:w-[90px]">
              <img
                alt={value}
                className="pointer-events-none aspect-square rounded-2xl"
                src={image}
              />
            </div>
            <p className="mt-2 text-center text-[14px] font-semibold text-[#333]">
              {value}
            </p>
          </div>
        ))}
      </ScrollMenu>
    </div>
  );
};

export default MenuCategory;
