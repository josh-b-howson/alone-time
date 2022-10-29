import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';

/**
 * Just a container for togglable content.
 * Outputs a toggle button and the content in a div.
 * Simply sets content to display: [block || none] when droppedDown 
 * is true/false, respectively.
 * 
 * No styling is applied here.
 * @param {*} props 
 */
const Dropdown = (props) => {

  const ddContent = useRef(null);
  const [droppedDown, setDroppedDown] = useState(false);

  // concatenate classNames
  const togglerClassName = [
    "dd__toggler",
    props.togglerClassName,
  ].filter(i => !!i).join(' ');

  const contentClassName = [
    "dd__content",
    props.contentClassName,
  ].filter(i => !!i).join(' ');


  const addDroppedDownEventListeners = () => {
    document.addEventListener('click', handleClickWhileDroppedDown);
    document.addEventListener('keyup', handleKeyUpWhileDroppedDown);
  }

  const removeDroppedDownEventListeners = () => {
    document.removeEventListener('click', handleClickWhileDroppedDown);
    document.removeEventListener('keyup', handleKeyUpWhileDroppedDown);
  }

  const handleClickWhileDroppedDown = (e) => {
    if (ddContent.current && !ddContent.current.contains(e.target)) {
      setDroppedDown(false);
      removeDroppedDownEventListeners();
    }
  };

  const handleKeyUpWhileDroppedDown = (e) => {
    if (e.code === 'Escape') {
      setDroppedDown(false);
      removeDroppedDownEventListeners();
    }
  };

  useEffect(() => {
    if (droppedDown) {
      addDroppedDownEventListeners();

      /* This is really unnecessary but fun. Scrolls the element 
      to the top but also recursively scrolls child nodes to the 
      top. If a component is very big, this could have a performance 
      impact. In that case, probably disable this via props or 
      remove altogether. */
      const recursiveScrollAllChildrenToTop = (node) => {
        if (node.childNodes.length > 0)
          node.childNodes.forEach(child => {
            child.scrollTop = 0;
            recursiveScrollAllChildrenToTop(child);
          });
      }
      recursiveScrollAllChildrenToTop(ddContent.current);
    }
    // cleanup on unmount
    return () => {
      removeDroppedDownEventListeners();
    }
  }, [droppedDown]);

  const dropDown = () => setDroppedDown(true);

  return (
    <>
      <button
        className={togglerClassName}
        onClick={dropDown}>
        {props.toggler}
      </button>
      <props.contentTag
        className={contentClassName}
        ref={ddContent}
        tabIndex="-1">
        {props.children}
      </props.contentTag>
      <style global jsx>{`
        .dd__content.${props.contentClassName} {
          display: ${droppedDown ? 'block' : 'none'};
        }
      `}</style>
    </>
  )
}

Dropdown.defaultProps = {
  contentTag: 'div',
}

Dropdown.propTypes = {
  /** Pass in a the toggler element. This will be wrapped 
  * in a button with the onClick toggle event */
  toggler: PropTypes.node.isRequired,
  /** Content class is important to ensure the show/hide toggling
   * applies to this component & this component only */
  contentClassName: PropTypes.string.isRequired,
  /* Specify the content's html tag as string (default: 'div') */
  contentTag: PropTypes.string,
}

export default Dropdown;
