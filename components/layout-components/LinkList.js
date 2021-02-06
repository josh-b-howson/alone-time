import styles from './LinkList.module.scss';
import React from 'react';

const LinkList = (props) => {
  const className = [
    styles[props.display],
    props.className
  ].filter(i => !!i).join(' ');

  /**
   * Clone the children, add props.
   * Grants the children access to the list's display mode.
   * */ 
  const addPropsToChildren = () =>
    React.Children.map(props.children, child => {
      // checking isValidElement is the safe way and avoids a typescript error too
      return React.isValidElement(child)
        ? React.cloneElement(child, { display: props.display })
        : child
    });

  return (
    <ul className={className}>
      {addPropsToChildren()}
    </ul>
  )
}

LinkList.defaultProps = {
  display: "stacked",
}

export default LinkList;
