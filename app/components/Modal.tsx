import * as React from 'react';

type Props = {
  close: () => any
  children: React.ReactNode
  isClosable: boolean
};

const Modal: React.FC<Props> = (props: Props) => {
  const containerOnClick = props.isClosable ? props.close : null;

  return (
    <div className="Modal" onClick={containerOnClick}>
      <div className="Modal-content" onClick={e => e.stopPropagation()}>
        {props.children}
      </div>
    </div>
  )
};

export default Modal;
