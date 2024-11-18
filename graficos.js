class Graficos {
    constructor(data, etiqueta) {
        this.data = data;
        this.etiqueta = etiqueta;
    }

    // Gráfico 1: Mejores Ligas
    MejoresLigas() {
        if (this.data.top_ligas && this.data.top_ligas.length > 0) {
            const trace = {
                x: this.data.top_ligas.map(item => item[0]),
                y: this.data.top_ligas.map(item => item[1]),
                type: 'bar',
                marker: {
                    color: 'blue'
                }
            };
            const layout = {
                title: 'Top 5 Ligas por Promedio de OVR',
                xaxis: { title: 'Liga' },
                yaxis: { title: 'Promedio OVR' }
            };
            Plotly.newPlot(this.etiqueta, [trace], layout);
        } else {
            console.error("No hay datos para Mejores Ligas");
        }
    }

    // Gráfico 2: Mejores Países
    MejoresPaises() {
        if (this.data.top_paises && this.data.top_paises.length > 0) {
            const trace = {
                x: this.data.top_paises.map(item => item[0]),
                y: this.data.top_paises.map(item => item[1]),
                type: 'bar',
                marker: {
                    color: 'green'
                }
            };
            const layout = {
                title: 'Top 5 Países por Promedio de OVR',
                xaxis: { title: 'País' },
                yaxis: { title: 'Promedio OVR' }
            };
            Plotly.newPlot(this.etiqueta, [trace], layout);
        } else {
            console.error("No hay datos para Mejores Países");
        }
    }

    // Gráfico 3: Mejores Jugadores por Total de Estadísticas
    MejoresJugadores() {
        if (this.data.top_jugadores && this.data.top_jugadores.length > 0) {
            const trace = {
                x: this.data.top_jugadores.map(item => item[0]),
                y: this.data.top_jugadores.map(item => item[1]),
                type: 'bar',
                marker: {
                    color: 'orange'
                }
            };
            const layout = {
                title: 'Top Jugadores por Estadísticas Totales',
                xaxis: { title: 'Jugador' },
                yaxis: { title: 'Total de Estadísticas' }
            };
            Plotly.newPlot(this.etiqueta, [trace], layout);
        } else {
            console.error("No hay datos para Mejores Jugadores");
        }
    }

    // Gráfico 4: Número de jugadores por liga
    JugadoresPorLiga() {
        if (this.data.jugadores_por_liga && this.data.jugadores_por_liga.length > 0) {
            const trace = {
                x: this.data.jugadores_por_liga.map(item => item[1]),
                y: this.data.jugadores_por_liga.map(item => item[0]),
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
            Plotly.newPlot(this.etiqueta, [trace], layout);
        } else {
            console.error("No hay datos para Jugadores por Liga");
        }
    }
}

