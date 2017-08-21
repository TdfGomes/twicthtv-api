import React from 'react';
import api from '../utils/api';
import FilterButtons from './FilterButtons';

 const ChannelItem = (props) => {
   const { channel, stream, name, url, logo, status, isStreaming, isOnline,viewers} = props;
   
   return(
      <div className="col s4 channel-card">
        <div className="card">
          <div className="card-image">
            <img src={logo}/>
            <span className="card-title"><div className="inner-title">{name}</div></span>
            {isStreaming ?
             <button className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons light-green">network_wifi</i></button>
              :
             <button className="btn-floating halfway-fab waves-effect waves-light red"><i className="material-icons red lighten-1">signal_wifi_off</i></button>
            }
          </div>
          <div className="card-content">
            <p>
              {
                isOnline ? isOnline : status
              }
            </p>
            {isStreaming && <div className="viewers"><span style={{float:'left',marginLeft:0}} className="badge cyan lighten-3 white-text">Viewers: <b>{viewers}</b></span></div> }
          </div>
          <div className="card-action">
           <a className="cyan-text text-darken-2" href={url}>Visit this Channel</a>
          </div>
        </div>
      </div>
   );
 };
 

export default class Channels extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      twitchChannels : this.props.allChannels,
      channelsData : []
    }
    this.onClickAll = this.onClickAll.bind(this);
    this.onClickOnline = this.onClickOnline.bind(this);
    this.onClickOffline = this.onClickOffline.bind(this);
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.allChannels !== this.props.allChannels){
      api.fetchChannels(nextProps.allChannels).then(channelsData => this.setState({channelsData}) );
    }  
  } 
  componentDidMount() {
    api.fetchChannels(this.state.twitchChannels).then(channelsData => this.setState({channelsData}) );
  }
  onClickAll() {
    api.fetchChannels(this.state.twitchChannels).then(channelsData => this.setState({ channelsData }));
  }
  onClickOnline() {
    const onlineChannels = this.state.channelsData.filter(channel => channel.streams.stream != null);
    
    if(onlineChannels.length){
      this.setState({channelsData:onlineChannels});
    }
  }
  onClickOffline() {
    const offline = this.state.channelsData.filter(channel => channel.streams.stream === null);

    if(offline.length){
      this.setState({ channelsData: offline});
    }
  }
  render(){
    return(
      <div className="col s12">
        <FilterButtons onClickOnline={this.onClickOnline} onClickOffline={this.onClickOffline} onClickAll={this.onClickAll} />
        {
         ! this.state.channelsData
         ? <p>LOADING</p>
         : this.state.channelsData.map(ch => (
           <ChannelItem 
              key={ch.channel._id}
              channel={ch.channel}
              stream={ch.streams.data}
              name={ch.channel.display_name}
              url={ch.channel.url}
              logo={ch.channel.logo}
              status={ch.channel.status}
              isStreaming={ch.streams.stream}
              isOnline={ch.streams.stream !== null ? ch.streams.stream.channel.status : 'Offline'}
              viewers={ch.streams.stream !== null ? ch.streams.stream.viewers : 0}
           />
         ))
        }
      </div>
    )
  }
}

