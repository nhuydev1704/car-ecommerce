'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import RenderAvatar from './RenderAvatar';

const LogOutButton = dynamic(() => import('@/components/LogOutButton'), {
  ssr: false,
});

const HeaderAdmin = () => {
  const pathname = usePathname();

  return (
    <ul className="menu menu-horizontal items-center gap-2 px-1 font-semibold">
      <li
        className={
          pathname === '/admin/category'
            ? 'rounded-full bg-purple-400 font-bold text-[#f1f1f1]'
            : ''
        }
      >
        <Link href="/admin/category">Danh mục</Link>
      </li>
      <li
        className={
          pathname === '/admin/product'
            ? 'rounded-full bg-purple-400 font-bold text-[#f1f1f1]'
            : ''
        }
      >
        <Link href="/admin/product">Sản phẩm</Link>
      </li>
      <div className="dropdown dropdown-end">
        <div
          aria-hidden
          tabIndex={0}
          role="button"
          className="avatar  btn btn-circle btn-ghost"
        >
          <RenderAvatar />
        </div>
        <ul
          aria-hidden
          // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
          tabIndex={0}
          className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
        >
          {pathname?.includes('/admin') && <LogOutButton />}
        </ul>
      </div>
    </ul>
  );
};

export default HeaderAdmin;
