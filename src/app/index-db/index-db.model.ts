export namespace IndexedDb {
  export type UpgradeCallback = (db: IDBDatabase) => void;
  export interface DBSchema {
    name: string;
    keypath: string;
    options: IDBIndexParameters;
  }
  export interface DBStore {
    name: string;
    primaryKey: string;
    options: IDBObjectStoreParameters;
    storeSchema: Array<DBSchema>;
    migrations: Array<UpgradeCallback>;
  }
  export interface DBConfig {
    name: string;
    version: number;
    stores: Array<DBStore>;
  }
}