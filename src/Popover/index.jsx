import React, { useRef, useState } from 'react';
import { Manager, Reference, Popper } from 'react-popper';

const Popover = ({
  trigger,
  children,
}) => {
  const [isActive, setIsActive] = useState(false);
  const refTriggerWrap = useRef(null);
  const refContent = React.createRef();

  const clonedTrigger = React.cloneElement(trigger, {
    onClick: (e) => {
      e.stopPropagation();
      setIsActive(!isActive);
    }
  });

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <div ref={ref} aria-haspopup="true" aria-expanded={isActive.toString()}>
            <div ref={refTriggerWrap}>{clonedTrigger}</div>
          </div>
        )}
      </Reference>
      {isActive && (
        <Popper
          innerRef={(node) => {
            refContent.current = node;
          }}
          modifiers={[
            {
              name: 'preventOverflow',
            },
          ]}
          placement="bottom-start"
        >
          {({ placement, ref, style }) => (
            <div
              ref={ref}
              style={{
                ...style,
              }}
              data-placement={placement}
            >
              {children}
            </div>
          )}
        </Popper>
      )}
    </Manager>
  );
}

export default Popover;
