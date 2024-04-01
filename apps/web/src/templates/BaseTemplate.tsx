import Header from './Header';

const BaseTemplate = (props: { children: React.ReactNode }) => {
  return (
    <div className="w-full text-gray-700 antialiased">
      <Header />

      <main>{props.children}</main>

      {/* <footer className="border-t border-gray-300 py-8 text-center text-sm">
        © Copyright {new Date().getFullYear()} {AppConfig.name}.
        {` ${t('made_with')} `}
        <a
          href="https://creativedesignsguru.com"
          className="text-blue-700 hover:border-b-2 hover:border-blue-700"
        >
          CreativeDesignsGuru
        </a>
      </footer> */}
    </div>
  );
};

export { BaseTemplate };
