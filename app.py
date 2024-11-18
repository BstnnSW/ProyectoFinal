from flask import Flask, jsonify, render_template, request
import json
from sklearn.linear_model import LinearRegression
import numpy as np

app = Flask(__name__)

@app.route('/api/regresion_ovr_phy', methods=['GET'])
def regresion_ovr_phy():
    with open('data/datos.json', encoding='utf-8') as file:
        data = json.load(file)

    # Extraer OVR y PHY
    ovr = []
    phy = []
    for jugador in data:
        try:
            ovr.append(float(jugador["OVR"]))
            phy.append(float(jugador["PHY"]))
        except ValueError:
            continue  # Ignorar valores no numéricos

    # Convertir a arreglos numpy
    X = np.array(ovr).reshape(-1, 1)  # OVR como matriz
    y = np.array(phy)  # PHY como vector

    # Crear modelo de regresión lineal
    modelo = LinearRegression()
    modelo.fit(X, y)

    # Generar predicciones (línea de regresión)
    y_pred = modelo.predict(X)

    # Preparar datos para graficar
    regresion_datos = {
        "ovr": ovr,
        "phy": phy,
        "linea_x": ovr,
        "linea_y": y_pred.tolist(),
        "coeficiente": modelo.coef_[0],
        "intercepto": modelo.intercept_
    }
    return jsonify(regresion_datos)


@app.route('/api/mejores_ligas')
def api_mejores_ligas():
    with open('data/datos.json', encoding='utf-8') as file:
        data = json.load(file)
    estadisticas = calcular_estadisticas(data)
    return jsonify({"top_ligas": estadisticas["top_ligas"]})

@app.route('/api/mejores_paises')
def api_mejores_paises():
    with open('data/datos.json', encoding='utf-8') as file:
        data = json.load(file)
    estadisticas = calcular_estadisticas(data)
    return jsonify({"top_paises": estadisticas["top_paises"]})

@app.route('/api/mejores_jugadores')
def api_mejores_jugadores():
    with open('data/datos.json', encoding='utf-8') as file:
        data = json.load(file)
    estadisticas = calcular_estadisticas(data)
    return jsonify({"top_jugadores": estadisticas["top_jugadores"]})

@app.route('/api/jugadores_por_liga')
def api_jugadores_por_liga():
    with open('data/datos.json', encoding='utf-8') as file:
        data = json.load(file)
    estadisticas = calcular_estadisticas(data)
    return jsonify({"jugadores_por_liga": estadisticas["jugadores_por_liga"]})

@app.route('/')
def index():
    return render_template('index.html')

def calcular_estadisticas(data):
    ligas = {}
    paises = {}
    jugadores_por_liga = {}

    for jugador in data:
        liga = jugador.get("League", "Desconocida")
        ovr = float(jugador.get("OVR", 0))
        if liga in ligas:
            ligas[liga].append(ovr)
        else:
            ligas[liga] = [ovr]

        if liga in jugadores_por_liga:
            jugadores_por_liga[liga] += 1
        else:
            jugadores_por_liga[liga] = 1

        pais = jugador.get("Nation", "Desconocido")
        if pais in paises:
            paises[pais].append(ovr)
        else:
            paises[pais] = [ovr]

    ligas_avg = [(liga, sum(ovrs) / len(ovrs)) for liga, ovrs in ligas.items()]
    top_ligas = sorted(ligas_avg, key=lambda x: x[1], reverse=True)[:5]

    paises_avg = [(pais, sum(ovrs) / len(ovrs)) for pais, ovrs in paises.items()]
    top_paises = sorted(paises_avg, key=lambda x: x[1], reverse=True)[:5]

    jugadores_totales = [
        (jugador.get("Name", "Desconocido"), sum(float(jugador.get(stat, 0)) for stat in ["PAC", "SHO", "PAS", "DRI", "DEF", "PHY"]))
        for jugador in data
    ]
    top_jugadores = sorted(jugadores_totales, key=lambda x: x[1], reverse=True)[:5]

    jugadores_por_liga_ordenados = sorted(jugadores_por_liga.items(), key=lambda x: x[1], reverse=True)

    return {
        "top_ligas": top_ligas,
        "top_paises": top_paises,
        "top_jugadores": top_jugadores,
        "jugadores_por_liga": jugadores_por_liga_ordenados[:15]
    }


if __name__ == '__main__':
    app.run(debug=True)
