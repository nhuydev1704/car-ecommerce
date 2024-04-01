'use client';

import { ImageIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import React from 'react';
import ReactImageUploading from 'react-images-uploading';

const ImageUploadProduct = ({ value, onChange }: any) => {
  return (
    <ReactImageUploading
      maxNumber={5}
      multiple
      value={value}
      onChange={onChange}
    >
      {({
        imageList,
        onImageUpload,
        // onImageRemoveAll, onImageUpdate, isDragging,
        onImageRemove,
        dragProps,
        errors,
      }) => (
        // write your building UI
        <div>
          <div
            className={clsx({
              'flex items-end gap-2 pb-2': imageList.length > 0,
            })}
          >
            <div
              aria-hidden
              onClick={onImageUpload}
              {...dragProps}
              className={clsx({
                'flex aspect-video cursor-pointer items-center justify-center rounded-lg bg-[#F1F1F1] shadow-sm transition-all hover:bg-[#e5e5e5]':
                  value?.length === 0 || !value,
                'flex justify-start cursor-pointer items-center rounded-lg w-fit px-[20px] py-[15px] bg-[#F1F1F1] shadow-sm transition-all hover:bg-[#e5e5e5]':
                  value?.length > 0,
              })}
            >
              <div className="flex flex-col items-center justify-center">
                <ImageIcon className="size-6" />
                <p className="mt-2 text-[15px] font-medium text-[#343434]">
                  {value?.length > 0 ? (
                    'Thêm ảnh'
                  ) : (
                    <>
                      Ảnh sản phẩm (Tối đa 5 ảnh ){' '}
                      <span className="text-main">*</span>
                    </>
                  )}
                </p>
              </div>
            </div>
            {imageList.length > 0 && (
              <div className="badge badge-secondary">
                Đã tải lên {imageList.length} ảnh
              </div>
            )}
          </div>
          {imageList.length > 0 && (
            <div className="my-[15px] flex flex-wrap gap-3">
              {imageList.map((image, index: any) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={`${index}`}
                  className="relative w-full max-w-[200px] rounded-b-2xl rounded-t-lg"
                >
                  <img
                    src={image.dataURL}
                    alt="img"
                    className="size-full object-cover"
                  />

                  <div className="absolute right-[-16px] top-[-16px] z-[10]">
                    <button
                      aria-hidden
                      type="button"
                      onClick={() => onImageRemove(index)}
                      className="btn btn-circle btn-sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {errors?.maxNumber && (
            <span className="text-main2 font-bold">Tối đa 5 ảnh</span>
          )}
        </div>
      )}
    </ReactImageUploading>
  );
};

export default React.memo(ImageUploadProduct);
