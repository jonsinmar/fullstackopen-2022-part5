const Notification = ({ message, type }) => {
    if (message?.text === null) {
      return null
    }
  
    return (
      <div className={type}>
        {message}
      </div>
    )
  }

  export default Notification;