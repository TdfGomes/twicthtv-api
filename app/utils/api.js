import axios from 'axios'

const getChannel = (user) => (
  axios.get(`https://wind-bow.glitch.me/twitch-api/channels/${user}`)
    .then((user) => user.data)
);

const getStream = (user) => (
  axios.get(`https://wind-bow.glitch.me/twitch-api/streams/${user}` )
    .then((user) => user.data)
);
const getChannelsData = (ch) => {
  return axios.all([
    getChannel(ch),
    getStream(ch)
  ]).then(function (data) {
    var channel = data[0];
    var streams = data[1];

    return {
      channel: channel,
      streams: streams
    }
  });
}
const handleError = (error) => {
  console.warn(error);
  return null;
}

module.exports = {
  fetchChannels: function (ch) {
    return axios.all(ch.map(getChannelsData))
      .then(channelData => channelData)
      .catch(handleError);
  },
}