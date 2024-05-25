const urlPageTitle = "My SPA";
const urlRoutes = {
	"/signin": {
		template: "signin.html",
		title: "Logar | " + urlPageTitle,
		description: ""
	},
	"/signup": {
		template: "signup.html",
		title: "Cadastrar | " + urlPageTitle,
		description: ""
	},
	"/sair": {
		template: "sair.html",
		title: "Sair | " + urlPageTitle,
		description: ""
	},
	"/pong": {
		template: "pong.html",
		title: "Pong | " + urlPageTitle,
		description: ""
	}
};

const loadContent = async (url) => {
	const route = urlRoutes[url] || urlRoutes["/"];
	try {
		const response = await fetch(`/templates/${route.template}`);
		if (response.ok) {
			const html = await response.text();
			document.getElementById("content").innerHTML = html;
			document.title = route.title;
		} else {
			document.getElementById("content").innerHTML = "<h1>404 - Not Found</h1>";
			document.title = "404 - Not Found";
		}
	} catch (error) {
		console.error("Failed to fetch content:", error);
	}
};

window.onpopstate = () => loadContent(window.location.pathname);

document.addEventListener("DOMContentLoaded", () => {
	document.body.addEventListener("click", (e) => {
		if (e.target.tagName === "A" && e.target.href.startsWith(window.location.origin)) {
			e.preventDefault();
			const url = new URL(e.target.href);
			window.history.pushState({}, "", url.pathname);
			loadContent(url.pathname);
		}
	});
	loadContent(window.location.pathname);
});
