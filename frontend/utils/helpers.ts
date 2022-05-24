export function pick<T>(obj: T, keys: (keyof T)[]): Partial<T> {
  return keys.reduce((acc, key) => {
    if (obj[key] !== undefined) {
      acc[key] = obj[key];
    }
    return acc;
  }, {} as Partial<T>);
}

export function omit<T extends object, K extends keyof T, U extends Omit<T, K>>(
  obj: T,
  keys: K[]
): U {
  return Object.keys(obj).reduce((acc, key) => {
    if (!keys.includes(key as K)) {
      acc[key] = obj[key as K];
    }
    return acc;
  }, {} as U);
}
