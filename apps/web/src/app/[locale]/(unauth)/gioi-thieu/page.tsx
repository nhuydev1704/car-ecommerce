'use client';

import React from 'react';

const Introduce = () => {
    const [introduce, setIntroduce] = React.useState('');

    React.useEffect(() => {
        fetch('http://localhost:3003/v1' + '/introduce')
            .then((response) => response.json())
            .then((data) => setIntroduce(data.content));
    }, []);

    return (
        <div className="p-[20px]">
            <div className="content" dangerouslySetInnerHTML={{ __html: introduce }} />
        </div>
    );
};

export default Introduce;
