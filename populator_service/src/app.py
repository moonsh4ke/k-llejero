import asyncio
import sys
import requests
import time
import os
import schedule

from typing import Optional, Dict
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel

from beanie import Document, Indexed, init_beanie
from datetime import datetime
from typing import Optional

load_dotenv()
MP_TOKEN = os.environ.get("MP_TOKEN")
MONGO_URI = os.environ.get("MONGO_URI")


class Tender(Document):
    code: Indexed(str, unique=True)
    name: str
    state_code: int
    end_date: Optional[datetime] = None

    class Settings:
        name = "tender"


def do_request(url) -> Dict:
    base_url = "https://api.mercadopublico.cl/servicios/v1/"

    res = requests.get(f"{base_url}/{url}")

    if res.status_code == 200:
        data = res.json()
        return data

    print(res)
    print("warning: response got non 200 status code")
    return {}


def get_tender_list(url) -> list:
    try:
        data = do_request(url)
        if data == {}:
            return []
        return data["Listado"]
    except Exception as e:
        print(e, file=sys.stderr)
        print("error: request went wrong", file=sys.stderr)
        raise Exception


async def update_tenders():
    client = AsyncIOMotorClient()

    await init_beanie(database=client.populator_db, document_models=[Tender])

    try:
        awarded_tenders = get_tender_list(
            f"publico/licitaciones.json?ticket={MP_TOKEN}"
        )
    except Exception:
        raise Exception

    updates = 0
    inserts = 0
    start_time = time.time()

    for tender in awarded_tenders:
        code, name, state_code, end_date = (
            tender["CodigoExterno"],
            tender["Nombre"],
            tender["CodigoEstado"],
            tender["FechaCierre"],
        )
        db_tender = await Tender.find_one(Tender.code == code)

        if db_tender:
            if db_tender.state_code != state_code:
                db_tender.state_code = state_code
                await db_tender.save()

        # this should be deleted in production, because tenders service should have all historic data so no need for inserts only updates
        else:
            new_tender = Tender(
                code=code, name=name, state_code=state_code, end_date=end_date
            )
            await new_tender.insert()
            inserts += 1

    end_time = time.time()
    elapsed_time = int(end_time - start_time)

    print(
        f"overview: {updates} records where updated, {inserts} records where inserted, operation took {elapsed_time}s."
    )


async def insert_new_tenders():
    tenders = get_tender_list(
        f"publico/licitaciones.json?estado=activas&ticket={MP_TOKEN}"
    )

    client = AsyncIOMotorClient(MONGO_URI)

    await init_beanie(database=client.populator_db, document_models=[Tender])

    start_time = time.time()
    inserts = 0

    for tender in tenders:
        code, name, state_code, end_date = (
            tender["CodigoExterno"],
            tender["Nombre"],
            tender["CodigoEstado"],
            tender["FechaCierre"],
        )
        db_tender = await Tender.find_one(Tender.code == code)

        if not db_tender:
            new_tender = Tender(
                code=code, name=name, state_code=state_code, end_date=end_date
            )
            await new_tender.insert()
            inserts += 1

    end_time = time.time()
    elapsed_time = int(end_time - start_time)

    print(
        f"overview: {inserts} records where inserted, operation took {elapsed_time}s."
    )

def cron_job():
    asyncio.run(insert_new_tenders())
    asyncio.run(update_tenders())

if __name__ == "__main__":
    schedule.every(10).minutes.do(cron_job)

    while(True):
        schedule.run_pending()
        time.sleep(1)