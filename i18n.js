module.exports = {
	locales: ['en', 'pl'],
	defaultLocale: 'en',
	pages: {
		'*': ['common', 'layout'],
		'/': ['mainPage'],
		'/commands': ['commandsPage', 'commands'],
		'/contact': ['contactPage'],
		'/servers': ['serversPage'],
		'/dashboard': ['profilePage'],
		'/dashboard/[guildId]': ['dashboardPage'],
		'/dashboard/[guildId]/auto-roles': ['autoRolesPage', 'forms'],
		'/dashboard/[guildId]/levels': ['levelsPage', 'forms'],
		'/dashboard/[guildId]/logs': ['serverLogsPage', 'forms'],
		'/dashboard/[guildId]/embeds/[[...view]]': ['embedsPage', 'forms'],
		'rgx:interactive-roles[A-z]{0,}': ['interactiveRolesPage', 'embedsPage', 'forms'],
	},
};
