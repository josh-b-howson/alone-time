import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';

/**
 * Just a container for togglable content.
 * Outputs a toggle button and the content in a div.
 * No styling is applied here.
 * @param {*} props 
 */
const Dropdown = (props) => {
  // concatenate classNames
  const togglerClassName = [
    "dd__toggler",
    props.togglerClassName,
  ].filter(i => !!i).join(' ');
  const contentClassName = [
    "dd__content",
    props.className,
  ].filter(i => !!i).join(' ');

  const ddContent = useRef(null);
  const [droppedDown, setDroppedDown] = useState(false);

  const handleClickWhileDroppedDown = (e) => {
    if (ddContent.current && !ddContent.current.contains(e.target)) {
      setDroppedDown(false);
      document.removeEventListener('click', handleClickWhileDroppedDown);
    }
  };

  useEffect(() => {
    if (droppedDown)
      document.addEventListener('click', handleClickWhileDroppedDown);
    // cleanup on unmount
    return () => document.removeEventListener('click', handleClickWhileDroppedDown);
  }, [droppedDown]);

  const dropDown = () => setDroppedDown(true);

  return (
    <>
      <button
        className={togglerClassName}
        onClick={dropDown}>
        {props.toggler}
      </button>
      <div
        className={contentClassName}
        ref={ddContent}>
        {props.children}
      </div>
      <style jsx>{`
        .dd__content {
          display: ${droppedDown ? 'block' : 'none'};
        }
      `}</style>
    </>
  )
}

Dropdown.propTypes = {
  toggler: PropTypes.node.isRequired,
}

export default Dropdown;
