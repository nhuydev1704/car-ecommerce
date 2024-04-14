import { RECORD_SIZE } from '@/config/theme';
import { Image } from 'antd';
import { ColumnsType } from 'antd/lib/table';

export const columnsContact = (page: number): ColumnsType<any> => [
    {
        title: 'STT',
        dataIndex: 'id',
        align: 'center',
        width: 60,
        render: (row, record, index) => (page === 1 ? ++index : (page - 1) * RECORD_SIZE + ++index),
    },
    {
        title: 'Họ và tên',
        dataIndex: 'full_name',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'phone',
    },
    {
        title: 'Email',
        dataIndex: 'email',
    },
    {
        title: 'Địa chỉ',
        dataIndex: 'address',
    },
    {
        title: 'Nội dung',
        dataIndex: 'note',
    },
];
