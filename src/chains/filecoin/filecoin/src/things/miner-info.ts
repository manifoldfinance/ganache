import {
  SerializableObject,
  SerializedObject,
  DeserializedObject,
  Definitions
} from "./serializable-object";
import { RegisteredSealProof } from "../types/registered-seal-proof";

// https://pkg.go.dev/github.com/filecoin-project/lotus@v1.4.0/chain/actors/builtin/miner#MinerInfo

type MinerInfoConfig = {
  properties: {
    owner: {
      type: string;
      serializedType: string;
      serializedName: "Owner";
    };
    worker: {
      type: string;
      serializedType: string;
      serializedName: "Worker";
    };
    newWorker: {
      type: string;
      serializedType: string;
      serializedName: "NewWorker";
    };
    controlAddresses: {
      type: string[];
      serializedType: string[];
      serializedName: "ControlAddresses";
    };
    workerChangeEpoch: {
      type: number;
      serializedType: number;
      serializedName: "WorkerChangeEpoch";
    };
    peerId: {
      type: string;
      serializedType: string;
      serializedName: "PeerId";
    };
    multiaddrs: {
      type: Uint8Array[];
      serializedType: Uint8Array[];
      serializedName: "Multiaddrs";
    };
    sealProofType: {
      type: number;
      serializedType: number;
      serializedName: "SealProofType";
    };
    sectorSize: {
      type: number;
      serializedType: number;
      serializedName: "SectorSize";
    };
    windowPoStPartitionSectors: {
      type: number;
      serializedType: number;
      serializedName: "WindowPoStPartitionSectors";
    };
    consensusFaultElapsed: {
      type: number;
      serializedType: number;
      serializedName: "ConsensusFaultElapsed";
    };
  };
};

type C = MinerInfoConfig;

class MinerInfo extends SerializableObject<C> implements DeserializedObject<C> {
  get config(): Definitions<C> {
    return {
      owner: {
        deserializedName: "owner",
        serializedName: "Owner",
        defaultValue: "t01000"
      },
      worker: {
        deserializedName: "worker",
        serializedName: "Worker",
        defaultValue: "t01000"
      },
      newWorker: {
        deserializedName: "newWorker",
        serializedName: "NewWorker",
        defaultValue: "<empty>" // This is how lotus-devnet responds to StateMinerInfo
      },
      controlAddresses: {
        deserializedName: "controlAddresses",
        serializedName: "ControlAddresses",
        defaultValue: []
      },
      workerChangeEpoch: {
        deserializedName: "workerChangeEpoch",
        serializedName: "WorkerChangeEpoch",
        defaultValue: config => (typeof config !== "undefined" ? config : -1)
      },
      peerId: {
        deserializedName: "peerId",
        serializedName: "PeerId",
        defaultValue: "0" // defaulting this to 0 as we don't have any p2p technology in Ganache
      },
      multiaddrs: {
        deserializedName: "multiaddrs",
        serializedName: "Multiaddrs",
        defaultValue: []
      },
      sealProofType: {
        deserializedName: "sealProofType",
        serializedName: "SealProofType",
        defaultValue: config =>
          typeof config !== "undefined"
            ? config
            : RegisteredSealProof.StackedDrg2KiBV1_1
      },
      sectorSize: {
        deserializedName: "sectorSize",
        serializedName: "SectorSize",
        defaultValue: 2048 // sectors/sector sizes don't really matter in Ganache; defaulting to 2 KiB (lotus-devnet default)
      },
      windowPoStPartitionSectors: {
        deserializedName: "windowPoStPartitionSectors",
        serializedName: "WindowPoStPartitionSectors",
        defaultValue: config => (typeof config !== "undefined" ? config : 0)
      },
      consensusFaultElapsed: {
        deserializedName: "consensusFaultElapsed",
        serializedName: "ConsensusFaultElapsed",
        defaultValue: config => (typeof config !== "undefined" ? config : -1)
      }
    };
  }

  constructor(
    options?: Partial<SerializedObject<C>> | Partial<DeserializedObject<C>>
  ) {
    super();

    this.owner = super.initializeValue(this.config.owner, options);
    this.worker = super.initializeValue(this.config.worker, options);
    this.newWorker = super.initializeValue(this.config.newWorker, options);
    this.controlAddresses = super.initializeValue(
      this.config.controlAddresses,
      options
    );
    this.workerChangeEpoch = super.initializeValue(
      this.config.workerChangeEpoch,
      options
    );
    this.peerId = super.initializeValue(this.config.peerId, options);
    this.multiaddrs = super.initializeValue(this.config.multiaddrs, options);
    this.sealProofType = super.initializeValue(
      this.config.sealProofType,
      options
    );
    this.sectorSize = super.initializeValue(this.config.sectorSize, options);
    this.windowPoStPartitionSectors = super.initializeValue(
      this.config.windowPoStPartitionSectors,
      options
    );
    this.consensusFaultElapsed = super.initializeValue(
      this.config.consensusFaultElapsed,
      options
    );
  }

  /**
   * The owner address corresponds to a Lotus node address provided during the miner initialization.
   */
  owner: string;
  /**
   * The worker address is used to send and pay for day-to-day operations performed by the miner.
   */
  worker: string;
  newWorker: string;
  /**
   * Control addresses are used to submit WindowPoSts proofs to the chain (unused by Ganache).
   */
  controlAddresses: string[];
  /**
   * The epoch time that `worker` becomes `newWorker`. A value of -1 indicates no change.
   */
  workerChangeEpoch: number;
  peerId: string;
  multiaddrs: Uint8Array[];
  sealProofType: number;
  sectorSize: number;
  windowPoStPartitionSectors: number;
  consensusFaultElapsed: number;
}

type SerializedMinerInfo = SerializedObject<C>;

export { MinerInfo, SerializedMinerInfo };