import asyncio
import time
import os
import schedule
from operation import update_tenders, insert_new_tenders

MP_TOKEN = os.environ.get("MP_TOKEN")
MONGO_URI = os.environ.get("TENDER_MONGODB_URI")
NATS_URI = os.environ.get("NATS_URI")

if __name__ == "__main__":
    print("[info]: Populator service connected")

    asyncio.run(insert_new_tenders())
    asyncio.run(update_tenders())

    insert_value = 1
    update_value = 5
    schedule.every(insert_value).hours.do(lambda: asyncio.run(insert_new_tenders()))
    schedule.every(update_value).minutes.do(lambda: asyncio.run(update_tenders()))
    print("[info]: Scheduled opertations:")

    print(f" insert new tenders each {insert_value} hours")
    print(f" update tenders each {update_value} minutes")

    while True:
        schedule.run_pending()
