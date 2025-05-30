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
	gtag:{

		id:process.env.NUXT_PUBLIC_GA_ID,
		initMode: 'manual',
	},
	app: {
		head: {
			charset: "utf-8",
			viewport: "width=500, initial-scale=1",
			title: "Tomasz Kozysa | UX & UI | Responsive Web Design & Development",
			meta: [
				{
					name: "description",
					content:
						"London based, freelance digital product designer/developer, expert in making complex things simple.",
				},
				{
					name: "viewport",
					content:
						"user-scalable=yes, initial-scale=1.0, maximum-scale=3.0, minimum-scale=.2, width=device-width",
				},
				{ 	
					name : "google-site-verification",
					content:"bvokHxMko__JtyTBnr7BeqwEjhe4yGg2_WDvSlxajts"
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
					quality:70,
					sizes:"sm:100vw md:100vw lg:100vw xl:100vw xxl:100vw 2xl:100vw"
				},
			},
			wide: { // 8xl 1440
				modifiers: {
					format: "webp",
					width: 1440,
					quality:70,
					sizes:"sm:100vw md:100vw lg:100vw xl:100vw xxl:1440px"
				},
			},
			default: { // 6xl 1152
				modifiers: {
					format: "webp",
					width: 1152,
					quality:70,
					sizes:"sm:100vw md:100vw lg:100vw xl:1152px"
				},
			},
			half: {
				modifiers: {
					format: "webp",
					width: 600,
					quality:70,
					sizes:"sm:100vw md:100vw lg:50vw"
				},
			},
			mobile: {
				modifiers: {
					format: "webp",
					width: 400,
					quality:70,
					sizes:"sm:100vw md:400px"
				},
			},
			square4: {
				modifiers: {
					format: "webp",
					width: 400,
					quality:70,
					sizes:"sm:400px"
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
		  // Theme used in all color schemes.
		  theme: 'github-light',
		  // OR
		//   theme: {
		// 	// Default theme (same as single string)
		// 	default: 'github-light',
		// 	// Theme used if `html.dark`
		// 	dark: 'github-dark',
		// 	// Theme used if `html.sepia`
		// 	sepia: 'monokai'
		//   }
		},
		markdown:{
			anchorLinks:false,
			mdc:true,
		},
	  },

	  runtimeConfig: {
		public: {
		  gaId: process.env.NUXT_PUBLIC_GA_ID || '',
		  cookieName:process.env.NUXT_PUBLIC_COOKIE_NAME || '',
		  cookieExpireDays: '365'
		}
	  },

	  sitemap: {
		hostname: 'https://kozysa.me',
		exclude: ['/components/**','/layouts/**'],
		sources: [
		  '/api/_sitemap__/urls'
		]
	  },
	  

	compatibilityDate: "2024-10-22",
});