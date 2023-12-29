export interface ISerializer<T> {
  buildEntity(entity: T): T;
}
