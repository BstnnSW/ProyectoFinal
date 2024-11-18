document.addEventListener("DOMContentLoaded", function () {
    // Función para limpiar el contenedor del gráfico
    function limpiarContenedor(id) {
        const contenedor = document.getElementById(id);
        if (contenedor) {
            contenedor.innerHTML = ""; // Limpia el contenedor
        } else {
            console.error(`Contenedor con id '${id}' no encontrado.`);
        }
    }

    // Botón 1: Mejores Ligas
    const boton1 = document.getElementById("grafico1");
    if (boton1) {
        boton1.addEventListener("click", function () {
            fetch('http://127.0.0.1:5000/api/mejores_ligas')
                .then(response => response.json())
                .then(data => {
                    limpiarContenedor("grafico");
                    const grafico = new Graficos(data, "grafico");
                    grafico.MejoresLigas();
                })
                .catch(error => console.error("Error cargando Mejores Ligas:", error));
        });
    } else {
        console.error("Botón 'grafico1' no encontrado.");
    }

    // Botón 2: Mejores Países
    const boton2 = document.getElementById("grafico2");
    if (boton2) {
        boton2.addEventListener("click", function () {
            fetch('http://127.0.0.1:5000/api/mejores_paises')
                .then(response => response.json())
                .then(data => {
                    limpiarContenedor("grafico");
                    const grafico = new Graficos(data, "grafico");
                    grafico.MejoresPaises();
                })
                .catch(error => console.error("Error cargando Mejores Países:", error));
        });
    } else {
        console.error("Botón 'grafico2' no encontrado.");
    }

    // Botón 3: Mejores Jugadores
    const boton3 = document.getElementById("grafico3");
    if (boton3) {
        boton3.addEventListener("click", function () {
            fetch('http://127.0.0.1:5000/api/mejores_jugadores')
                .then(response => response.json())
                .then(data => {
                    limpiarContenedor("grafico");
                    const grafico = new Graficos(data, "grafico");
                    grafico.MejoresJugadores();
                })
                .catch(error => console.error("Error cargando Mejores Jugadores:", error));
        });
    } else {
        console.error("Botón 'grafico3' no encontrado.");
    }

    // Botón 4: Jugadores por Liga
    const boton4 = document.getElementById("grafico4");
    if (boton4) {
        boton4.addEventListener("click", function () {
            fetch('http://127.0.0.1:5000/api/jugadores_por_liga')
                .then(response => response.json())
                .then(data => {
                    limpiarContenedor("grafico");
                    const trace = {
                        x: data.jugadores_por_liga.map(item => item[1]),
                        y: data.jugadores_por_liga.map(item => item[0]),
                        type: 'bar',
                        orientation: 'h',
                        marker: {
                            color: 'purple'
                        }
                    };
                    const layout = {
                        title: 'Número de Jugadores por Liga',
                        xaxis: { title: 'Número de Jugadores' },
                        yaxis: { title: 'Liga', autorange: 'reversed' }
                    };
                    Plotly.newPlot("grafico", [trace], layout);
                })
                .catch(error => console.error("Error cargando Jugadores por Liga:", error));
        });
    } else {
        console.error("Botón 'grafico4' no encontrado.");
    }

    // Botón 5: Regresión OVR vs PHY
    const boton5 = document.getElementById("grafico5");
    if (boton5) {
        boton5.addEventListener("click", function () {
            fetch('http://127.0.0.1:5000/api/regresion_ovr_phy')
                .then(response => response.json())
                .then(data => {
                    limpiarContenedor("grafico");

                    // Datos de dispersión
                    const scatterTrace = {
                        x: data.ovr,
                        y: data.phy,
                        mode: 'markers',
                        type: 'scatter',
                        name: 'Datos',
                        marker: { color: 'blue' }
                    };

                    // Línea de regresión
                    const lineTrace = {
                        x: data.linea_x,
                        y: data.linea_y,
                        mode: 'lines',
                        name: `Regresión (y = ${data.coeficiente.toFixed(2)}x + ${data.intercepto.toFixed(2)})`,
                        line: { color: 'red' }
                    };

                    // Configuración del gráfico
                    const layout = {
                        title: 'Regresión Lineal: OVR vs PHY',
                        xaxis: { title: 'OVR' },
                        yaxis: { title: 'PHY' },
                        legend: { orientation: 'h' }
                    };

                    // Generar gráfico
                    Plotly.newPlot("grafico", [scatterTrace, lineTrace], layout);
                })
                .catch(error => console.error("Error cargando datos de regresión:", error));
        });
    } else {
        console.error("Botón 'grafico5' no encontrado.");
    }
});

