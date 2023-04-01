import PropTypes from 'prop-types';
import { ThreeDots } from 'react-loader-spinner';

const Loader = ({ color = '#00BFFF', height = 80, width = 80 }) => (
  <div className="loader">
    <ThreeDots color={color} height={height} width={width} />
  </div>
);

Loader.propTypes = {
  color: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
};

export default Loader;
