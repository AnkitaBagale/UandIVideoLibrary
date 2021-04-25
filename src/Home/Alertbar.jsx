import { useState } from "react";
import { Link } from "react-router-dom";

export const AlertBar = ({message, classname, linkText, linkto}) =>{
    
    const [isHidden, setHidden] = useState(false);

    return(
        <div style={{display: isHidden?"none":"block"}} className={classname}>
          {message}
          <Link
            to={linkto}
            className="link-no-style link-text link-text-primary"
          >
            {linkText}
          </Link>
          <button onClick={()=>{setHidden(true)}} type="button" className="btn-close" id="alert-example-close-btn"></button>
        </div>
    )
}