import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { IndexedDb } from './index-db.model';
import { getDbConfig } from './index-db-test.config';

declare const window: Window;

@Injectable({
  providedIn: 'root'
})
export class IndexDbService {
  private readonly dbConfig = getDbConfig();

  constructor() {
    this.openDb(this.createStores.bind(this)).subscribe((db) => {
      db.close();
    });
  }

  
  private get indexDb() {
    return window.indexedDB;
  }

  private openDb(onUpgradeCallback?: IndexedDb.UpgradeCallback) {
    const request = this.indexDb.open(this.dbConfig.name, this.dbConfig.version);

    if (onUpgradeCallback) {
      request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        onUpgradeCallback((event.target as any).result);
      };
    }
    
    return this.handleRequest<IDBDatabase>(request);
  }

  private createStores(db: IDBDatabase) {
    this.dbConfig.stores.forEach((store) => {
      const objectStore = db.createObjectStore(store.name, store.options);

      store.storeSchema.forEach((column) => {
        objectStore.createIndex(column.name, column.keypath, column.options);
      });

      for (let i = this.dbConfig.version; i < store.migrations.length; i += 1) {
        store.migrations[i](db);
      }
    });
  }

  private handleRequest<T>(request: IDBRequest) {
    return new Observable<T>((observer) => {
      request.onsuccess = () => {
        observer.next(request.result);
        observer.complete();
      };

      request.onerror = () => {
        observer.error(request.error);
        observer.complete();
      };
    });
  }

  public addOne<T>(storeName: string, entity: T, key?: string) {
    return this.openDb().pipe(switchMap((db) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const request = transaction.objectStore(storeName).add(entity, key);

      return this.handleRequest<T>(request);
    }));
  }

  public findOne<T>(storeName: string, key: string) {
    return this.openDb().pipe(switchMap((db) => {
      const transaction = db.transaction(storeName, 'readonly');
      const request = transaction.objectStore(storeName).get(key);

      return this.handleRequest<T>(request);
    }));
  }

  public findAll<T>(storeName: string) {
    return this.openDb().pipe(switchMap((db) => {
      const transaction = db.transaction(storeName, 'readonly');
      const request = transaction.objectStore(storeName).getAll();

      return this.handleRequest<T>(request);
    }));
  }

  public deleteOne<T>(storeName: string, value: string) {
    return this.openDb().pipe(switchMap((db) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const request = transaction.objectStore(storeName).openCursor();
      const storeConfig = this.dbConfig.stores.find((store) => store.name === storeName);
      
      return new Observable((observer) => {
        request.onsuccess = () => {
          const cursor = request.result;

          if (cursor.value[storeConfig.primaryKey] === value) {
            const deleteRequest = cursor.delete();

            deleteRequest.onsuccess = () => {
              observer.next(deleteRequest.result);
              observer.complete();
            };

            return;
          }

          cursor.continue();
        };
      });
    }));
  }

  public updateOne<T>(storeName: string, entity: T, key?: IDBValidKey) {
    return this.openDb().pipe(switchMap((db) => {
      const transaction = db.transaction(storeName, 'readwrite');
      const request = transaction.objectStore(storeName).put(entity, key);

      return this.handleRequest<T>(request);
    }));
  }
}
