// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'create-nest-starter',
			description: 'Scaffold a production-ready NestJS backend from the command line.',
			favicon: '/favicon.svg',
			logo: {
				src: '/src/assets/logo.svg',
				alt: 'create-nest-starter',
			},
			editLink: { disabled: true },
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/mouloud240/nestjs-starter',
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
			],
		}),
	],
});
