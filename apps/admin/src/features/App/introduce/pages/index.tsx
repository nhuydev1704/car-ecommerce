import AxiosClient from '@/apis/AxiosClient';
import SaveButton from '@/components/Button/Save.Button';
import TopBar from '@/components/TopBar';
import { Notification } from '@/utils';
import React from 'react';
import NewsEditor from '../../product/components/Editor';

const IntroducePage = () => {
    const [callback, setCallback] = React.useState(false);

    const [content, setContent] = React.useState('');

    React.useEffect(() => {
        AxiosClient.get('/introduce').then((response: any) => {
            setContent(response.content);
        });
    }, [callback]);

    return (
        <div>
            <TopBar
                back
                title={'Giới thiệu'}
                extra={[
                    <SaveButton
                        key="saveNew"
                        onClick={() => {
                            AxiosClient.post('/introduce', { content }).then((res: any) => {
                                setCallback((prev) => !prev);
                                Notification('success', 'Cập nhật giới thiệu thành công');
                            });
                        }}
                    />,
                ]}
            />
            <NewsEditor
                height="90vh"
                handleCallbackContent={(content) => {
                    setContent(content);
                }}
                handleCallbackContentNotDebounce={() => {}}
                refContent={content}
            />
        </div>
    );
};

export default IntroducePage;
