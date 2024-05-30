const urlPageTitle = "ft_Transcendence";

document.addEventListener("DOMContentLoaded", () => {
	document.addEventListener("click", (e) => {
		const { target } = e;
		if (!target.matches("nav a")) {
			return;
		}
		e.preventDefault();
		urlRoute(e);
	});

	const urlRoutes = {
		// 404: {
		// 	template: "/templates/404.html",
		// 	title: "404 | " + urlPageTitle,
		// 	description: "Page not found"
		// },
		"/": {
			template: "/templates/index.html",
			title: "Home | " + urlPageTitle,
			description: ""
		},
		"/signin": {
			template: "/templates/signin.html",
			title: "Logar | " + urlPageTitle,
			description: ""
		},
		"/signup": {
			template: "/templates/signup.html",
			title: "Cadastrar | " + urlPageTitle,
			description: ""
		},
		"/sair": {
			template: "/templates/index.html",
			title: "Sair | " + urlPageTitle,
			description: ""
		},
		"/pong": {
			template: "/templates/pong.html",
			title: "Pong | " + urlPageTitle,
			description: ""
		}
	};

	const urlRoute = (event) => {
		event = event || window.event;
		event.preventDefault();
		window.history.pushState({}, "", event.target.href);
		urlLocationHandler();
	};

	const loadScript = (src, id) => {
		return new Promise((resolve, reject) => {
			let existingScript = document.getElementById(id);
			if (existingScript) {
				existingScript.parentNode.removeChild(existingScript);
			}

			const script = document.createElement('script');
			script.src = src;
			script.id = id;
			script.onload = resolve;
			script.onerror = reject;
			document.head.appendChild(script);
		});
	};

	const urlLocationHandler = async () => {
		let location = window.location.pathname;
		if (location.length == 0) {
			location = "/";
		}

		const route = urlRoutes[location] || urlRoutes[404];
		let html = await fetch(route.template).then((response) => response.text());

		const contentElement = document.getElementById("content");
		if (contentElement) {
			contentElement.innerHTML = html;
			document.title = route.title;

			const metaDescription = document.querySelector('meta[name="description"]');
			if (metaDescription) {
				metaDescription.setAttribute("content", route.description);
			} else {
				console.error("Meta description element not found.");
			}

			// Carrega scripts específicos se necessário
			if (location === "/pong") {
				try {
					await loadScript("/js/pong.js", "pong-script");
				} catch (error) {
					console.error("Failed to load script:", error);
				}
			}
		} else {
			console.error("Element with ID 'content' not found.");
		}
	};

	window.onpopstate = urlLocationHandler;
	window.router = urlRoute;

	urlLocationHandler();
});
