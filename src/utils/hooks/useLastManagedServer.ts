import { useEffect, useState } from 'react';

interface IProps {
	guildId: string;
}

export default function useLastManagedServer({ guildId }: Partial<IProps> = {}) {
	const [lastManagedServer, setLastManagedServer] = useState<string | null>(null);
	useEffect(() => {
		if (guildId) {
			window.localStorage.setItem('lastManagedServer', guildId);
			setLastManagedServer(guildId);
		} else {
			setLastManagedServer(window.localStorage.getItem('lastManagedServer') || null);
		}
	}, [guildId]);

	return lastManagedServer;
}
