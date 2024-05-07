import CardComponent from '@/components/CardComponent';
import ClearFilter from '@/components/ClearFilter';
import ClearFilterLoading from '@/components/ClearFilter/ClearFilter.Loading';
import TableComponent from '@/components/TableComponent';
import TopBar from '@/components/TopBar';
import Container from '@/layout/Container';
import { Button, Popconfirm, Segmented, Space } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import Filter from '../components/Filter.Product';
import { columnsProduct } from '../components/Product.Config';
import AxiosClient from '@/apis/AxiosClient';
import { handleObjectEmpty, Notification, wait } from '@/utils';
import CategoryFormPage from './Form';
import IconAntd from '@/components/IconAntd';

const initialFilterQuery = {};

const CategoryPage = () => {
    const location = useLocation();

    const navigate = useNavigate();
    const [filterQuery, setFilterQuery] = React.useState<any>(initialFilterQuery);
    const [page, setPage] = React.useState(1);
    const [loadingClearFilter, setLoadingClearFilter] = React.useState(false);
    const [loadingExcel, setLoadingExcel] = React.useState<boolean>(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [values, setValues] = React.useState<any | null>(null);
    const {
        data: category,
        isRefetching,
        refetch,
    } = useQuery<any>(['category', page, filterQuery], () =>
        AxiosClient.get('/category', {
            params: { page, ...filterQuery },
        })
    );
    console.log('🚀 ~ CategoryPage ~ category:', category);

    // React.useEffect(() => {
    //     refetch();
    // }, [state.syncLoading]);

    React.useEffect(() => {
        if (location.state) {
            delete location.state?.prevUrl;
            if (location.state?.page !== page) {
                setPage(location.state?.page);
            }
            delete location.state?.page;
            setFilterQuery(location.state);
        }
    }, [location?.state]);

    const returnFilter = React.useCallback(
        (filter: any) => {
            setPage(1);
            setFilterQuery({ ...filterQuery, ...filter });
        },
        [filterQuery]
    );

    const onClearFilter = () => {
        setLoadingClearFilter(true);
        wait(1500).then(() => {
            setFilterQuery(initialFilterQuery);
            setPage(1);
            setLoadingClearFilter(false);
        });
    };

    const handleCloseForm = React.useCallback((trick = '') => {
        setValues(null);
        setModalVisible(false);
        if (trick === 'notRefresh') return;
        refetch();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <TopBar title="Hãng xe" />
            <Container>
                <CardComponent
                    title={
                        loadingClearFilter ? (
                            <ClearFilterLoading key="clear_filter" />
                        ) : (
                            <Filter params={filterQuery} returnFilter={returnFilter} key="filterCategory" />
                        )
                    }
                    extra={
                        <Button
                            onClick={() => {
                                setModalVisible(true);
                            }}
                            type="primary"
                        >
                            Thêm mới
                        </Button>
                    }
                >
                    <TableComponent
                        reLoadData={() => refetch()}
                        showTotalResult
                        loading={isRefetching || loadingExcel}
                        page={page}
                        // onRowClick={(record: { id: number }) =>
                        //     navigate(`${routerPage.product}/${record.id}`, {
                        //         state: { ...filterQuery, page, prevUrl: location.pathname },
                        //     })
                        // }
                        rowSelect={false}
                        onChangePage={(_page) => setPage(_page)}
                        dataSource={category ? category.data : []}
                        columns={[
                            ...columnsProduct(page),
                            {
                                title: 'Action',
                                key: 'action',
                                width: 120,
                                render: (text, record) => (
                                    <Space>
                                        <Button
                                            size="small"
                                            type="primary"
                                            onClick={() => {
                                                setValues(record);
                                                setModalVisible(true);
                                            }}
                                        >
                                            <IconAntd icon="EditOutlined" />
                                        </Button>
                                        <Popconfirm
                                    
                                            title="Xác nhận xoá"
                                            onConfirm={() => {
                                                AxiosClient.delete(`/category/${record.id}`).then(() => {
                                                    refetch();
                                                    Notification('success', 'Xoá hãng xe thành công');
                                                });
                                            }}
                                            cancelText="Huỷ"
                                            okText="Xóa"
                                        >
                                            <Button
                                                danger
                                                onClick={() => {
                                                    // handleDelete(record.id);
                                                }}
                                                size="small"
                                            >
                                                <IconAntd icon="DeleteOutlined" />
                                            </Button>
                                        </Popconfirm>
                                    </Space>
                                ),
                            },
                        ]}
                        total={category?.totalResults || 0}
                    />
                </CardComponent>
            </Container>
            {/* <ClearFilter
                hidden={
                    Object.values(handleObjectEmpty(filterQuery))?.filter(
                        (item: any) => item !== undefined && item !== ''
                    ).length > 0
                }
                onClick={onClearFilter}
            /> */}
            <CategoryFormPage modalVisible={modalVisible} values={values} handleCloseForm={handleCloseForm} />
        </>
    );
};

export default CategoryPage;
