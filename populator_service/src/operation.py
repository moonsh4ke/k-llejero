import os
from nats.aio.client import Client as NATS
from motor.motor_asyncio import AsyncIOMotorClient
import utils.tender as tender_utils
import time
from model import TenderDoc
from beanie import init_beanie
import json
import gzip
import requests

NATS_URI = os.environ.get("NATS_URI")
MONGO_URI = os.environ.get("TENDER_MONGODB_URI")


async def update_tenders():
    print("[info]: Triggered update tenders operation")

    nc = NATS()
    await nc.connect(
        servers=[str(NATS_URI)],
    )
    client = AsyncIOMotorClient(MONGO_URI)

    # client = AsyncIOMotorClient("mongodb://localhost:27017")

    await init_beanie(database=client.tender, document_models=[TenderDoc])

    print(" getting tenders by closed state...")
    closed_tenders = tender_utils.get_tenders_by_state(6)
    print(" getting tenders by awarded state...")
    awarded_tenders = tender_utils.get_tenders_by_state(8)

    tenders = closed_tenders + awarded_tenders

    updates = 0
    tenders_updated = []
    start_time = time.time()

    untracked = []

    print(" updating tenders from tender database...")

    for tender in tenders:
        db_tender = await TenderDoc.find_one(TenderDoc.code == tender.code)

        if db_tender:
            if db_tender.stateCode != tender.stateCode:
                db_tender.stateCode = tender.stateCode
                await db_tender.save()
                updates += 1
                tenders_updated.append(
                    {"code": tender.code, "updatedState": tender.stateCode}
                )
        else:
            untracked.append(tender)

    end_time = time.time()
    elapsed_time = int(end_time - start_time)

    print("[info]: Update tenders operation completed succesfully")
    print(
        f"[info]: Overview, {updates} records were updated, operation update tenders took {elapsed_time}s."
    )

    await nc.publish("tender:update", json.dumps(tenders_updated).encode("utf-8"))
    await nc.flush()

    if updates > 0:
        print(
            f"[info]: Event based on topic tender:update was sent to nats message broker"
        )

    await insert_new_tenders(untracked)


async def insert_new_tenders(tenders=None):
    print("[info]: Triggered insert new tenders operation")

    if not tenders:
        print(" getting tenders from mercadopublico...")
        tenders = tender_utils.get_tenders()

    # client = AsyncIOMotorClient("mongodb://localhost:27017")
    client = AsyncIOMotorClient(MONGO_URI)

    await init_beanie(database=client.tender, document_models=[TenderDoc])

    start_time = time.time()
    inserts = 0

    payload = tender_utils.tenders_to_JSON(tenders)
    payload = payload.encode("utf-8")
    payload = gzip.compress(payload)

    print(" requesting filtered tenders to filter service...")

    filter_response = requests.get(
        "http://filter-srv:3000/filter_tenders",
        data=payload,
        headers={
            "Content-Type": "application/octec-stream",
            "Content-Encoding": "gzip",
        },
    )

    filtered_tenders = filter_response.json()

    print(" inserting untracked filtered tenders to tender database...")
    for tender_dict in filtered_tenders:
        db_tender = await TenderDoc.find_one(TenderDoc.code == tender_dict["code"])

        if not db_tender:
            new_tender = TenderDoc(**tender_dict)
            # new_tender = TenderDoc.model_validate(tender)
            await new_tender.insert()
            inserts += 1

    end_time = time.time()
    elapsed_time = int(end_time - start_time)

    print("[info]: Insert new tenders operation completed succesfully")
    print(
        f"[info]: Overview, {inserts} records were inserted, operation insert new tenders took {elapsed_time}s."
    )
