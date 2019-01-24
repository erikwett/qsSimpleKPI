import React, { Component } from 'react';
import PropTypes from 'prop-types';
const dividedByObject = Object.freeze({
  'one': '100%',
  'two': '40%',
  'three': '30%',
  'four': '22%',
  'five': '17%',
  'six': '14%',
  'seven': '12%',
  'eight': '7%'
});
class DimensionEntry extends Component {
  constructor (props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.hidePointerCursor = this.hidePointerCursor.bind(this);

  }

  hidePointerCursor () {
    const { isInEditMode } = this.props;
    if(!isInEditMode){
      return "pointer";
    }else{
      return "default";
    }
  }

  updateFlexBasis (key) {
    this.props.style.flexBasis = dividedByObject[key];
  }
  handleClick () {
    const {
      dimNo,
      dimensionIndex,
      isSelected,
      onDeselect,
      onSelect,
      isInEditMode
    } = this.props;
    if(isInEditMode){
      return;
    }
    if(this.props.dimension[0].qIsNull){
      return;
    }
    this.props.onToggle(dimNo, dimensionIndex);
    isSelected ? onDeselect() : onSelect();
  }
  render () {
    const {
      children,
      showAs,
      style,
      label,
      divideBy,
      divideByNumber,
      dimDivideBy
    } = this.props;
    const { isSelected } = this.props;
    const isSelectedClass = isSelected ? ' is-selected' : '';
    this.updateFlexBasis(dimDivideBy);
    return (
      <div className={`ui ${showAs}${isSelectedClass}`} style={style}>
        {label.isHidden
          ? null
          : (
            <a
              className={`ui ${label.size} ${label.orientation} ${label.alignment} label`}
              onClick={this.handleClick}
              style={{ cursor: this.hidePointerCursor() }}
            >{label.text}</a>
          )
        }
        <div className={`ui ${divideBy} ${label.alignment} statistics`}>
          {children}
        </div>
      </div>
    );
  }
}

DimensionEntry.propTypes = {
  children: PropTypes.node.isRequired,
  dimension: PropTypes.array.isRequired,
  dimensionIndex: PropTypes.number,
  dimNo: PropTypes.number,
  dindex: PropTypes.any,
  divideBy: PropTypes.any,
  divideByNumber: PropTypes.any,
  isInEditMode: PropTypes.bool,
  isSelected: PropTypes.bool,
  label: PropTypes.shape({
    isHidden: PropTypes.bool,
    orientation: PropTypes.string,
    alignment: PropTypes.string,
    size: PropTypes.string,
    text: PropTypes.string
  }).isRequired,
  onDeselect: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  showAs: PropTypes.string.isRequired,
  style: PropTypes.object,
  dimDivideBy: PropTypes.string
};

export default DimensionEntry;
