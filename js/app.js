document.addEventListener("DOMContentLoaded", () => {
	navegacionFija();
	crearGaleria();
	resaltarEnlaces();
});

function navegacionFija() {
	const barra = document.querySelector(".header");
	const sobreFestival = document.querySelector(".sobre-festival");

	window.addEventListener("scroll", function () {
		sobreFestival.getBoundingClientRect().bottom < 1 ? barra.classList.add("fixed") : barra.classList.remove("fixed");
	});
}

function crearGaleria() {
	const CANTIDAD_IMAGENES = 16;
	const galeria = document.querySelector(".galeria-imagenes");
	for (let i = 1; i <= CANTIDAD_IMAGENES; i++) {
		const imagen = document.createElement("PICTURE");
		imagen.innerHTML = `
    <source srcset="build/img/gallery/thumb/${i}.avif" type="image/avif">
    <source srcset="build/img/gallery/thumb/${i}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galeria">
`;
		imagen.onclick = () => {
			mostrarImagen(i);
		};
		galeria.appendChild(imagen);
	}
}

function mostrarImagen(i) {
	const imagen = document.createElement("PICTURE");
	imagen.innerHTML = `
    <source srcset="build/img/gallery/full/${i}.avif" type="image/avif">
    <source srcset="build/img/gallery/full/${i}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/gallery/full/${i}.jpg" alt="imagen galeria">
`;
	//generar modal
	const modal = document.createElement("DIV");
	modal.className = "modal";
	modal.appendChild(imagen);

	//Agregar boton para cerrar modal
	const cerrarBoton = document.createElement("BUTTON");
	cerrarBoton.textContent = "X";
	cerrarBoton.classList.add("cerrar-modal");
	cerrarBoton.onclick = cerrarModal;
	modal.appendChild(cerrarBoton);

	//agregar Modal al body
	const body = document.querySelector("body");
	body.classList.add("overflow-hidden");
	body.appendChild(modal);
}
function cerrarModal() {
	const modal = document.querySelector(".modal");
	const body = document.querySelector("body");

	modal.classList.add("fade-out");
	setTimeout(() => {
		modal?.remove();
		body.classList.remove("overflow-hidden");
	}, 300);
}
function resaltarEnlaces() {
	window.addEventListener("scroll", () => {
		const sections = document.querySelectorAll("section");
		const navLinks = document.querySelectorAll(".navegacion-principal a");
		let actual = "";
		sections.forEach((section) => {
			const sectionTop = section.offsetTop;
			const sectionHeight = section.clientHeight;
			if (window.scrollY >= sectionTop - sectionHeight / 3) {
				actual = section.id;
			}
		});

		navLinks.forEach((link) => {
			if (link.getAttribute("href") === `#${actual}`) {
				link.classList.add("active");
			} else {
				link.classList.remove("active");
			}
		});
	});
}
