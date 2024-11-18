import csv
import json

# Nombre del archivo CSV que queremos convertir
archivo_csv = 'data/data.csv'

# Nombre del archivo JSON de salida
archivo_json = 'data/datos.json'

# Leer el archivo CSV y almacenarlo como un diccionario
with open(archivo_csv, mode='r', encoding='utf-8') as csv_file:
    # Usamos el método DictReader para leer el CSV como diccionarios
    csv_reader = csv.DictReader(csv_file)
    
    # Convertimos los datos a una lista de diccionarios
    filas = list(csv_reader)

# Escribir los datos en un archivo JSON
with open(archivo_json, mode='w', encoding='utf-8') as json_file:
    # Convertir la lista de diccionarios a formato JSON
    json.dump(filas, json_file, indent=4, ensure_ascii=False)

print(f'Archivo {archivo_json} creado exitosamente.')
