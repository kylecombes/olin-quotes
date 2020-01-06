import * as React from 'react';

type InfoSectionProps = {
  title: string
  children: React.ReactNode
  className?: string
  headingType?: Heading
  collapseHeadingMargin?: boolean
};

export enum Heading {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
}

const InfoSection: React.FC<InfoSectionProps> = (props: InfoSectionProps) => {
  const {
    headingType,
  } = props;

  const headingClassNames = ['info-section-header'];
  if (props.collapseHeadingMargin) {
    headingClassNames.push('no-bottom-margin');
  }

  let heading;

  switch (headingType) {
    case Heading.h5:
      heading = <h5 className={headingClassNames.join(' ')}>{props.title}</h5>;
      break;
    case Heading.h4:
      heading = <h4 className={headingClassNames.join(' ')}>{props.title}</h4>;
      break;
    case Heading.h3:
      heading = <h3 className={headingClassNames.join(' ')}>{props.title}</h3>;
      break;
    case Heading.h2:
      heading = <h2 className={headingClassNames.join(' ')}>{props.title}</h2>;
      break;
    case Heading.h1:
    default:
      heading = <h1 className={headingClassNames.join(' ')}>{props.title}</h1>;
      break;
  }

  return (
    <div className={'InfoSection ' + (props.className || '')}>
      {heading}
      {props.children}
    </div>
  );
};

export default InfoSection;
