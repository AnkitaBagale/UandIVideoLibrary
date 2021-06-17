export const VideoCardHorizontal = ({ video }) => {
	const renderDate = (date) => {
		return (
			<time className='body-cp-sm text-light-weight'>
				<span className='padding-right-4px'>
					<i className='far fa-clock'></i>
				</span>
				{date}
			</time>
		);
	};
	const renderVideoTypeLevel = (type, level) => {
		return (
			<p className='body-cp-md secondary-text-color text-light-weight display-flex'>
				{type}
				<span className='badge-dot-to-separate'>&#8226;</span>
				{level}
			</p>
		);
	};

	return (
		<div className='card-horizontal default-container bg-light-pink shadow-box'>
			<div className='image-container'>
				<img
					className='img-responsive card-img'
					src={video.thumbnail}
					alt='video'
				/>
			</div>
			<div className='text-container'>
				<div className='text-container-title padding-right-1rem'>
					<h6>{video.name}</h6>
				</div>
				<div className='text-container-desc'>
					<p className='body-cp-md'>{video.tutorId.name}</p>
					{video.date
						? renderDate(video.date)
						: renderVideoTypeLevel(video.type, video.level)}
				</div>
			</div>
		</div>
	);
};
