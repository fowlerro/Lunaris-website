import { useRouter } from 'next/router';

export default function useGuildId(): string {
	return useRouter().query.guildId as string;
}
