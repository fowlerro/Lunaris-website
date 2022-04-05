import { useEffect, useState } from 'react';

export default function useVisitedFeatures(action: 'set' | 'get', feature: string) {
	const [visitedFeature, setVisitedFeature] = useState<boolean>(false);

	useEffect(() => {
		const visitedFeatures = JSON.parse(window.localStorage.getItem('visitedFeatures') || '{}');
		setVisitedFeature(visitedFeatures[feature]);
		if (action === 'set') {
			visitedFeatures[feature] = true;
			setVisitedFeature(visitedFeatures[feature]);
			window.localStorage.setItem('visitedFeatures', JSON.stringify(visitedFeatures));
		}
	}, [action, feature]);

	return visitedFeature;
}
