import useEventListener from './useEventListener';

export default function useLeaveWithChanges(changes: boolean) {
	const handleLeavePageUnsaved = (e: BeforeUnloadEvent) => {
		if (!changes) return;
		e.preventDefault();
		e.returnValue = '';
		return null;
	};

	useEventListener('beforeunload', handleLeavePageUnsaved);
}
