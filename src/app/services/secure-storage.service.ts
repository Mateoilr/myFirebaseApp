import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class SecureStorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // Inicializa el almacenamiento
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Guarda un valor seguro
  public async set(key: string, value: any): Promise<void> {
    if (!this._storage) {
      await this.init();
    }
    await this._storage?.set(key, value);
  }

  // Obtiene un valor seguro
  public async get(key: string): Promise<any> {
    if (!this._storage) {
      await this.init();
    }
    return await this._storage?.get(key);
  }

  // Elimina un valor seguro
  public async remove(key: string): Promise<void> {
    if (!this._storage) {
      await this.init();
    }
    await this._storage?.remove(key);
  }

  // Limpia todo el almacenamiento
  public async clear(): Promise<void> {
    if (!this._storage) {
      await this.init();
    }
    await this._storage?.clear();
  }
}
