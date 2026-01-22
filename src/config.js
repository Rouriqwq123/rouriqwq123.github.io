const config = {
	// Website metadata (SEO & browser title)
	metaData: {
		title: "Rouri's Personal Website 🎶",
		description: "Welcome to Rouri's personal website. Music, creativity, and life.",
		keywords: "Rouri, personal website, portfolio, music, creator",
		icon: "/favicon.ico"
	},

	// Avatar (public/img/avatar.jpg)
	avatar: "/img/avatar.jpg",

	// Welcome title on homepage
	welcometitle: "Hi, I'm Rouri",

	// Color settings
	color: {
		themecolor: "rgb(255, 255, 255)",
		welcometitlecolor: "#FFFFFF",
		turntablecolor1: "#36bd84",
		turntablecolor2: "#a96224"
	},

	// Background brightness & blur
	brightness: 85,
	blur: 8,

	// Personal tags / labels
	tags: [
		"Music Creator",
		"Composer",
		"Arranger",
		"Creative Developer",
		"Lifelong Learner"
	],

	// Default background wallpaper
	background: {
		pc: {
			type: "video", // "pic" | "video"
			datainfo: {
				title: "Default Wallpaper",
				preview: "/img/wallpaper/static/安逸舒适/image-pre.webp",
				url: "/img/wallpaper/dynamic/rouri/2.mp4"
			}
		},
		mobile: {
			type: "pic",
			datainfo: {
				title: "Default Mobile Wallpaper",
				preview: "/img/wallpaper/static-mobile/default/image-pre.webp",
				url: "/img/wallpaper/dynamic-mobile/chuva/qwq.jpg"
			}
		}
	},

	// Skill radar chart
	polarChart: {
		skills: [
			"Anime OST type music",
			"Digicore type music",
			"Ambient",
			"Mixing",
			"Hyperpop",
			"Pop, Rnb",
			"Diary",
			"Regalia",
		],
		skillPoints: [90, 95, 88, 90, 95, 80,90,79]
	},

	// Social platform icons
	socialPlatformIcons: [
		{ icon: "mdi-github", link: "https://github.com/Rouriqwq123" },
		{ icon: "mdi-email", link: "Rouriqwq@gmail.com" },
		{ icon: "mdi-youtube", link: "https://www.youtube.com/@Rouriqwq" },
	],

	// Typewriter text
	typeWriterStrings: [
		"Hello, I'm Rouri.",
		"Welcome to my  website.",
		"I love composing musics",
		"Especially hyperpop, digicore, jpop, anime type beat"
	],

	// Music player (MetingJS - NetEase Cloud Music)
	musicPlayer: {
		server: "netease",
		type: "playlist",
		id: "2028178887" // Replace with your own playlist ID
	},

	// Project / work cards
	projectcards: [
		{
			go: "🎧 Visit",
			img: "/img/ytb.png",
			title: "Youtube",
			subtitle: "My Works & Creations",
			text: "My Youtube Channel",
			url: "https://www.youtube.com/@Rouriqwq",
			show: false
		},
		{
			go: "🎧 Visit",
			img: "/img/bili.png",
			title: "Bilibili",
			subtitle: "My Works & Creations in Chinese Social Media",
			text: "My Bilibili channel",
			url: "https://space.bilibili.com/511070963?spm_id_from=333.1007.0.0",
			show: false
		},
		{
			go: "💻 Visit",
			img: "/img/git.png",
			title: "Github",
			subtitle: "My Projects & Work",
			text: "My Github Account",
			url: "https://github.com/Rouriqwq123",
			show: false
		},
		{
			go: "🎵 Visit",
			img: "/img/RS.png",
			title: "R&S Studio",
			subtitle: "My Music studio with my friend",
			text: "R&S",
			url: "https://r-s-studio.github.io/",
			show: false
		}
	],

	// Footer statement
	statement: [
		"Built with passion by Rouri",
		"Copyright © 2025 Rouri"
	]
};

export default config;
