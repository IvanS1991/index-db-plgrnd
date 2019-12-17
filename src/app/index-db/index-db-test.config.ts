import { IndexedDb } from './index-db.model';

export const getDbConfig: () => IndexedDb.DBConfig  = () => {
  return {
    name: 'dna-indexed-db',
    version: 1,
    stores: [
      {
        name: 'users',
        primaryKey: 'id',
        options: { autoIncrement: true },
        storeSchema: [
          {
            name: 'id',
            keypath: 'id',
            options: { unique: false }
          },
          {
            name: 'name',
            keypath: 'name',
            options: { unique: false }
          },
          {
            name: 'age',
            keypath: 'age',
            options: { unique: false }
          },
          {
            name: 'country',
            keypath: 'country',
            options: { unique: false }
          }
        ],
        migrations: []
      }
    ]
  };
};