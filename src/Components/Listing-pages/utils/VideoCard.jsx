
import { Link } from "react-router-dom";
import "../styles.css"

export const VideoCard = ({video}) =>{

    return (
    <Link to={`/explore/${video._id}`} className="link-no-style" >
    <div className="card-vertical">

      <div className="image-container">
        <img
          className="img-responsive card-img"
          src={video.thumbnail}
          alt={video.name}
        />
      </div>
      <div className = "video-info">
        <img className="avatar avatar-xs-size" src={video.tutorId.avatar} alt="video" />

        <div className="text-container padding-right-0">
            <div className="text-container-title">
                <h6 className="body-cp-rg">
                    {video.name}
                </h6>
            </div>
            <div className="text-container-desc">
                <p className="body-cp-md secondary-text-color text-light-weight">
                {video.tutorId.name}
                </p>
                <p className="body-cp-md secondary-text-color text-light-weight display-flex">
                 {video.type}<span className="badge-dot-to-separate">&#8226;</span>{video.level}
                </p>
            </div>
        </div>
        
      </div>

    </div>
    </Link>
    )

}