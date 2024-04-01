import { RECORD_SIZE } from '@/config/theme';
import { ColumnsType } from 'antd/lib/table';

export const columnsProduct = (page: number): ColumnsType<any> => [
    {
        title: 'STT',
        dataIndex: 'id',
        align: 'center',
        render: (row, record, index) => (page === 1 ? ++index : (page - 1) * RECORD_SIZE + ++index),
    },
    {
        title: 'Tên hãng',
        dataIndex: 'name',
    },
    {
        title: 'Logo',
        dataIndex: 'icon',
    },
  
    
];
