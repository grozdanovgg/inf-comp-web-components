const ShipFaction = {
  1: "USF",
  2: "ATROX",
};

const ShipGenerationAbbreviated = {
  0: "UNKNOWN",
  1: "CG",
  2: "PL",
};

const ShipClassAbbreviated = {
  0: "ERR",
  1: "TT",
  2: "CN",
  3: "CR",
  4: "DD",
  5: "MM",
};


const ShipTypeAbbreviated = {
  0x00: "ERR",
  0x01: "VRS",
  0x03: "CNN",
  0x04: "CRR",
  0x09: "HMR",
  0x0a: "GRD",
  0x0b: "BLL",
  0x0c: "LCR",
  0x0d: "HYD",
  0x0e: "NVY",
  0x0f: "WHR",
  0x10: "CLV",
  0x11: "BST",
  0x12: "DVS",
  0x13: "PRS",
};

interface RefStringsModal {
  [key: string]: any
}

interface BytesModal {
  [key: string]: number[]
}

export const bytes: BytesModal = {
  faction: [0, 2],
  generation: [4, 6],
  class: [6, 8],
  type: [8, 10],
  mark: [10, 14],
  instance: [14, 22],
};

export const refStrings: RefStringsModal = {
  faction: ShipFaction,
  generation: ShipGenerationAbbreviated,
  type: ShipTypeAbbreviated,
  class: ShipClassAbbreviated,
};
