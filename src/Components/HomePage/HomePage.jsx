import { Link } from 'react-router-dom';
import { AlertBar } from './Alertbar';
import { HomepageBanner } from './HomepageBanner';
import banner1 from './Images/banner1.jpeg';
import banner3 from './Images/banner3-2-resized2.png';
import banner2 from './Images/banner5-resized.jpeg';
import banner4 from './Images/banner6-2-resized.jpg';
import './css/homepage.css';

export const HomePage = () => {
	return (
		<>
			<AlertBar
				message={'Start your learning journey with us. '}
				classname={'alert-box alert-secondary text-center'}
				linkText={'Explore Videos'}
				linkto={'/explore'}
			/>

			<div
				className='layout-container'
				style={{
					backgroundImage: `url(https://res.cloudinary.com/u-and-i/image/upload/v1626708991/uandiVideos/x5q5ag7bqbv7jhs3oc9e.jpg)`,
				}}>
				<div className='text-overlay'>
					<h2>Learn and Excel</h2>
					<p>
						If you love painting and thinking where to start, you are at the
						right place. Start your learning jorney with us
					</p>
					<div>
						<Link to='/explore' className='btn btn-solid-primary'>
							Explore Now
						</Link>
					</div>
				</div>
			</div>

			<div className='spacer-4rem'></div>
			<div className='spacer-4rem hide-in-mobile'></div>

			<HomepageBanner
				imgSrc={banner2}
				titleText={'Start Learning Drawing'}
				descText={'Top videos beginner friendly to learn drawing.'}
				btnText={'Check now'}
				btnLink={'/explore/?type=Drawing'}
				badgeText={'made by Manisha Chavan'}
				reversed={false}
			/>
			<div className='spacer-4rem'></div>
			<div className='filter-divider-line hide-in-mobile'></div>
			<div className='spacer-4rem hide-in-mobile'></div>
			<HomepageBanner
				imgSrc={banner3}
				titleText={'Sketch with Charcoal'}
				descText={'Top videos to learn sketching with charcoal.'}
				btnText={'Check now'}
				btnLink={'/explore/?type=Charcoal%20Painting'}
				badgeText={'made by Tejas Ghosale'}
				reversed={true}
			/>

			<div className='spacer-4rem'></div>
			<div className='filter-divider-line hide-in-mobile'></div>
			<div className='spacer-4rem hide-in-mobile'></div>

			<HomepageBanner
				imgSrc={banner1}
				titleText={'Start Learning Painting'}
				descText={'Top videos beginner friendly to learn painting.'}
				btnText={'Check now'}
				btnLink={'/explore/?type=Painting'}
				badgeText={'made by Adarsh Madre'}
				reversed={false}
			/>

			<div className='spacer-4rem'></div>
			<div className='filter-divider-line hide-in-mobile'></div>
			<div className='spacer-4rem hide-in-mobile'></div>

			<HomepageBanner
				imgSrc={banner4}
				titleText={'Start Learning Pencil Sketching'}
				descText={'Top videos beginner friendly to learn pencil sketching.'}
				btnText={'Check now'}
				btnLink={'/explore/?type=Pencil%20Sketching'}
				badgeText={'made by Prakash Bagale'}
				reversed={true}
			/>

			<div className='spacer-4rem'></div>
			<div className='spacer-4rem hide-in-mobile'></div>
		</>
	);
};
