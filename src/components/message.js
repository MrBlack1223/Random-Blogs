import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import './message.css'

function Message({msg,handleClose,handleYes,showMsg}){
     const mountedStyle = { animation: "inAnimation 250ms ease-in" };
     const unmountedStyle = {
      animation: "outAnimation 270ms ease-out",
      animationFillMode: "forwards"
     };

    return(<div style = {showMsg ? mountedStyle : unmountedStyle} className="messageContainer">
        <div className="messageWrapper">
            <p className="message">{msg}</p>
            <div className='yesNoButtonContainer'>
                <button className = "yesButton" onClick = {handleYes}><CheckIcon sx={{ fontSize: 70 }} /></button>
                <button className = "noButton" onClick = {handleClose}><CloseIcon sx={{ fontSize: 70 }}/></button>
            </div>
            
        </div>
    </div>)
}

export default Message