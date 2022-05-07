import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import type { GuildLogsPageData } from 'types';

interface UseServerLogsFormProps {
	defaultValues: GuildLogsPageData | undefined;
}

export default function useServerLogsForm({ defaultValues }: UseServerLogsFormProps) {
	const defaultFormValues = useMemo(
		() => ({
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
		}),
		[defaultValues]
	);

	const form = useForm<GuildLogsPageData>({
		defaultValues: defaultFormValues,
		reValidateMode: 'onSubmit',
	});

	const { reset } = form;

	useEffect(() => {
		reset(defaultFormValues);
	}, [defaultFormValues, reset]);

	return form;
}
