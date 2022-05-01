import { useState, useEffect } from 'react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const showButton = ()=>{
      setVisible(props.createBlogVisible)
    }
      showButton()
   
  }, [props.createBlogVisible])

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={()=>{toggleVisibility(); props.setCreateBlogVisible(true)}}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
}

export default Togglable