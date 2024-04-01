import React from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';

import IconArrow from '@/icons/IconArrow';

function Arrow({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled: boolean;
  onClick: VoidFunction;
}) {
  return (
    <div className="hidden flex-col justify-center px-2 md:flex">
      <button
        style={{
          right: '1%',
          opacity: disabled ? '0' : '1',
          userSelect: 'none',
        }}
        disabled={disabled}
        onClick={onClick}
        type="button"
        className="btn btn-circle btn-outline btn-primary btn-sm"
      >
        {children}
      </button>
      {/* </Button> */}
    </div>
  );
}

export function LeftArrow() {
  const { isFirstItemVisible, scrollPrev, visibleElements, initComplete } =
    React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(
    !initComplete || (initComplete && isFirstItemVisible),
  );
  React.useEffect(() => {
    // NOTE: detect if whole component visible
    if (visibleElements.length) {
      setDisabled(isFirstItemVisible);
    }
  }, [isFirstItemVisible, visibleElements]);

  return (
    <Arrow disabled={disabled} onClick={() => scrollPrev()}>
      <IconArrow size="25" />
    </Arrow>
  );
}

export function RightArrow() {
  const { isLastItemVisible, scrollNext, visibleElements } =
    React.useContext(VisibilityContext);

  const [disabled, setDisabled] = React.useState(
    !visibleElements.length && isLastItemVisible,
  );
  React.useEffect(() => {
    if (visibleElements.length) {
      setDisabled(isLastItemVisible);
    }
  }, [isLastItemVisible, visibleElements]);

  return (
    <Arrow disabled={disabled} onClick={() => scrollNext()}>
      <IconArrow size="25" right />
    </Arrow>
  );
}
