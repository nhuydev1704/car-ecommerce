'use client';

import { TrashIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

const DeleteCategory = (props: any) => {
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    await fetch(`/api/category`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: props.id,
      }),
    });
    setLoading(false);
    toast.success('Xoá thành công !');

    router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      aria-hidden
      type="button"
      className="btn btn-sm"
    >
      {loading ? <span className="loading loading-spinner" /> : <TrashIcon />}
    </button>
  );
};

export default DeleteCategory;
