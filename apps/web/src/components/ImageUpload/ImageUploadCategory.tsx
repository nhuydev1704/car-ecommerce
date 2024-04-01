'use client';

import { ImageIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import { index } from 'drizzle-orm/mysql-core';
import { CldUploadWidget } from 'next-cloudinary';
import React from 'react';

const ImageUploadCategory = ({ value, onChange }: any) => {
  return (
    <div>
      {value ? (
        <div className="flex justify-center">
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={`${index}`}
            className="relative size-[110px] rounded-b-2xl rounded-t-lg"
          >
            <img src={value} alt="img" className="size-full object-cover" />
          </div>
        </div>
      ) : (
        <div
          aria-hidden
          className={clsx({
            'flex aspect-video cursor-pointer items-center justify-center rounded-lg bg-[#F1F1F1] shadow-sm transition-all hover:bg-[#e5e5e5]':
              value?.length === 0 || !value,
            'flex justify-start cursor-pointer items-center rounded-lg w-fit px-[20px] py-[15px] bg-[#F1F1F1] shadow-sm transition-all hover:bg-[#e5e5e5]':
              value?.length > 0,
          })}
        >
          <div className="flex flex-col items-center justify-center">
            <ImageIcon className="size-10" />
            <p className="mt-2 text-[15px] font-medium text-[#343434]">
              {value?.length > 0 ? (
                'Thêm ảnh'
              ) : (
                <span>
                  Logo
                  <span className="text-red-500"> *</span>
                </span>
              )}
            </p>
          </div>
        </div>
      )}
      <div className="flex justify-center py-2">
        <CldUploadWidget
          uploadPreset="ml_default"
          onSuccess={(result: any, { widget }) => {
            onChange(result?.info?.secure_url);
            widget.close();
          }}
        >
          {({ open }) => {
            function handleOnClick() {
              open();
            }
            return (
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleOnClick}
              >
                Upload
              </button>
            );
          }}
        </CldUploadWidget>
        {/* <CldUploadButton
          className="btn btn-primary"
          uploadPreset="ml_default"
          onSuccess={(result, { widget }) => {
            console.log('🚀 ~ ImageUploadCategory ~ result:', result);
            widget.close();
          }}
        /> */}
      </div>
    </div>
  );

  // return (
  //   <ReactImageUploading
  //     multiple
  //     value={value}
  //     onChange={onChange}
  //     maxNumber={1}
  //   >
  //     {({
  //       imageList,
  //       onImageUpload,
  //       // onImageRemoveAll, onImageUpdate, isDragging,
  //       onImageUpdate,
  //       onImageRemove,
  //       dragProps,
  //       errors,
  //     }) => (
  //       // write your building UI
  //       <div>
  //         <div
  //           className={clsx({
  //             'flex items-end gap-2 pb-2': imageList.length > 0,
  //           })}
  //         >
  //           {imageList.length <= 0 && (
  //             <div
  //               aria-hidden
  //               onClick={onImageUpload}
  //               {...dragProps}
  //               className={clsx({
  //                 'flex aspect-video cursor-pointer items-center justify-center rounded-lg bg-[#F1F1F1] shadow-sm transition-all hover:bg-[#e5e5e5]':
  //                   value?.length === 0 || !value,
  //                 'flex justify-start cursor-pointer items-center rounded-lg w-fit px-[20px] py-[15px] bg-[#F1F1F1] shadow-sm transition-all hover:bg-[#e5e5e5]':
  //                   value?.length > 0,
  //               })}
  //             >
  //               <div className="flex flex-col items-center justify-center">
  //                 <ImageIcon className="size-10" />
  //                 <p className="mt-2 text-[15px] font-medium text-[#343434]">
  //                   {value?.length > 0 ? (
  //                     'Thêm ảnh'
  //                   ) : (
  //                     <>
  //                       Logo
  //                       <span className="text-red-500"> *</span>
  //                     </>
  //                   )}
  //                 </p>
  //               </div>
  //             </div>
  //           )}
  //         </div>

  //         {imageList.length > 0 && (
  //           <div className="my-[15px] grid grid-cols-4 gap-3">
  //             {imageList.map((image, index: any) => (
  //               <div
  //                 // eslint-disable-next-line react/no-array-index-key
  //                 key={`${index}`}
  //                 className="relative size-[110px] rounded-b-2xl rounded-t-lg"
  //               >
  //                 <img
  //                   src={image.dataURL}
  //                   alt="img"
  //                   className="size-full object-cover"
  //                 />

  //                 <div className="absolute right-[-16px] top-[-16px] z-[10]">
  //                   {index === 0 && imageList.length > 1 ? (
  //                     <button
  //                       aria-hidden
  //                       type="button"
  //                       onClick={() => onImageUpdate(index)}
  //                       className="btn btn-circle"
  //                     >
  //                       <svg
  //                         width="15"
  //                         height="15"
  //                         viewBox="0 0 15 15"
  //                         fill="none"
  //                         xmlns="http://www.w3.org/2000/svg"
  //                       >
  //                         <path
  //                           d="M12.1464 1.14645C12.3417 0.951184 12.6583 0.951184 12.8535 1.14645L14.8535 3.14645C15.0488 3.34171 15.0488 3.65829 14.8535 3.85355L10.9109 7.79618C10.8349 7.87218 10.7471 7.93543 10.651 7.9835L6.72359 9.94721C6.53109 10.0435 6.29861 10.0057 6.14643 9.85355C5.99425 9.70137 5.95652 9.46889 6.05277 9.27639L8.01648 5.34897C8.06455 5.25283 8.1278 5.16507 8.2038 5.08907L12.1464 1.14645ZM12.5 2.20711L8.91091 5.79618L7.87266 7.87267L8.12731 8.12732L10.2038 7.08907L13.7929 3.5L12.5 2.20711ZM9.99998 2L8.99998 3H4.9C4.47171 3 4.18056 3.00039 3.95552 3.01877C3.73631 3.03668 3.62421 3.06915 3.54601 3.10899C3.35785 3.20487 3.20487 3.35785 3.10899 3.54601C3.06915 3.62421 3.03669 3.73631 3.01878 3.95552C3.00039 4.18056 3 4.47171 3 4.9V11.1C3 11.5283 3.00039 11.8194 3.01878 12.0445C3.03669 12.2637 3.06915 12.3758 3.10899 12.454C3.20487 12.6422 3.35785 12.7951 3.54601 12.891C3.62421 12.9309 3.73631 12.9633 3.95552 12.9812C4.18056 12.9996 4.47171 13 4.9 13H11.1C11.5283 13 11.8194 12.9996 12.0445 12.9812C12.2637 12.9633 12.3758 12.9309 12.454 12.891C12.6422 12.7951 12.7951 12.6422 12.891 12.454C12.9309 12.3758 12.9633 12.2637 12.9812 12.0445C12.9996 11.8194 13 11.5283 13 11.1V6.99998L14 5.99998V11.1V11.1207C14 11.5231 14 11.8553 13.9779 12.1259C13.9549 12.407 13.9057 12.6653 13.782 12.908C13.5903 13.2843 13.2843 13.5903 12.908 13.782C12.6653 13.9057 12.407 13.9549 12.1259 13.9779C11.8553 14 11.5231 14 11.1207 14H11.1H4.9H4.87934C4.47686 14 4.14468 14 3.87409 13.9779C3.59304 13.9549 3.33469 13.9057 3.09202 13.782C2.7157 13.5903 2.40973 13.2843 2.21799 12.908C2.09434 12.6653 2.04506 12.407 2.0221 12.1259C1.99999 11.8553 1.99999 11.5231 2 11.1207V11.1206V11.1V4.9V4.87935V4.87932V4.87931C1.99999 4.47685 1.99999 4.14468 2.0221 3.87409C2.04506 3.59304 2.09434 3.33469 2.21799 3.09202C2.40973 2.71569 2.7157 2.40973 3.09202 2.21799C3.33469 2.09434 3.59304 2.04506 3.87409 2.0221C4.14468 1.99999 4.47685 1.99999 4.87932 2H4.87935H4.9H9.99998Z"
  //                           fill="currentColor"
  //                           fillRule="evenodd"
  //                           clipRule="evenodd"
  //                         />
  //                       </svg>
  //                     </button>
  //                   ) : (
  //                     <button
  //                       aria-hidden
  //                       type="button"
  //                       onClick={() => onImageRemove(index)}
  //                       className="btn btn-circle btn-sm"
  //                     >
  //                       <svg
  //                         xmlns="http://www.w3.org/2000/svg"
  //                         className="size-4"
  //                         fill="none"
  //                         viewBox="0 0 24 24"
  //                         stroke="currentColor"
  //                       >
  //                         <path
  //                           strokeLinecap="round"
  //                           strokeLinejoin="round"
  //                           strokeWidth="2"
  //                           d="M6 18L18 6M6 6l12 12"
  //                         />
  //                       </svg>
  //                     </button>
  //                   )}
  //                 </div>
  //               </div>
  //             ))}
  //           </div>
  //         )}
  //         {errors?.maxNumber && (
  //           <span className="font-bold text-red-600">Tối đa 1 ảnh</span>
  //         )}
  //       </div>
  //     )}
  //   </ReactImageUploading>
  // );
};

export default React.memo(ImageUploadCategory);
