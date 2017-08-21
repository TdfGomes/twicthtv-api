import React from 'react';
import api from '../utils/api'

export default class AddChannel extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      addChannel : '',
      error:null
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e){
    const channel = e.target.value.toLowerCase();
    this.setState({addChannel:channel});
    
    if(this.state.error){
      this.setState({error:null });
    }
  }
  handleSubmit(e){
    e.preventDefault();
    api.fetchChannels([this.state.addChannel])
      .then(channelsData => {
        const channel = channelsData[0].channel;
        if(channel.error){
          this.setState({
            addChannel:'',
            error:channel.message
          });
        }
        else{
          this.props.onSubmit(this.state.addChannel);
          this.setState({addChannel:''});
        }
      } );
  }
  render(){
    return(
      <div className="col s6">
        <form onSubmit={this.handleSubmit}>
          <div className="input-field">
            <input
              className="col s8" 
              name="add_ch"
              type="text" 
              placeholder="Add your channel"
              autoComplete="off"
              value={this.state.addChannel}
              onChange={this.handleChange}
            />
            <div className="col s4">
              <button
                className="btn waves-effect waves-light cyan lighten-3"
                type="submit">
                Add
                <i className="material-icons right">add_circle</i>
              </button>
            </div>
            {this.state.error && <p className="col s12" style={{ color: 'red' }}>{this.state.error} <i className="material-icons">error</i></p>}
          </div>
        </form>
      </div>
    )
  }
}

