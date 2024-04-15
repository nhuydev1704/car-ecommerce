import React from 'react';

const QA = () => {
    return (
        <section aria-labelledby="faq-heading" className="bg-black/90 mt-[50px]">
            <div className="mx-auto max-w-2xl px-6 py-16 sm:py-24 lg:max-w-7xl lg:px-8">
                <div className="max-w-2xl lg:mx-auto lg:text-center">
                    <h2 id="faq-heading" className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Các câu hỏi thường gặp
                    </h2>
                    <p className="mt-4 text-gray-400">
                        Tìm hiểu mọi thông tin liên quan đến chiếc xe cũ thông qua những câu hỏi thường gặp khi mua ô tô
                        cũ là điều cần thiết giúp người mua đánh giá chính xác và lựa chọn phù hợp.
                    </p>
                </div>
                <div className="mt-20">
                    <dl className="space-y-10 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-10 lg:space-y-0">
                        <div>
                            <dt className="font-semibold text-white">
                                Có cho phép lái thử xe để kiểm tra khả năng vận hành và các trang bị kĩ hơn không?
                            </dt>
                            <dd className="mt-3 text-gray-400">
                                Quý khách hoàn toàn có thể đến lái thử và trải nghiệm xe
                            </dd>
                        </div>

                        <div>
                            <dt className="font-semibold text-white">
                                Có cho phép đem xe đến bên thứ 3 để kiểm tra và thẩm định không?
                            </dt>
                            <dd className="mt-3 text-gray-400">
                                Quý khách hàng hoàn toàn có thể đem xe đến bên thứ 3 như garage, đại lý chính hãng để
                                thẩm định và đánh giá được tình trạng xe chính xác hơn.
                            </dd>
                        </div>

                        <div>
                            <dt className="font-semibold text-white">Chi Phí Check Xe Sẽ Do Bên Nào Chịu?</dt>
                            <dd className="mt-3 text-gray-400">
                                Người mua muốn đem xe đến bên thứ 3 để check xe sẽ chịu hoàn toàn chi phí phát sinh.
                                Thông thường các chi phí rơi vào khoảng 600,000đ đên 2,000,000đ cho 1 lần kiểm định xe
                            </dd>
                        </div>

                        <div>
                            <dt className="font-semibold text-white">
                                Các Hình Thức Thanh Toán Khi Sử Dụng Dịch Vụ Của Auto Chốt?
                            </dt>
                            <dd className="mt-3 text-gray-400">
                                1. Tiền mặt
                                <br />
                                2. Chuyển khoản
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </section>
    );
};

export default QA;
