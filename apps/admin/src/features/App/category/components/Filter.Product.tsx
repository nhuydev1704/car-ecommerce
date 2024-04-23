import SearchInput from '@/components/SearchInput';
import { Select, Space } from 'antd';
import React from 'react';
import { useLocation } from 'react-router-dom';

const { Option } = Select;

const Filter = ({
    returnFilter,
    params,
    placeholder,
}: {
    returnFilter: (filter: any) => void;
    params: any;
    placeholder?: string;
}) => {
    const location = useLocation();

    return (
        <Space size="middle" wrap>
            <SearchInput
                defaultValue={location.state?.search}
                onChangeSearch={(search: any) => returnFilter({ name: search?.trim() })}
                placeholderSearch={placeholder || 'Nhập mã, tên sản phẩm'}
            />
        </Space>
    );
};

export default React.memo(Filter);
