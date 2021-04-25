import { Link } from "react-router-dom";
import "./banner.css";

export const HomepageBanner = ({imgSrc, titleText, descText, btnText, btnLink, badgeText, reversed}) =>{
    return(
        <div>
        <div className="banner-wrapper">
            <div className="banner-50-50" style={{flexDirection: reversed?"row-reverse":"row" }}>
                <span className="badge-container">
                    <img src={imgSrc} className={reversed ? "banner-img-right" :"banner-img-left"} alt="banner" />
                    <span className={`badge ${reversed? "bottom-right-position" : "bottom-right-position-reversed"} bg-secondary`}>{badgeText}</span>
                </span>

                <div className="text-container">
                    <h3>{titleText}</h3>
                    <p>{descText}</p>
                    <div className="CTA-Container">
                        <Link to={btnLink} className="btn btn-solid-primary">{btnText}</Link>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}