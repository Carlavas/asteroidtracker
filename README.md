Descripción del Proyecto
Este proyecto tiene como objetivo visualizar en un mapa interactivo los asteroides cercanos a la Tierra utilizando la API de Near Earth Objects (NEO) proporcionada por la NASA. El proyecto muestra los asteroides en un mapa utilizando la biblioteca Leaflet, y proporciona información detallada sobre cada asteroide, como el tamaño, la velocidad, la distancia y la fecha de su acercamiento a la Tierra. Además, se permite al usuario filtrar los asteroides por fechas y visualizar el tamaño de los asteroides a través de un gráfico.

Características principales:
Mapa interactivo: Los asteroides cercanos a la Tierra se representan en el mapa con marcadores que incluyen información detallada en un popup.
Lista de asteroides: Se muestra una lista con información de cada asteroide, incluyendo su nombre, tamaño, velocidad, fecha de acercamiento y distancia, se puede filtrar por nombre por si quieres saber mas acerca de un asteroide, siendo asi mas práctico, añadiendo el details.html, no me mostraba la informacon de los asteroides
Filtrado por fecha: El usuario puede seleccionar un rango de fechas para obtener asteroides que se aproximan durante ese periodo.
Gráfico de tamaños: Se genera un gráfico de barras que muestra el tamaño máximo de los asteroides cercanos a la Tierra.
Cómo usar la página web
1. Acceso al mapa interactivo:
Cuando ingreses a la página web, verás un mapa global interactivo.
Este mapa muestra la ubicación de varios asteroides cercanos a la Tierra, representados por marcadores.
2. Interactuar con el mapa:
Puedes hacer zoom usando la rueda del ratón o los controles en la esquina inferior derecha del mapa.
Arrastra el mapa para moverlo y explorar otras áreas.
Haz clic en un marcador para ver más detalles sobre ese asteroide, como su nombre, tamaño, velocidad y distancia de la Tierra. Se abrirá un pequeño cuadro de información (popup).
3. Filtros de búsqueda:
Usa el panel de filtros en la página para refinar los asteroides que quieres explorar:
Fecha de inicio y fin: Puedes elegir un rango de fechas para ver asteroides en ese período.
Tamaño mínimo: Ajusta un tamaño mínimo para los asteroides que quieres ver.
Haz clic en "Aplicar filtros" para actualizar el mapa y la lista con los resultados filtrados.
4. Ver la lista de asteroides:
En la sección de lista de asteroides, verás una lista de los asteroides que están cerca de la Tierra en el rango de fechas que has seleccionado.
Haz clic en un nombre de asteroide para ver más detalles sobre él y acceder a su información completa.
5. Gráfico de tamaños:
En la parte de abajo de la página, encontrarás un gráfico de barras que muestra el tamaño máximo de los asteroides.
Este gráfico se actualiza según los filtros que selecciones, permitiéndote ver rápidamente cómo varían los tamaños de los asteroides en el rango de fechas elegido.
6. Búsqueda por nombre:
Si quieres buscar un asteroide por su nombre, puedes usar la barra de búsqueda ubicada en la parte superior de la página.
A medida que escribes, los resultados se irán filtrando en la tabla y los marcadores del mapa.
Detalles importantes
API de la NASA: Este proyecto utiliza la API pública de Near Earth Objects (NEO) de la NASA, la cual proporciona datos sobre asteroides cercanos a la Tierra. La API tiene una cuota diaria de solicitudes, por lo que es posible que, en algunos momentos, la cantidad de datos disponibles esté limitada.

Visualización de asteroides: Los asteroides están representados en el mapa mediante iconos personalizados. Al hacer clic en un marcador, se muestra un popup con la información del asteroide, como el nombre, tamaño, velocidad y distancia de la Tierra.

Rango de fechas: El sistema permite filtrar asteroides por un rango de fechas. Este rango se divide en bloques de 7 días, lo que puede resultar en múltiples solicitudes a la API si el rango seleccionado es muy largo.
Reflexión:
¿Por qué elegí esta API?
Elegí la API de Near Earth Objects de la NASA porque ofrece acceso a datos detallados sobre asteroides cercanos a la Tierra, lo que es relevante y emocionante desde un punto de vista educativo y científico. Además, la API es fácil de usar, bien documentada y gratuita, lo que hace que sea una excelente opción para proyectos como este.

¿Qué problemas tuviste y cómo los solucionaste?
Uno de los problemas más comunes fue el manejo de los datos de la API. Los datos de los asteroides vienen en un formato bastante complejo, por lo que tuve que iterar sobre varias fechas y organizar la información para que fuera más accesible. También tuve que lidiar con la limitación en la cantidad de datos devueltos por la API para un rango de fechas largo, lo que me llevó a implementar una solución de paginación con fechas divididas en rangos de 7 días.

Además, al trabajar con Leaflet y mapas, me encontré con algunos problemas de visualización cuando los asteroides estaban demasiado dispersos. Finalmente, ajusté el zoom y las coordenadas del mapa para una mejor experiencia de usuario.

Nota sobre el proyecto: 7,5/10
Le doy un 7,5 porque el proyecto cumple con las funcionalidades que me propuse, pero siempre hay margen de mejora. La implementación de la página de detalles del asteroide y la optimización de la interfaz de usuario podrían llevar el proyecto al siguiente nivel. 

Creo que el proyecto está bastante completo,aunque falta la parte de los details y la lista la he hecho en forma de tabla para que estuviese todo mas claro pero siempre se puede mejorar la experiencia visual y la interacción del usuario.
