import { currentUser } from '@clerk/nextjs';
import Image from 'next/image';

import { AppConfig } from '@/utils/AppConfig';

import HeaderAdmin from './Header.Admin';
import HeaderUser from './Header.User';

const Header = async () => {
  const user = await currentUser();

  return (
    <header className="navbar sticky top-0 z-[9999] flex justify-center bg-base-100 py-0 shadow-sm">
      <div className="flex w-full max-w-screen-xl justify-between">
        <div className="flex-1">
          <Image src="/icon.png" alt={AppConfig.name} width={45} height={20} />
        </div>
        <div className="flex-none">
          {user ? <HeaderAdmin /> : <HeaderUser />}
        </div>
      </div>
    </header>
  );
};

export default Header;
