import { RECORD_SIZE } from '@/config/theme';
import { Image } from 'antd';
import { ColumnsType } from 'antd/lib/table';

export const columnsProduct = (page: number): ColumnsType<any> => [
    {
        title: 'STT',
        dataIndex: 'id',
        align: 'center',
        width: 60,
        render: (row, record, index) => (page === 1 ? ++index : (page - 1) * RECORD_SIZE + ++index),
    },
    {
        title: 'Tên hãng',
        dataIndex: 'name',
    },
    {
        title: 'Logo',
        dataIndex: 'logo',
        width: 100,

        render: (row, record, index) => <Image alt="row"  src={row} />
    },
];
