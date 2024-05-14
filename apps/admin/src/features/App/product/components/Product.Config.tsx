import { RECORD_SIZE } from '@/config/theme';
import { currencyFormat } from '@/utils';
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
        render: (value) => value?.name,
    },
    {
        title: 'Giá',
        dataIndex: 'price',
        render: (value) => currencyFormat(value),
    },
    {
        title: 'Hình ảnh',
        dataIndex: 'images',
        width: 400,
        render: (row, record, index) => (
            <Image.PreviewGroup>
                <Space
                    style={
                        {
                            // flexWrap: 'wrap',
                        }
                    }
                >
                    {row.split(',').map((img: any) => {
                        return <Image height={40} src={img} />;
                    })}
                </Space>
            </Image.PreviewGroup>
        ),
    },
];
