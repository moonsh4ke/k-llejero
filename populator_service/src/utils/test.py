import csv
from io import StringIO
import json
import requests
from collections import namedtuple
import utils.headers

RawTender = namedtuple(
    "RawTender",
    [
        "code",
        "name",
        "type",
        "state",
        "publicationDate",
        "description",
        "currency",
        "budgetType",
        "amountType",
        "amount",
        "organism",
    ]
)

def get_csv_by_state():
    payload="""{
       "textoBusqueda":"",
       "idEstado":"6",
       "codigoRegion":"-1",
       "idTipoLicitacion":"-1",
       "fechaInicio":"2024-04-15T04:00:00.000Z",
       "fechaFin":"2024-04-15T04:00:00.000Z",
       "registrosPorPagina":"10",
       "idTipoFecha":[],
       "idOrden":"1",
       "compradores":[],
       "garantias":null,
       "rubros":[],
       "proveedores":[],
       "montoEstimadoTipo":[
          0
       ],
       "esPublicoMontoEstimado":null,
       "pagina":1
    }
    """

    res = requests.post(
        "https://www.mercadopublico.cl/BuscarLicitacion/Home/GenerarArchivo",
        data=payload,
        headers=utils.headers.gen_file_id
    )
    data = res.json()
    fileGuid = data["FileGuid"]

    res = requests.get(
        f"https://www.mercadopublico.cl/BuscarLicitacion//Home/Descargar?fileGuid={fileGuid}&nombreArchivo=ListaLicitaciones.csv",
        headers=utils.headers.download_tenders_file
    )
    data = res._content.decode("utf-8")

    return data

csv_data = get_csv_by_state()
csv_reader = csv.reader(StringIO(csv_data), delimiter=";")
awarded_csv_list = list(csv_reader)

print(json.dumps(awarded_csv_list[0:8], indent=2))

awarded_tenders = []
for awarded_csv in awarded_csv_list[1:]:
    awardedRawTender = RawTender._make(awarded_csv)
    awarded_tenders.append(awardedRawTender)
