import React from 'react';

export default class SearchChannel extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      filter : ''
    }
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }
  onChangeHandler(e){
    // console.log(e.target.value);
    this.props.onChange(e);
    this.setState({filter:e.target.value})
  }
  render(){
    return(
      <div className="col s6">
        <div className="input-field">
          <input 
            type="text" 
            placeholder="Search your channel"
            value={this.state.filter}
            onChange={this.onChangeHandler}
          />
        </div>
      </div>
    )
  }
}

