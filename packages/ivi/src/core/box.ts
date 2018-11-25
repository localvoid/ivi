export interface Box<T> {
  v: T;
}

export const box = <T>(v: T) => ({ v });
