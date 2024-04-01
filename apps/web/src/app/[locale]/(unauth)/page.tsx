import dynamic from 'next/dynamic';
import { getTranslations } from 'next-intl/server';

import ProductItem from '@/components/Product/Product.Item';
import QA from '@/components/QA/QA';

const HomeCar = dynamic(() => import('@/components/HomeCar/HomeCar'), {
  ssr: false,
});
const MenuCategory = dynamic(
  () => import('@/components/MenuCategory/MenuCategory'),
  {
    ssr: false,
  },
);

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

export default function Index() {
  return (
    <div className="min-h-[100vh]">
      <HomeCar />
      <div className="mb-2 w-full pt-[40px] text-center text-[22px] font-bold uppercase">
        Xe đang bán
      </div>
      <div className="flex w-full justify-center">
        <MenuCategory />
      </div>
      <div className="my-[40px] flex w-full justify-center">
        <div className="grid w-full max-w-screen-xl grid-cols-4 gap-[15px]">
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
          <ProductItem />
        </div>
      </div>
      <QA />
    </div>
  );
}
