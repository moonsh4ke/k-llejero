from collections import namedtuple
from io import StringIO
from beanie import Document, Indexed, init_beanie
from pydantic import BaseModel
from typing import List, Optional, Dict
from datetime import datetime


class FilterModel(BaseModel):
    date: datetime
    matchs: List

class ItemModel(BaseModel):
    serviceDescription: Optional[str] = None
    onuCode: Optional[int] = None
    measureUnit: Optional[str] = None
    quantity: Optional[float] = None
    generic: Optional[str] = None
    level1: Optional[str] = None
    level2: Optional[str] = None
    level3: Optional[str] = None

class TenderDoc(Document):
    code: Indexed(str, unique=True)
    type: Optional[str] = None
    name: str
    stateCode: int
    categories: Optional[List[str]]
    filter: FilterModel
    endDate: Optional[datetime] = None
    description: Optional[str] = None
    organism: Optional[str] = None
    purchasingRegion: Optional[str] = None
    publicationDate: Optional[str] = None
    items: Optional[List[ItemModel]] = None

    class Settings:
        name = "tenders"

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


class Item:
    def __init__(
        self,
        serviceDescription,
        onuCode,
        measureUnit,
        quantity,
        generic,
    ):
        self.serviceDescription = serviceDescription
        self.onuCode = onuCode
        self.measureUnit = measureUnit
        self.quantity = quantity
        self.generic = generic


class Tender:
    def __init__(

        self,
        code=None,
        type=None,
        name=None,
        description=None,
        organism=None,
        purchasingRegion=None,
        publicationDate=None,
        endDate=None,
        stateCode=None,
    ):
        self.code = code
        self.type = type
        self.name = name
        self.description = description
        self.organism = organism
        self.purchasingRegion = purchasingRegion
        self.publicationDate = publicationDate
        self.endDate = endDate
        self.stateCode = stateCode

        self.items = []
        self.categories = []

    def addItem(self, Item):
        self.items.append(Item)

    def addCategory(self, category):
        if category not in self.categories:
            self.categories.append(category)

    def asDict(self):
        tenderDict = self.__dict__.copy()
        tenderDict["items"] = [item.__dict__.copy() for item in self.items]
        return tenderDict


RawItemTender = namedtuple(
    "RawItemTender",
    [
        "code",
        "type",
        "name",
        "description",
        "organism",
        "purchasingRegion",
        "publicationDate",
        "endDate",
        "serviceDescription",
        "onuCode",
        "measureUnit",
        "quantity",
        "generic",
        "level1",
        "level2",
        "level3",
    ]
)
