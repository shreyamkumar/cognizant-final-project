import React from 'react';
import { useParams, useRouteMatch } from 'react-router';

function ServiceProvider() {
	let match = useRouteMatch();
	let { topicId } = useParams();
	return <div className="serviceprovider">{console.log(topicId)}</div>;
}

export default ServiceProvider;
