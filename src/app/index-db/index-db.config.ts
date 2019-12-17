import { IndexedDb } from './index-db.model';

export const getDbConfig: () => IndexedDb.DBConfig = () => {
  return {
    name: 'dna-indexed-db',
    version: 1,
    stores: [
      {
        name: 'dna-dimensions-page-state',
        primaryKey: 'id',
        options: { autoIncrement: false },
        storeSchema: [
          {
            name: 'id',
            keypath: 'id',
            options: { unique: true }
          },
          {
            name: 'drilldown',
            keypath: 'drilldown',
            options: { unique: false }
          },
          {
            name: 'charts',
            keypath: 'charts',
            options: { unique: false }
          },
          {
            name: 'error',
            keypath: 'error',
            options: { unique: false }
          },
          {
            name: 'loading',
            keypath: 'loading',
            options: { unique: false }
          },
        ],
        migrations: []
      }
    ]
  };
};