import PropTypes from 'prop-types';
import styles from './BibleCopyright.module.scss';

const BibleCopyright = (props) => {
  const copyright = props.copyright;
  /**
   * Add a drop cap number to the first paragraph
   */
  return <small className={styles.copy}>
    {copyright}
  </small>
}

BibleCopyright.propTypes = {
  copyright: PropTypes.node.isRequired,
}

export default BibleCopyright;
