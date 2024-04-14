'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import AxiosClient from '@/apis/AxiosClient';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
    full_name: z.string().min(2, {
        message: 'Tên không được ít hơn 2 ký tự',
    }),
    phone: z.string().min(10, {
        message: 'Số điện thoại không hợp lệ',
    }),
    email: z
        .string()
        .email({
            message: 'Email không hợp lệ',
        })
        .optional(),
    address: z.string().min(2, {
        message: 'Địa chỉ không được ít hơn 2 ký tự',
    }),
    note: z.string().optional(),
});

const FormContact = () => {
    const [openModal, setOpenModal] = React.useState(false);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            full_name: '',
            phone: '',
        },
    });

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);

        AxiosClient.post('/contact', values).then((response) => {
            toast.success('Gửi thông tin liên hệ thành công');
            form.reset();
            setOpenModal(true);
        });
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    <FormField
                        control={form.control}
                        name="full_name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Họ và tên *</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nhập họ và tên" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Số điện thoại *</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nhập số điện thoại" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nhập địa chỉ email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Địa chỉ *</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nhập địa chỉ" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="note"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nội dung</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Nhập nội dung" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-center pt-4">
                        <Button className="px-[20px]" type="submit">
                            Gửi đi
                        </Button>
                    </div>
                </form>
            </Form>

            <Dialog open={openModal}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Thành công! Chúng tôi sẽ sớm trả lời bạn.</DialogTitle>
                    </DialogHeader>
                    <div className="flex justify-center py-[20px]">
                        <CountdownCircleTimer
                            onComplete={() => setOpenModal(false)}
                            isPlaying
                            duration={3}
                            size={50}
                            strokeWidth={5}
                            colors="#555"
                        >
                            {({ remainingTime }) => remainingTime}
                        </CountdownCircleTimer>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default FormContact;
