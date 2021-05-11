export default {
	ssr: 'true',
	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'example-nuxt-scichart',
		htmlAttrs: {
			lang: 'en',
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: [],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: ['~/components'],

	publicRuntimeConfig: {
		scichart: process.env.SCICHART_KEY,
	},

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		'@nuxtjs/eslint-module',
		'@nuxtjs/date-fns',
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		'vue-scichart/nuxt',
	],

	// Axios module configuration: https://go.nuxtjs.dev/config-axios
	axios: {},

	/*
	 ** Vue-Scichart key
	 */
	scichart: {
		key: process.env.NUXT_ENV_SCICHART_KEY,
	},

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		postcss: {
			preset: {
				features: {
					customProperties: false,
				},
			},
		},
		transpile: ['vue-scichart'],
	},
}
