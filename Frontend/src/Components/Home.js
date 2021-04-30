import React from 'react';
import AddServices from './AddServices';
import Nav from './Nav';

function Home() {
	return (
		<div className="home">
			<Nav />
			<AddServices />
		</div>
	);
}

export default Home;
