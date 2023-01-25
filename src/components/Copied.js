import { getContrastYIQ } from "../helpers";

function Copied({color}) {
    
    return(

       <div className="copied" style={{'--bgColor':`#${color}`,'--textColor':`${getContrastYIQ(color)}`}}>
           Copied #{color} to ClickBoard
       </div>
    )


}

export default Copied