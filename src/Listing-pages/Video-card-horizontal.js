

export const VideoCardHorizontal = ({video}) =>{

    const renderDate = (date) =>{
       return (
        <time className="body-cp-sm text-light-weight">
            <span className="margin-right-4px"><i className="far fa-clock"></i></span>
            {date.toDateString()}
        </time>
     ) 
    }
    const renderVideoTypeLevel = (type, level) =>{
        return(
            <p className="body-cp-md secondary-text-color text-light-weight display-flex">
                {type}<span className="badge-dot-to-separate">&#8226;</span>{level}
            </p>
        )
    }

    return (
        <div className="card-horizontal default-container">
            <div className="image-container">
            <img className="img-responsive card-img" src={video.thumbnail} alt="product-image" />
            </div>
            <div className="text-container">
                <div className="text-container-title">
                    <h6>{video.name}</h6>
                </div>
                <div className="text-container-desc">
                    <p className="body-cp-md">{video.tutor.name}</p>
                    {video.date ? renderDate(video.date) : renderVideoTypeLevel(video.type, video.level)}
                </div>
            </div>
        </div>      
    )
}