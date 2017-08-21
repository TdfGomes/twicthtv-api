import React from 'react';
import update from 'react-addons-update';
import SearchChannel from './SearchChannel';
import AddChannel from './AddChannel';
import Channels from './Channels';

export default class App extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            twitchChannels: ['freecodecamp','natalie_moore','wr4thtv','koshkamoroshka','esl_sc2','streamerhouse','missrubyfalls','grolldir','sim_dude'],
            searchChannel:''
        };

        this.onChangeInput  = this.onChangeInput.bind(this);
        this.onSubmit       = this.onSubmit.bind(this);
        this.filterChannel  = this.filterChannel.bind(this);
    }

    onChangeInput(e){
        this.setState({searchChannel:e.target.value})
    }
    onSubmit(channel){
        const newTwitchChannels = update(this.state,{
            twitchChannels: {
                $push: [channel]
            }
        });
        this.setState(newTwitchChannels);
    }

    filterChannel(){
        const regex = new RegExp(`^${this.state.searchChannel}`, 'gi');
        return this.state.twitchChannels.filter(channel => channel.match(regex));
    }
    render(){
        return(
            <div className="container">
                <div className="row">
                    <SearchChannel cssClass="col s6" onChange={this.onChangeInput}/>
                    <AddChannel cssClass="col s6" onSubmit={this.onSubmit}/>
                </div>
                <div className="row">
                    <Channels allChannels={this.filterChannel()}/>
                </div>
            </div>
        )
    }
};
