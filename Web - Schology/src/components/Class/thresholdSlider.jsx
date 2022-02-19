import { useState } from "react";
import RangeSlider from 'react-bootstrap-range-slider';
import { AlertType } from "../Notice/utility";

const ThresholdSlider = ({ threshold, SetThreshold}) => {
    return (
      <div className="threshold col-5">
        <RangeSlider
        value={threshold}
        tooltipLabel={currentValue => `${currentValue}%`}
        onChange={e => SetThreshold(e.target.value)}
        step={10}
        tooltipPlacement='top'
        tooltip='auto'  
        variant={AlertType.Alert_Warning}
       />
      </div>
    );
  
  };
export default ThresholdSlider;