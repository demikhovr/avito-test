import React from 'react';
import PropTypes from 'prop-types';

class Picture extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      lastIndex: 0,
    };

    this._imgRef = React.createRef();

    this._setImg = this._setImg.bind(this);
    this._getRandomSource = this._getRandomSource.bind(this);
    this._onLoad = this._onLoad.bind(this);
  }

  componentDidMount() {
    const { lastIndex } = this.state;
    const { pictures } = this.props;
    const picture = pictures[lastIndex];
    this._setImg(picture);
  }

  componentDidUpdate(prevProps) {
    const prevActive = prevProps.isActive;
    const {
      pictures,
      isActive,
    } = this.props;

    if (!isActive || prevActive === isActive) {
      return;
    }

    const index = this._getRandomSource();
    const picture = pictures[index];
    this._setImg(picture);
  }

  _setImg(src) {
    this.setState({
      isLoading: true,
    });

    this._imgRef.current.src = src;
  }

  _getRandomSource() {
    const { lastIndex } = this.state;
    const { pictures } = this.props;
    let randomIndex;

    while (randomIndex === undefined || randomIndex === lastIndex) {
      randomIndex = Math.floor(Math.random() * pictures.length);
    }

    this.setState({
      lastIndex: randomIndex,
    });

    return randomIndex;
  }

  _onLoad() {
    const {
      isActive,
      onResetActiveItem,
    } = this.props;

    if (isActive) {
      onResetActiveItem();
    }

    this.setState({
      isLoading: false,
    });
  }

  render() {
    const { isLoading } = this.state;
    const className = isLoading ? 'product-pic__img--loading' : '';

    return (
      <img
        className={`product-pic__img ${className}`}
        width="120"
        alt=""
        ref={this._imgRef}
        onLoad={this._onLoad}
      />
    );
  }
}

Picture.propTypes = {
  pictures: PropTypes.arrayOf(PropTypes.string),
  isActive: PropTypes.bool.isRequired,
  onResetActiveItem: PropTypes.func.isRequired,
};

Picture.defaultProps = {
  pictures: [],
};

export default Picture;
