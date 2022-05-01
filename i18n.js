module.exports = {
	locales: ['en', 'pl'],
	defaultLocale: 'en',
	pages: {
		'*': ['common', 'layout'],
		'/': ['mainPage', 'modules'],
		'/commands': ['commandsPage', 'commands', 'forms'],
		'/modules': ['modulesPage', 'modules'],
		'/contact': ['contactPage', 'forms'],
		'/servers': ['serversPage'],
		'/dashboard': ['profilePage'],
		'/dashboard/[guildId]': ['dashboardPage', 'modules'],
		'/dashboard/[guildId]/auto-roles': ['autoRolesPage', 'forms'],
		'/dashboard/[guildId]/levels': ['levelsPage', 'forms'],
		'/dashboard/[guildId]/logs': ['serverLogsPage', 'forms'],
		'/dashboard/[guildId]/embeds/[[...view]]': ['embedsPage', 'forms'],
		'rgx:interactive-roles[A-z]{0,}': ['interactiveRolesPage', 'embedsPage', 'forms'],
	},
};
