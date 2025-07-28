const Message = ({message}:{message:string | undefined}) => {
  return (
    <p className="text-red-500 text-sm">{message}</p>
  )
}

export default Message
