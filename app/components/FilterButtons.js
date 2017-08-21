import React from 'react';

const FilterButtons  = (props) => {
  const {onClickAll, onClickOnline, onClickOffline} = props;
  return(
    <div className="center-align btn-wrapper">
      <button
        className="btn waves-effect waves-light cyan lighten-3"
        onClick={onClickAll}>
        ALL
        <i className="material-icons right">refresh</i>
      </button>
      <button
        className="btn waves-effect waves-light cyan lighten-3"
        onClick={onClickOnline}>
        ONLINE
        <i className="material-icons right">network_wifi</i>
      </button>
      <button
        className="btn waves-effect waves-light cyan lighten-3"
        onClick={onClickOffline}>
        OFFLINE
        <i className="material-icons right">signal_wifi_off</i>
      </button>
    </div>
  )
};
export default FilterButtons;
  
