export interface GroupedBin {
  binId: string;
  binName: string;
  binDescription?: string;
  stockData: {
    onHand: number;
    available: number;
    quarantine: number;
    preferredLevel: number;
  };
}

export interface GroupedAisle {
  aisleId: string;
  aisleName: string;
  aisleDescription?: string;
  stockData: {
    onHand: number;
    available: number;
    quarantine: number;
    preferredLevel: number;
  };
  bins: GroupedBin[];
}

export interface GroupedZone {
  zoneId: string;
  zoneName: string;
  zoneDescription?: string;
  stockData: {
    onHand: number;
    available: number;
    quarantine: number;
    preferredLevel: number;
  };
  aisles: GroupedAisle[];
}

export interface GroupedLocation {
  locationId: string;
  locationType: string;
  stockData: {
    onHand: number;
    available: number;
    quarantine: number;
    preferredLevel: number;
    onOrder: number;
  };
  zones: GroupedZone[];
}

export interface Bin {
  binId: string;
  binName: string;
  binDescription?: string;
  onHand: number;
  available: number;
  quarantine: number;
  preferredLevel: number;
}

export interface Aisle {
  aisleId: string;
  aisleName: string;
  aisleDescription?: string;
  onHand: number;
  available: number;
  quarantine: number;
  preferredLevel: number;
  bins: Bin[];
}

export interface Zone {
  zoneId: string;
  zoneName: string;
  zoneDescription?: string;
  onHand: number;
  available: number;
  quarantine: number;
  preferredLevel: number;
  aisles: Aisle[];
}

export interface StockLevel {
  itemId: string;
  locationId: string;
  locationName: string;
  locationType: string;
  onHand: number;
  available: number;
  quarantine: number;
  preferredLevel: number;
  onOrder: number;
  zones: Zone[];
}
