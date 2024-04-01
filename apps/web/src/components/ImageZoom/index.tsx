'use client';

import 'react-medium-image-zoom/dist/styles.css';

import React from 'react';
import Zoom from 'react-medium-image-zoom';

const ImageZoom = ({ children }: { children: React.ReactNode }) => {
  return <Zoom>{children}</Zoom>;
};

export default React.memo(ImageZoom);
