# functions to handle tenders "downloaded" from Mercado Publico

import io
from collections import namedtuple
import requests
import zipfile
import csv
from datetime import datetime
import json
import utils.headers

from model import Tender, RawTender, RawItemTender, Item

def get_tenders_zip():
    tenders_file_url = "https://www.mercadopublico.cl/Portal/att.ashx?id=5"
    response = requests.get(tenders_file_url)
    if response.status_code == 200:
        return response.content

def extract_tenders_zip(tenders_zip):
    if tenders_zip:
        with zipfile.ZipFile(io.BytesIO(tenders_zip), "r") as zip_ref:
            zip_ref.extractall("../tenders_extracted");

def get_tenders_from_csv():
    with open("../tenders_extracted/Licitacion_Publicada.csv", "r", encoding="utf-8") as csv_file:
        csv_reader = csv.reader(csv_file)
        return list(csv_reader)[4:]

def get_raw_tenders(tenders):
    ctenders = []
    for tender in tenders:
        if tender == []:
            continue
        ttender = RawItemTender._make(tender)
        ctenders.append(ttender)
    return ctenders;

def parse_tenders_items(raw_item_tenders):
    dtenders = {}
    for raw_item_tender in raw_item_tenders:
        if raw_item_tender.code not in dtenders:
            tender = Tender(
                code=raw_item_tender.code,
                type=raw_item_tender.type,
                name=raw_item_tender.name,
                description=raw_item_tender.description,
                organism=raw_item_tender.organism,
                purchasingRegion=raw_item_tender.purchasingRegion,
                publicationDate=raw_item_tender.publicationDate,
                endDate=raw_item_tender.endDate,
                stateCode=5
            )

            tender.items.append(Item(
                serviceDescription=raw_item_tender.serviceDescription,
                onuCode=raw_item_tender.onuCode,
                measureUnit=raw_item_tender.measureUnit,
                quantity=raw_item_tender.quantity,
                generic=raw_item_tender.generic
            ))

            tender.addCategory(raw_item_tender.level1)
            tender.addCategory(raw_item_tender.level2)
            tender.addCategory(raw_item_tender.level3)

            dtenders[tender.code] = tender
        else:
            dtenders[raw_item_tender.code].items.append(Item(
                serviceDescription=raw_item_tender.serviceDescription,
                onuCode=raw_item_tender.onuCode,
                measureUnit=raw_item_tender.measureUnit,
                quantity=raw_item_tender.quantity,
                generic=raw_item_tender.generic
            ))

            dtenders[raw_item_tender.code].addCategory(raw_item_tender.level1)
            dtenders[raw_item_tender.code].addCategory(raw_item_tender.level2)
            dtenders[raw_item_tender.code].addCategory(raw_item_tender.level3)

    tenders = [ tender for tender in dtenders.values() ]
    tenders = parse_tenders_dates(tenders)
    return tenders

def parse_tenders_dates(tenders):
    pd_tenders = []
    for tender in tenders:
        date = None if tender.endDate == "" else datetime.strptime(tender.endDate, "%d/%m/%Y %H:%M:%S").isoformat()
        tender.endDate = date
        pd_tenders.append(tender)
    return pd_tenders

def tenders_asdict(tenders):
    ttenders = []
    for tender in tenders:
        ttenders.append(tender.asDict())
    return ttenders

def tenders_to_JSON(tenders):
    return json.dumps(tenders_asdict(tenders), indent=2)


def get_raw_csv_rows(state):

    i = 1
    raw_rows = []

    while True:

        payload=f'''{{
           "textoBusqueda":"",
           "idEstado":"{state}",
           "codigoRegion":"-1",
           "idTipoLicitacion":"-1",
           "fechaInicio":"{datetime.utcnow().strftime('%Y-%m-%d')}T04:00:00.000Z",
           "fechaFin":"{datetime.utcnow().strftime('%Y-%m-%d')}T04:00:00.000Z",
           "registrosPorPagina":"2000",
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
           "pagina":{i}
        }}
        '''

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
        csv_data = res._content.decode("utf-8")
        csv_reader = csv.reader(io.StringIO(csv_data), delimiter=";")
        csv_reader_list = list(csv_reader)[1:]

        if csv_reader_list == []:
            break

        raw_rows += csv_reader_list

        i+=1

    return raw_rows


def get_tenders_by_state(state):
    print("  getting csv data by state from mercadopublico...")
    raw_rows = get_raw_csv_rows(state)
    print("  parsing csv data to tenders...")
    raw_tenders = []
    for awarded_csv in raw_rows:
        awardedRawTender = RawTender._make(awarded_csv)
        raw_tenders.append(awardedRawTender)
    tenders = []
    for raw_tender in raw_tenders:
        tenders.append(Tender(
            code=raw_tender.code,
            type=raw_tender.type,
            name=raw_tender.name,
            description=raw_tender.description,
            organism=raw_tender.organism,
            publicationDate=raw_tender.publicationDate,
            stateCode=state,
        ))

    return tenders


def get_tenders():
    print("  downloading tender zip file...")
    tenders_zip = get_tenders_zip()
    # this extracts the files (csv and xlsx files) into "../tenders_extracted/"
    print("  extracting zip file...")
    extract_tenders_zip(tenders_zip)
    print("  parsing tender csv file...")
    tenders_csv = get_tenders_from_csv()
    raw_tenders = get_raw_tenders(tenders_csv)
    parsed_tenders = parse_tenders_items(raw_tenders)
    return parsed_tenders
