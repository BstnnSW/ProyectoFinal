# ProyectoFinal

https://www.kaggle.com/datasets/nyagami/ea-sports-fc-25-database-ratings-and-stats


# Dataset
- - El dataset proporciona información completa sobre los jugadores del EA Sports FC 25, centrándose en sus calificaciones, atributos y estadísticas adicionales en el juego.
- - EL objetivo es explorar y analizar estadísticas de jugadores de EA FC 2025. visualizando datos clave mediante gráficos dinámicos e integrando funciones de análisis avanzados, como regresión lineal. Facilita la toma de decisiones y comparaciones entre jugadores, ligas y países.

- - El proyecto utiliza las siguientes rutas API:

# Endpoint	                               
- - /api/mejores_ligas: Devuelve las mejores ligas basadas en OVR.
- - /api/mejores_paises: Devuelve los mejores países por OVR.
- - /api/mejores_jugadores: Devuelve los jugadores con mayores estadísticas globales.
- - /api/jugadores_por_liga: Devuelve el número de jugadores por liga.
- - /api/jugadores_por_posicion: Filtra jugadores por posición.
- - /api/regresion_ovr_phy: Datos para el gráfico de regresión lineal.

# Gráficos y características:

- - Mejores ligas en función del rendimiento promedio.
- - Países destacados por el promedio de rendimiento de sus jugadores.
- - Jugadores con las mejores estadísticas globales.
- - Número de jugadores por liga.
- - Gráfico de regresión lineal entre atributos como OVR y PHY.
- - Endpoints para obtener datos estadísticos y filtrados directamente desde un archivo JSON.
- - Los gráficos se generan dinámicamente con Chart.js y Plotly, basados en datos proporcionados por el backend.

# Librería de Python
- - pip install Flask
- - pip install flask-cors
- - pip install plotly
- - pip install scikit-learn

# Ejecución
- - python app.py
