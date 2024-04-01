import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';
import React from 'react';

const checkImage = (file: any) => {
  const types = ['image/png', 'image/jpeg', 'image/jpg'];
  let err = '';
  // eslint-disable-next-line no-return-assign
  if (!file) return (err = 'Tập tin không tồn tại.');

  if (types.includes(file.type)) {
    if (file?.size > 2 * 1024 * 1024) {
      err = 'Kích cỡ hình ảnh trong nội dung vượt quá 2 MB.';
    }
  } else if (file?.type === 'video/mp4') {
    if (file?.size > 300 * 1024 * 1024) {
      err = 'Dung lượng video trong nội dung nhỏ hơn 300 MB';
    }
  }

  // file type video

  return err;
};

const RichEditor = ({
  disabled,
  refContent,
  handleCallbackContentNotDebounce,
}: any) => {
  const [content, setContent] = React.useState('');

  // React.useEffect(() => {
  //   handleCallbackContent(debounceContent);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [debounceContent]);

  React.useEffect(() => {
    setContent(refContent);
  }, [refContent]);

  return (
    <>
      <input
        id="my-file-upload"
        accept="image/* video/*"
        type="file"
        name="my-file-upload"
        style={{ display: 'none' }}
      />
      <Editor
        disabled={disabled}
        value={content}
        onEditorChange={(ct: any) => {
          setContent(ct);
          handleCallbackContentNotDebounce(ct);
        }}
        apiKey="hjuz02bsvcykwi6ruki9xpuarsd6l8txzaouzknog6xef2w5"
        init={{
          placeholder: 'Nhập nôi dung ...',
          height: 480,
          content_style:
            'body { font-family:Quicksand,sans-serif; font-size:14px }',
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'preview',
            'searchreplace',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'help',
            'wordcount',
          ],
          toolbar:
            'undo redo | blocks | ' +
            'image media ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',

          default_link_target: '_blank',
          entity_encoding: 'raw',
          menubar: false,
          statubar: true,
          branding: false,
          async file_picker_callback(callback: any, _value: any, meta: any) {
            if (meta?.filetype === 'image') {
              const input: any = document.getElementById('my-file-upload');
              input.click();
              input.onchange = async () => {
                const file = input.files[0];
                const check = checkImage(file);
                if (check !== '' && check) {
                  return;
                }

                const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
                const formData = new FormData();
                formData.append('file', file);
                formData.append('upload_preset', 'qznfh3dk');

                // eslint-disable-next-line no-await-in-loop
                const res: any = await axios.post(url, formData);

                setTimeout(() => {
                  callback(res.data.secure_url, {
                    alt: res.data.secure_url,
                  });
                }, 1000);

                // AxiosClient.post(
                //   '/files/upload/single/image',
                //   fmData,
                //   config
                // ).then(res => {
                //   if (res?.data?.url) {
                //     callback(res?.data?.url, {
                //       alt: file.name,
                //     });
                //   }
                // });
              };
            } else {
              const input: any = document.getElementById('my-file-upload');
              input.click();
              input.onchange = async () => {};
            }
          },
        }}
      />
    </>
  );
};

export default React.memo(RichEditor);
