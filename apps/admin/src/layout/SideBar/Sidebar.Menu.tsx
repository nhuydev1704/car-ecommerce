import IconAntd from '@/components/IconAntd';

export const items: any = [
    {
        label: 'Trang chủ',
        type: 'group',
        children: [
            {
                label: 'Dashboard',
                key: '',
                icon: <IconAntd icon="DashboardOutlined" />,
                // children: [
                //     {
                //         label: 'Khách hàng',
                //         key: 'customer',
                //         icon: <IconAntd icon="HomeOutlined" />,
                //     },
                //     {
                //         label: 'CRM',
                //         key: 'main/dashboard/crm',
                //         icon: <IconAntd icon="HomeOutlined" />,
                //     },
                //     {
                //         label: 'Listing',
                //         key: 'main/dashboard/listing',
                //         icon: <IconAntd icon="HomeOutlined" />,
                //     },
                // ],
            },
            {
                label: 'Hãng xe',
                key: 'category',
                icon: <IconAntd icon="AppstoreOutlined" />,
            },
            {
                label: 'Sản phẩm',
                key: 'product',
                icon: <IconAntd icon="CarOutlined" />,
            },
            {
                label: 'Giới thiệu',
                key: 'introduce',
                icon: <IconAntd icon="InfoCircleOutlined" />,
            },
            {
                label: 'Liên hệ',
                key: 'contact',
                icon: <IconAntd icon="ContactsOutlined" />,
            },
        ],
    },
];
