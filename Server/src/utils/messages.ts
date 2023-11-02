import moment from 'moment'

interface IFormatMessage {
    username:string;
    text:string;
    time:string
}


export function formatMessage(username:string, text:string):IFormatMessage {
  return {
    username,
    text,
    time: moment().format('h:mm a')
  };
}


