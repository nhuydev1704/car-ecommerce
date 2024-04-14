// @ts-nocheck
import { GoogleMap, InfoBox, Marker, useJsApiLoader } from '@react-google-maps/api';
// import { Space, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

// const location1 = {
//     lat: 21.034252,
//     lng: 105.847035,
// };

const location2 = {
    lat: 21.012519,
    lng: 105.850305,
};

const containerStyle = {
    width: '100%',
    height: '100%',
};

const options = { closeBoxURL: '', enableEventPropagation: true };

const GoogleMapComponent = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyBnQuI2W5DyQVHJZpOXqiyODTG_d7dkPfk',
        language: 'en',
    });

    return (
        isLoaded && (
            <>
                <GoogleMap mapContainerStyle={containerStyle} center={location2} zoom={15}>
                    <>
                        {/* {basis === '2' ? (
                            <>
                                <Marker
                                    // label={{
                                    //     text: '62 P. Hàng Gà, Hàng Bồ, Hoàn Kiếm, Hà Nội',
                                    //     className: 'marker_style',
                                    // }}
                                    position={location1}
                                />

                                <InfoBox options={options} position={location1}>
                                    <div className="marker_style">
                                        <p className="mb-2 text-[15px] font-bold">Showroom</p>
                                        <div className="mb-2 text-[14px] text-[#D06D6B]">
                                            62 P. Hàng Gà, Hàng Bồ, Hoàn Kiếm, Hà Nội
                                        </div>
                                        <div className="mb-3 text-[13px]">SĐT: 19004468</div>
                                        <div className="flex gap-3">
                                            <a title="Xem trên bản đồ">
                                                <div
                                                    onClick={() => {
                                                        window.open(
                                                            'https://www.google.com/maps?ll=21.034252,105.847035&z=17&t=m&hl=vi&gl=US&mapclient=embed&q=62+P.+H%C3%A0ng+G%C3%A0+H%C3%A0ng+B%E1%BB%93+Ho%C3%A0n+Ki%E1%BA%BFm+H%C3%A0+N%E1%BB%99i',
                                                            '_blank'
                                                        );
                                                    }}
                                                    className="flex items-center justify-center rounded-full bg-sky-400 p-[6px]"
                                                >
                                                    <img
                                                        height={18}
                                                        width={18}
                                                        alt="viewmap"
                                                        src={`${router.basePath}/assets/images/google_maps.png`}
                                                    />
                                                </div>
                                            </a>
                                            <a title="Chỉ đường">
                                                <div
                                                    onClick={() => {
                                                        window.open(
                                                            'https://www.google.com/maps/dir//62+P.+H%C3%A0ng+G%C3%A0+H%C3%A0ng+B%E1%BB%93+Ho%C3%A0n+Ki%E1%BA%BFm+H%C3%A0+N%E1%BB%99i/@21.034252,105.847035,17z/data=!4m5!4m4!1m0!1m2!1m1!1s0x3135abbe84041f55:0xd562419285f56fe5',
                                                            '_blank'
                                                        );
                                                    }}
                                                    className="flex items-center justify-center rounded-full bg-sky-400 p-[6px]"
                                                >
                                                    <img
                                                        alt="viewTrafic"
                                                        height={18}
                                                        width={18}
                                                        src={`${router.basePath}/assets/images/traffic.png`}
                                                    />
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </InfoBox>
                            </>
                        ) : ( */}
                        <>
                            <Marker position={location2} />

                            <InfoBox options={options} position={location2}>
                                <div className="marker_style">
                                    <p className="mb-2 text-[15px] font-bold">Showroom</p>
                                    <div className="mb-2 text-[14px] text-[#D06D6B]">
                                        174 P. Triệu Việt Vương, Hai Bà Trưng, Hà Nội
                                    </div>
                                    <div className="mb-3 text-[13px]">SĐT: 19004468</div>
                                    <div className="flex gap-3">
                                        <a title="Xem trên bản đồ">
                                            <div
                                                onClick={() => {
                                                    window.open(
                                                        'https://www.google.com/maps?ll=21.012519,105.850305&z=17&t=m&hl=vi&gl=US&mapclient=embed&q=174+P.+Tri%E1%BB%87u+Vi%E1%BB%87t+V%C6%B0%C6%A1ng+B%C3%B9i+Th%E1%BB%8B+Xu%C3%A2n+Hai+B%C3%A0+Tr%C6%B0ng+H%C3%A0+N%E1%BB%99i',
                                                        '_blank'
                                                    );
                                                }}
                                                className="flex items-center justify-center rounded-full bg-sky-400 p-[6px]"
                                            >
                                                <img height={18} width={18} alt="viewmap" src={`/google_maps.png`} />
                                            </div>
                                        </a>
                                        <a title="Chỉ đường">
                                            <div
                                                onClick={() => {
                                                    window.open(
                                                        'https://www.google.com/maps/dir//174+P.+Tri%E1%BB%87u+Vi%E1%BB%87t+V%C6%B0%C6%A1ng+B%C3%B9i+Th%E1%BB%8B+Xu%C3%A2n+Hai+B%C3%A0+Tr%C6%B0ng+H%C3%A0+N%E1%BB%99i/@21.0125185,105.8503054,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3135ab8b6fe45c5f:0x3940d8f2d355e396!2m2!1d105.8503054!2d21.0125185',
                                                        '_blank'
                                                    );
                                                }}
                                                className="flex items-center justify-center rounded-full bg-sky-400 p-[6px]"
                                            >
                                                <img alt="viewTrafic" height={18} width={18} src={`/traffic.png`} />
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </InfoBox>
                        </>
                        {/* )} */}
                    </>
                </GoogleMap>
            </>
        )
    );
};

export default GoogleMapComponent;
