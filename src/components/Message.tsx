interface MessageProps {
  message: string;
}
const Message: React.FC<MessageProps> = (props) => {
  return <p className="message"> {props.message} </p>;
}

export default Message;
