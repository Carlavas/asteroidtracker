// Lista de URLs de imágenes de asteroides
const imagenesAsteroides = [
    "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/solar/internal_resources/4898/Asteroid_Vesta-1.jpeg?w=2048&format=webp&fit=clip&crop=faces%2Cfocalpoint",
    "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/solar/internal_resources/5264/Asteroid_Bennu-1.jpeg?w=2048&format=webp&fit=clip&crop=faces%2Cfocalpoint",
    "https://science.nasa.gov/wp-content/uploads/2017/12/dinkinesh-firstlook-llorri.webp?w=2048&format=webp",
    "https://science.nasa.gov/wp-content/uploads/2017/11/itokawa-banner-1920x640-1.jpg?w=2048&format=webp",
    "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/solar/2023/09/p/i/a/0/PIA02467-1.jpg?w=2048&format=webp&fit=clip&crop=faces%2Cfocalpoint"
];

// Función para obtener una imagen aleatoria
function obtenerImagenAleatoria() {
    const indiceAleatorio = Math.floor(Math.random() * imagenesAsteroides.length);
    return imagenesAsteroides[indiceAleatorio];
}

// Clave API de la NASA
const apiKey = "hShkmY5juDP1gXXGm0PTPc9pO7ju4R6M2hVrNOFn";

// Inicializa el mapa centrado en coordenadas específicas
const map = L.map("map", {
    center: [20, 0], // Coordenadas centradas en la Tierra (latitud, longitud)
    zoom: 2,         // Nivel de zoom inicial
    maxBounds: [
        [85, -180],    // Coordenadas de la esquina superior izquierda (lat, lon)
        [-85, 180],    // Coordenadas de la esquina inferior derecha (lat, lon)
    ],
    maxZoom: 6,      // Define el nivel de zoom máximo
    minZoom: 2,      // Define el nivel de zoom mínimo
    worldCopyJump: true, // Permite que el mapa se desplace más allá de los límites
    noWrap: true     // Evita que el mapa "se envuelva"
});

// Cargar solo una capa de mapa, por ejemplo, OpenStreetMap
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Almacenar los marcadores para poder actualizarlos después
let marcadores = [];

// Crear un nuevo icono personalizado para los asteroides
const asteroidIcon = L.icon({
  iconUrl: 'imagenes/asteroide.png.png', // Aquí coloca tu URL de imagen
  iconSize: [40, 40], // Tamaño del icono
  iconAnchor: [16, 16], // Punto de anclaje del icono (en el centro)
  popupAnchor: [0, -16], // Ajusta la posición del popup
});

// Función para obtener asteroides dentro de un rango de fechas
async function obtenerAsteroides(startDate, endDate) {
    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}&api_key=${apiKey}`;
    console.log(`Solicitando datos para el rango: ${startDate} - ${endDate}`);
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(`Datos recibidos para el rango: ${startDate} - ${endDate}`);
            return data.near_earth_objects;
        } else {
            console.error(`Error en la solicitud: ${response.statusText}`);
            return [];
        }
    } catch (error) {
        console.error(`Error al obtener datos para el rango ${startDate} - ${endDate}:`, error);
        return [];
    }
}

// Función para mostrar asteroides en el mapa
function mostrarAsteroides(asteroides) {
    // Limpiar los marcadores anteriores
    marcadores.forEach(marker => marker.remove());
    marcadores = [];

    // Agregar los nuevos marcadores al mapa
    Object.values(asteroides).forEach(dia => {
        dia.forEach(asteroide => {
            const nombre = asteroide.name;
            const coordenadas = [Math.random() * 180 - 90, Math.random() * 360 - 180];
            const tamano = asteroide.estimated_diameter.meters.estimated_diameter_max;
            const velocidad = asteroide.close_approach_data[0].relative_velocity.kilometers_per_hour;
            const fecha = asteroide.close_approach_data[0].close_approach_date;
            const distancia = asteroide.close_approach_data[0].miss_distance.kilometers;
            const imagen = obtenerImagenAleatoria();

            const marker = L.marker(coordenadas, { icon: asteroidIcon }) // Aquí se usa el icono personalizado
                .addTo(map)
                .bindPopup(`
                    <b>${nombre}</b><br>
                    Tamaño: ${tamano} metros<br>
                    Velocidad: ${velocidad} km/h<br>
                    Fecha de paso: ${fecha}<br>
                    Distancia: ${distancia} km<br>
                    <img src="${imagen}" alt="Imagen de ${nombre}" style="width: 150px; height: auto;"/>
                `, {
                    autoPan: true,
                    keepInView: true,
                    offset: [0, -20]
                });

            // Guardar marcador en el array para futura referencia
            marcadores.push({ marker, nombre });
        });
    });
}

// Función para actualizar el gráfico con los datos de los asteroides
let asteroidChart = null;
function actualizarGrafico(asteroides) {
    const labels = [];
    const datosTamanos = [];

    // Recopilar los datos de los asteroides para el gráfico
    Object.values(asteroides).forEach(dia => {
        dia.forEach(asteroide => {
            labels.push(asteroide.name);
            datosTamanos.push(asteroide.estimated_diameter.meters.estimated_diameter_max);
        });
    });

    // Si el gráfico ya existe, lo actualizamos
    if (asteroidChart) {
        asteroidChart.destroy();
    }

    // Crear un nuevo gráfico con los datos
    const ctx = document.getElementById("asteroid-chart").getContext("2d");
    asteroidChart = new Chart(ctx, {
        type: "bar", // Tipo de gráfico (barras)
        data: {
            labels: labels,
            datasets: [{
                label: "Tamaño máximo (metros)",
                data: datosTamanos,
                backgroundColor: "rgba(54, 162, 235, 0.2)", // Color de fondo de las barras
                borderColor: "rgba(54, 162, 235, 1)", // Color del borde de las barras
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Asteroides"
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "Tamaño máximo (m)"
                    },
                    beginAtZero: true
                }
            }
        }
    });
}

// Función para aplicar los filtros de búsqueda
async function applyFilters() {
    const startDate = document.getElementById("start-date").value;
    const endDate = document.getElementById("end-date").value;
    const minSize = document.getElementById("min-size").value;

    if (!startDate || !endDate) {
        alert("Por favor, selecciona un rango de fechas.");
        return;
    }

    // Validación del tamaño mínimo
    if (minSize < 0 || minSize > 15000) {
        alert("Por favor, introduce un tamaño mínimo entre 0 y 15000 metros.");
        return;
    }

    console.log(`Fechas seleccionadas: ${startDate} - ${endDate}`);

    const start = new Date(startDate);
    const end = new Date(endDate);
    const asteroidesTotales = {};

    let currentStartDate = start;
    let currentEndDate = new Date(currentStartDate);
    currentEndDate.setDate(currentStartDate.getDate() + 7); // Definir un rango de 7 días

    while (currentEndDate <= end) {
        const startDateStr = currentStartDate.toISOString().split('T')[0];
        const endDateStr = currentEndDate.toISOString().split('T')[0];

        const asteroides = await obtenerAsteroides(startDateStr, endDateStr);
        Object.assign(asteroidesTotales, asteroides);

        currentStartDate = new Date(currentEndDate);
        currentEndDate.setDate(currentStartDate.getDate() + 7);
    }

    if (currentStartDate < end) {
        const startDateStr = currentStartDate.toISOString().split('T')[0];
        const endDateStr = end.toISOString().split('T')[0];
        const asteroides = await obtenerAsteroides(startDateStr, endDateStr);
        Object.assign(asteroidesTotales, asteroides);
    }

    mostrarAsteroides(asteroidesTotales);
    actualizarTabla(asteroidesTotales);
    actualizarGrafico(asteroidesTotales); // Actualizar el gráfico con los nuevos datos
    buscarPorNombre(); // Asegurarse de que se actualiza la búsqueda después de aplicar los filtros
}

// Función para actualizar la tabla de asteroides
function actualizarTabla(asteroides) {
    const tbody = document.getElementById("tabla-asteroides").getElementsByTagName("tbody")[0];
    tbody.innerHTML = ""; // Limpiar tabla antes de llenarla

    Object.values(asteroides).forEach(dia => {
        dia.forEach(asteroide => {
            const nombre = asteroide.name;
            const tamano = asteroide.estimated_diameter.meters.estimated_diameter_max;
            const velocidad = asteroide.close_approach_data[0].relative_velocity.kilometers_per_hour;
            const fecha = asteroide.close_approach_data[0].close_approach_date;
            const distancia = asteroide.close_approach_data[0].miss_distance.kilometers;

            const row = tbody.insertRow();
            row.insertCell(0).textContent = nombre;
            row.insertCell(1).textContent = tamano;
            row.insertCell(2).textContent = velocidad;
            row.insertCell(3).textContent = fecha;
            row.insertCell(4).textContent = `${distancia} km`;
        });
    });
}

// Función de búsqueda por nombre
function buscarPorNombre() {
    const searchTerm = document.getElementById("search-name").value.toLowerCase();
    const rows = document.querySelectorAll("#tabla-asteroides tbody tr");

    // Filtrar filas de la tabla
    rows.forEach(row => {
        const nombre = row.cells[0].textContent.toLowerCase();
        if (nombre.includes(searchTerm)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });

    // Filtrar marcadores en el mapa
    marcadores.forEach(({ marker, nombre }) => {
        if (nombre.toLowerCase().includes(searchTerm)) {
            marker.addTo(map);  // Añadir el marcador si coincide
        } else {
            map.removeLayer(marker);  // Eliminar el marcador si no coincide
        }
    });
}

// Asociamos el evento de búsqueda al input
document.getElementById("search-name").addEventListener("input", buscarPorNombre);
