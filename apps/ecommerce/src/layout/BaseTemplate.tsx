import Header from '@/components/app/Header/Header';

const BaseTemplate = (props: { children: React.ReactNode }) => {
    return (
        <div className="w-full text-gray-700 antialiased">
            {/* <Header /> */}
            <main>{props.children}</main>
        </div>
    );
};

export default BaseTemplate;
