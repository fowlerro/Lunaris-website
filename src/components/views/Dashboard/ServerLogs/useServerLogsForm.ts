import { useEffect, useRef } from 'react';
import isDeepEqual from 'fast-deep-equal/react';
import { useForm } from 'react-hook-form';

import type { GuildLogsPageData } from 'types';

interface UseServerLogsFormProps {
	defaultValues: GuildLogsPageData | undefined;
}

export default function useServerLogsForm({ defaultValues }: UseServerLogsFormProps) {
	// const defaultFormValues: GuildLogsPageData = {
	// 	status: defaultValues?.status ?? false,
	// 	serverLogs: {
	// 		channels: {
	// 			channelId: defaultValues?.serverLogs?.channels?.channelId ?? '',
	// 			logs: defaultValues?.serverLogs?.channels?.logs ?? {
	// 				create: false,
	// 				delete: false,
	// 				edit: false,
	// 			},
	// 		},
	// 		emojis: {
	// 			channelId: defaultValues?.serverLogs?.emojis?.channelId ?? '',
	// 			logs: defaultValues?.serverLogs?.emojis?.logs ?? {
	// 				create: false,
	// 				delete: false,
	// 				edit: false,
	// 			},
	// 		},
	// 		messages: {
	// 			channelId: defaultValues?.serverLogs?.messages?.channelId ?? '',
	// 			logs: defaultValues?.serverLogs?.messages?.logs ?? {
	// 				delete: false,
	// 				edit: false,
	// 				pin: false,
	// 				purge: false,
	// 				unpin: false,
	// 			},
	// 		},
	// 		invites: {
	// 			channelId: defaultValues?.serverLogs?.invites?.channelId ?? '',
	// 			logs: defaultValues?.serverLogs?.invites?.logs ?? {
	// 				create: false,
	// 				delete: false,
	// 			},
	// 		},
	// 		roles: {
	// 			channelId: defaultValues?.serverLogs?.roles?.channelId ?? '',
	// 			logs: defaultValues?.serverLogs?.roles?.logs ?? {
	// 				add: false,
	// 				create: false,
	// 				delete: false,
	// 				edit: false,
	// 				remove: false,
	// 			},
	// 		},
	// 		members: {
	// 			channelId: defaultValues?.serverLogs?.members?.channelId ?? '',
	// 			logs: defaultValues?.serverLogs?.members?.logs ?? {
	// 				ban: false,
	// 				join: false,
	// 				kick: false,
	// 				leave: false,
	// 				nicknameChange: false,
	// 				timeout: false,
	// 				timeoutRemove: false,
	// 				unban: false,
	// 				unwarn: false,
	// 				unwarnAll: false,
	// 				warn: false,
	// 			},
	// 		},
	// 		server: {
	// 			channelId: defaultValues?.serverLogs?.server?.channelId ?? '',
	// 			logs: defaultValues?.serverLogs?.server?.logs ?? {
	// 				unwarnAll: false,
	// 			},
	// 		},
	// 		threads: {
	// 			channelId: defaultValues?.serverLogs?.threads?.channelId ?? '',
	// 			logs: defaultValues?.serverLogs?.threads?.logs ?? {
	// 				create: false,
	// 				delete: false,
	// 				edit: false,
	// 			},
	// 		},
	// 	},
	// };
	const defaultFormValues = {
		status: defaultValues?.status ?? false,
		serverLogs: {
			channels: {
				channelId: defaultValues?.serverLogs?.channels?.channelId ?? undefined,
				logs: defaultValues?.serverLogs?.channels?.logs,
			},
			emojis: {
				channelId: defaultValues?.serverLogs?.emojis?.channelId ?? undefined,
				logs: defaultValues?.serverLogs?.emojis?.logs,
			},
			messages: {
				channelId: defaultValues?.serverLogs?.messages?.channelId ?? undefined,
				logs: defaultValues?.serverLogs?.messages?.logs,
			},
			invites: {
				channelId: defaultValues?.serverLogs?.invites?.channelId ?? undefined,
				logs: defaultValues?.serverLogs?.invites?.logs,
			},
			roles: {
				channelId: defaultValues?.serverLogs?.roles?.channelId ?? undefined,
				logs: defaultValues?.serverLogs?.roles?.logs,
			},
			members: {
				channelId: defaultValues?.serverLogs?.members?.channelId ?? undefined,
				logs: defaultValues?.serverLogs?.members?.logs,
			},
			server: {
				channelId: defaultValues?.serverLogs?.server?.channelId ?? undefined,
				logs: defaultValues?.serverLogs?.server?.logs,
			},
			threads: {
				channelId: defaultValues?.serverLogs?.threads?.channelId ?? undefined,
				logs: defaultValues?.serverLogs?.threads?.logs,
			},
		},
	};

	const defaultValuesRef = useRef(defaultFormValues);
	if (!isDeepEqual(defaultValuesRef.current, defaultFormValues)) defaultValuesRef.current = defaultFormValues;

	const form = useForm<GuildLogsPageData>({
		defaultValues: defaultFormValues,
		reValidateMode: 'onSubmit',
	});

	useEffect(() => {
		form.reset(defaultValuesRef.current);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [defaultValuesRef.current]);

	return form;
}
