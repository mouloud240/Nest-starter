// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'nestforge',
			description: 'Scaffold a production-ready NestJS backend from the command line.',
			favicon: '/favicon.svg',
			logo: {
				src: '/src/assets/logo.svg',
				alt: 'nestforge',
			},
			editLink: { disabled: true },
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/mouloud240/NestForge',
				},
			],
			customCss: ['./src/styles/theme.css'],
			expressiveCode: {
				styleOverrides: {
					codeBackground: '#0d0d0d',
					borderColor: 'rgba(255, 255, 255, 0.08)',
				},
			},
			head: [
				{
					tag: 'link',
					attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
				},
				{
					tag: 'link',
					attrs: {
						rel: 'preconnect',
						href: 'https://fonts.gstatic.com',
						crossorigin: '',
					},
				},
				{
					tag: 'link',
					attrs: {
						rel: 'stylesheet',
						href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap',
					},
				},
			],
			sidebar: [
				{
					label: 'Get started',
					items: [
						{ label: 'Introduction', link: '/docs/introduction/' },
						{ label: 'Quickstart', link: '/docs/quickstart/' },
					],
				},
				{
					label: 'Core',
					items: [
						{ label: 'Folder structure', link: '/docs/core/folder-structure/' },
						{ label: 'Dependency injection', link: '/docs/core/dependency-injection/' },
						{ label: 'Configuration', link: '/docs/core/configuration/' },
						{ label: 'Logging', link: '/docs/core/logging/' },
						{ label: 'Health checks', link: '/docs/core/health-checks/' },
						{ label: 'Redis usage', link: '/docs/core/redis-usage/' },
						{ label: 'WebSocket gateway', link: '/docs/core/websocket-gateway/' },
						{ label: 'Background jobs', link: '/docs/core/background-jobs/' },
						{ label: 'Mailer', link: '/docs/core/mailer/' },
						{ label: 'Security', link: '/docs/core/security/' },
					],
				},
				{
					label: 'Authentication',
					items: [
						{ label: 'Local auth & sessions', link: '/docs/authentication/local-auth-and-sessions/' },
						{ label: 'OAuth', link: '/docs/authentication/oauth/' },
					],
				},
				{
					label: 'REST',
					items: [
						{ label: 'Controllers & versioning', link: '/docs/rest/controllers-and-versioning/' },
						{ label: 'Auth endpoints', link: '/docs/rest/auth-endpoints/' },
						{ label: 'Guards & decorators', link: '/docs/rest/guards-and-decorators/' },
					],
				},
				{
					label: 'GraphQL',
					items: [
						{ label: 'Setup & resolvers', link: '/docs/graphql/setup-and-resolvers/' },
						{ label: 'Data loaders', link: '/docs/graphql/data-loaders/' },
						{ label: 'Guards & context', link: '/docs/graphql/guards-and-context/' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'Environment variables', link: '/docs/reference/environment-variables/' },
						{ label: 'CLI options', link: '/docs/reference/cli-options/' },
					],
				},
				{
					label: 'Coming soon',
					items: [
						{ label: 'Roadmap', link: '/docs/coming-soon/' },
					],
				},
			],
		}),
	],
});
