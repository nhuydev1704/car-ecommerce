'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import type { z } from 'zod';

import { categoryValidate } from '@/validations/GuestbookValidation';

import ImageUploadCategory from '../ImageUpload/ImageUploadCategory';

const FormCategory = () => {
  const { slug } = useParams();

  const [loading, setLoading] = React.useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof categoryValidate>>({
    resolver: zodResolver(categoryValidate),
  });

  const [logo, setLogo] = React.useState<any>('');

  const handleCreate = handleSubmit(async (data) => {
    setLoading(true);
    if (slug) {
      await fetch(`/api/category`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: slug,
          name: data.name,
          image: logo,
        }),
      });
      toast.success('Cật nhật thành công !');
    } else {
      await fetch(`/api/category`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.name,
          image: logo,
        }),
      });
      toast.success('Thêm thành công !');
    }

    setLoading(false);
    window.location.href = '/admin/category';
    reset();
  });

  React.useEffect(() => {
    if (slug) {
      fetch(`/api/category?id=${slug}`)
        .then((res) => res.json())
        .then((data) => {
          setLogo(data.image);
          reset(data);
        });
    }
  }, [slug]);

  return (
    <section className="mt-10 bg-white">
      <form onSubmit={handleCreate}>
        <div className="flex gap-[40px]">
          <div className="w-[200px]">
            <ImageUploadCategory
              value={logo}
              onChange={(imgs: any) => {
                setLogo(imgs);
              }}
            />
            {!logo && (
              <div className="my-2 text-xs italic text-red-500">
                Vui lòng chọn ảnh
              </div>
            )}
          </div>

          <div className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">
                Tên hãng xe <span className="text-red-500">*</span>
              </span>
            </div>
            <input
              type="text"
              placeholder="Nhập tên hãng xe"
              className="input input-bordered w-[400px]"
              {...register('name')}
            />
            {errors.name?.message && (
              <div className="my-2 text-xs italic text-red-500">
                {errors.name?.message}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center py-[40px]">
          <button type="submit" className="btn btn-primary px-[40px]">
            Lưu
            {loading && <span className="loading loading-spinner" />}
          </button>
        </div>
      </form>
    </section>
  );
};

export default FormCategory;
