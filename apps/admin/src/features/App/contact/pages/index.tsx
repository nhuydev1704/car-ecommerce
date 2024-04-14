import CardComponent from '@/components/CardComponent';
import ClearFilter from '@/components/ClearFilter';
import ClearFilterLoading from '@/components/ClearFilter/ClearFilter.Loading';
import TableComponent from '@/components/TableComponent';
import TopBar from '@/components/TopBar';
import Container from '@/layout/Container';
import { Button, Popconfirm, Segmented, Space, Switch } from 'antd';
import React from 'react';
import { useQuery } from 'react-query';
import { useLocation, useNavigate } from 'react-router-dom';
import AxiosClient from '@/apis/AxiosClient';
import { handleObjectEmpty, Notification, wait } from '@/utils';
import IconAntd from '@/components/IconAntd';
import FilterProduct from '../../category/components/Filter.Product';
import { columnsContact } from '../components/Contact.config';

const initialFilterQuery = {};

const ContactPage = () => {
    const location = useLocation();

    const navigate = useNavigate();
    const [filterQuery, setFilterQuery] = React.useState<any>(initialFilterQuery);
    const [page, setPage] = React.useState(1);
    const [loadingClearFilter, setLoadingClearFilter] = React.useState(false);
    const [loadingExcel, setLoadingExcel] = React.useState<boolean>(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    const [values, setValues] = React.useState<any | null>(null);
    const {
        data: contact,
        isRefetching,
        refetch,
    } = useQuery<any>(['contact', page, filterQuery], () =>
        AxiosClient.get('/contact', {
            params: { page, ...filterQuery },
        })
    );

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

    return (
        <>
            <TopBar title="Liên hệ" />
            <Container>
                <CardComponent
                    title={
                        loadingClearFilter ? (
                            <ClearFilterLoading key="clear_filter" />
                        ) : (
                            <FilterProduct params={filterQuery} returnFilter={returnFilter} key="filterCategory" />
                        )
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
                        dataSource={contact ? contact.data : []}
                        columns={[
                            ...columnsContact(page),
                            {
                                title: 'Trạng thái',
                                key: 'status',
                                width: 200,
                                align: 'center',
                                render: (text, record) => (
                                    <Switch
                                        checkedChildren="Đã liên hệ"
                                        unCheckedChildren="Chưa liên hệ"
                                        checked={record.status}
                                        onChange={async (checked) => {
                                            try {
                                                await AxiosClient.patch(`/contact/${record.id}`, {
                                                    status: checked,
                                                });
                                                refetch();
                                                Notification('success', 'Cập nhật trạng thái thành công');
                                            } catch (error) {
                                                Notification('error', 'Cập nhật trạng thái thất bại');
                                            }
                                        }}
                                    />
                                ),
                            },
                        ]}
                        total={contact?.totalResults || 0}
                    />
                </CardComponent>
            </Container>
            <ClearFilter
                hidden={
                    Object.values(handleObjectEmpty(filterQuery))?.filter(
                        (item: any) => item !== undefined && item !== ''
                    ).length > 0
                }
                onClick={onClearFilter}
            />
        </>
    );
};

export default ContactPage;
