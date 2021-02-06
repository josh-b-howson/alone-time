import PropTypes from 'prop-types';

/**
 * Component for rendering an inline SVG. 
 * Specify an svgId or pass in the inner content as child props.
 * Wrapping the svgs this way keeps everything consistent and allows for fixes to be made in one place.
 */
const SVG = (props) => {
  const { width, height, viewBox, xmlns, className, children } = props;
  return <svg
    width={width}
    height={height}
    viewBox={viewBox}
    xmlns={xmlns}
    className={className}>
    {children && children}
  </svg>
}

SVG.propTypes = {
  children: PropTypes.node,
}

SVG.defaultProps = {
  width: 64,
  height: 64,
  viewBox: '0 0 64 64',
  xmlns: 'http://www.w3.org/2000/svg',
}

export default SVG;
