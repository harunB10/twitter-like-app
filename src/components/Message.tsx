interface MessageProps {
    message: string;
  }

function Message (props: MessageProps) 
{
    return (
        <p className="message"> {props.message} </p>
    )
}

export default Message