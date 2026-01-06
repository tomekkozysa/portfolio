// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindTypography from "@tailwindcss/typography";
export default defineNuxtConfig({
	modules: [
		"@nuxtjs/tailwindcss",
		"@nuxt/image-edge",
		"@vueuse/nuxt",
		"@nuxtjs/sitemap",
		"@nuxtjs/robots",
		"@nuxt/content",
		"nuxt-gtag",
	],
	plugins: [],
	target: "static",
	gtag: {

		id: process.env.NUXT_PUBLIC_GA_ID,
		initMode: 'manual',
		config: { send_page_view: false },   // prevent auto page_view
		initCommands: [
			// make sure GA sees default=denied even if it loads later
			['consent', 'default', {
				ad_user_data: 'denied',
				ad_personalization: 'denied',
				ad_storage: 'denied',
				analytics_storage: 'denied',
				wait_for_update: 500
			}]
		]
	},
	app: {
		head: {
			charset: "utf-8",
			viewport: "width=500, initial-scale=1",
			title: "Tomasz Kozysa | Freelance Web Design & Development | London ",
			meta: [
				{
					name: "description",
					content:
						"London based, freelance web developer, expert in making complex things simple.",
				},
				{
					name: "viewport",
					content:
						"user-scalable=yes, initial-scale=1.0, maximum-scale=3.0, minimum-scale=.2, width=device-width",
				},
				{
					name: "google-site-verification",
					content: "bvokHxMko__JtyTBnr7BeqwEjhe4yGg2_WDvSlxajts"
				}
			],
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }
			],
			script: [{ src: "/js/anime.js" }],
			htmlAttrs: {
				lang: 'en'
			}

		},
	},

	hooks: {
		// Doc: https://content.nuxtjs.org/advanced#contentfilebeforeinsert
		"content:file:beforeInsert": async (document, database) => {
			if (document.extension === ".md" && document.thumbnail) {
				document.thumbnail = await database.markdown.toJSON(
					document.thumbnail
				);
			}
			if (document.extension === ".md" && document.order) {
				document.order = await database.markdown.toJSON(document.order);
			}
		},
	},

	image: {
		// The screen sizes predefined by `@nuxt/image`:
		screens: {
			xs: 320,
			sm: 640,
			md: 768,
			lg: 1024,
			xl: 1280,
			xxl: 1536,
			"2xl": 1800,
		},
		presets: {
			full: {
				modifiers: {
					format: "webp",
					width: 1800,
					quality: 70,
					sizes: "sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw 2xl:100vw"
				},
			},
			wide: { // 8xl 1440
				modifiers: {
					format: "webp",
					width: 1440,
					quality: 70,
					sizes: "sm:100vw md:100vw lg:100vw xl:100vw xxl:1440px"
				},
			},
			default: { // 6xl 1152
				modifiers: {
					format: "webp",
					width: 1152,
					quality: 70,
					sizes: "sm:100vw md:100vw lg:100vw xl:1152px"
				},
			},
			half: {
				modifiers: {
					format: "webp",
					width: 600,
					quality: 70,
					sizes: "sm:100vw md:100vw lg:50vw"
				},
			},
			mobile: {
				modifiers: {
					format: "webp",
					width: 400,
					quality: 70,
					sizes: "sm:100vw md:400px"
				},
			},
			square4: {
				modifiers: {
					format: "webp",
					width: 400,
					quality: 70,
					sizes: "sm:400px"
				},
			},

		},
	},

	css: ['~/assets/css/custom.css'],
	tailwindcss: {
		config: {
			plugins: [tailwindTypography],
			content: [
				`/components/**/*.{vue,js,ts}`,
				`/layouts/**/*.vue`,
				`/pages/**/*.vue`,
				`/composables/**/*.{js,ts}`,
				`/plugins/**/*.{js,ts}`,
				`/App.{js,ts,vue}`,
				`/app.{js,ts,vue}`,
				`/Error.{js,ts,vue}`,
				`/error.{js,ts,vue}`,
				"content/**/*.md",
			],
			theme: {
				extend: {
					maxWidth: {
						"8xl": "96rem", //1440 
						"ch": "50ch",
					},
					minHeight: {
						"90vh": "90vh",
						"80vh": "80vh",
						"70vh": "70vh",
					}
				},
			},
		},
	},
	content: {
		highlight: {
			theme: 'github-light',
		},
		markdown: {
			anchorLinks: false,
			mdc: true,
		},
	},

	runtimeConfig: {
		public: {
			gaId: process.env.NUXT_PUBLIC_GA_ID || '',
			posthogKey: process.env.NUXT_PUBLIC_POSTHOG_KEY || '',
			cookieName: process.env.NUXT_PUBLIC_COOKIE_NAME || '',
			cookieExpireDays: '365',
			posthogPublicKey: process.env.NUXT_PUBLIC_POSTHOG_KEY || '',
			posthogHost: process.env.NUXT_PUBLIC_POSTHOG_HOST || 'https://eu.i.posthog.com',
			posthogDefaults: '2025-11-30',
		}
	},

	sitemap: {
		hostname: 'https://kozysa.me',
		exclude: ['/components/**', '/layouts/**'],
		sources: [
			'/api/_sitemap__/urls'
		]
	},
	// posthogConfig: {
	// 	publicKey: process.env.NUXT_PUBLIC_POSTHOG_KEY, // Find it in project settings https://app.posthog.com/settings/project
	// 	host: 'https://us.i.posthog.com', // Optional: defaults to https://us.i.posthog.com. Use https://eu.i.posthog.com for EU region
	// 	clientConfig: {
	// 		// Optional: PostHog client configuration options
	// 	},
	// },


	compatibilityDate: "2024-10-22",
});
