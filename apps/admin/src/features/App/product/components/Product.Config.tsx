import { RECORD_SIZE } from '@/config/theme';
import { Image, Space } from 'antd';
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
        title: 'Tên xe',
        dataIndex: 'name',
    },
    {
        title: 'Hãng xe',
        dataIndex: 'category_id',
        render: (value) => value.name,
    },
    {
        title: 'Giá',
        dataIndex: 'price',
    },
    {
        title: 'Hình ảnh',
        dataIndex: 'images',
        width: 300,
        render: (row, record, index) => (
            <Image.PreviewGroup>
                <Space>
                    {row.split(',').map((img: any) => {
                        return <Image width={100} src={img} />;
                    })}
                </Space>
            </Image.PreviewGroup>
        ),
    },
];
