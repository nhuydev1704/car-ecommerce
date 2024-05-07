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
import IconAntd from '@/components/IconAntd';

const initialFilterQuery = {};

const ProductPage = () => {
    const location = useLocation();

    const navigate = useNavigate();
    const [filterQuery, setFilterQuery] = React.useState<any>(initialFilterQuery);
    const [page, setPage] = React.useState(1);
    const [loadingClearFilter, setLoadingClearFilter] = React.useState(false);
    const [loadingExcel, setLoadingExcel] = React.useState<boolean>(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [values, setValues] = React.useState<any | null>(null);
    const {
        data: product,
        isRefetching,
        refetch,
    } = useQuery<any>(['product', page, filterQuery], () =>
        AxiosClient.get('/product', {
            params: { page, ...filterQuery },
        })
    );
    console.log('🚀 ~ CategoryPage ~ category:', product);

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
            <TopBar title="Sản phẩm" />
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
                                navigate('/product/form');
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
                        dataSource={product ? product.data : []}
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
                                                navigate('/product/form/' + record.id);
                                            }}
                                        >
                                            <IconAntd icon="EditOutlined" />
                                        </Button>
                                        <Popconfirm
                                            title="Xác nhận xoá"
                                            onConfirm={() => {
                                                AxiosClient.delete(`/product/${record.id}`).then(() => {
                                                    refetch();
                                                    Notification('success', 'Xoá thành công');
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
                        total={product?.totalResults || 0}
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
        </>
    );
};

export default ProductPage;
