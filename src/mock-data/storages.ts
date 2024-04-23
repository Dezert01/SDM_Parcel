import { CStorage } from "../classes/storage";
import { StorageType } from "../enums/StorageType";

export const mockStorages: CStorage[] = [
  new CStorage(1, "Address 1", [], StorageType.INTERMEDIATE_STORAGE),
  new CStorage(2, "Address 2", [], StorageType.EXTERNAL_STORAGE),
];
