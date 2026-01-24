import redisClient from "../redisConfig/redis";

export async function getCache<T>(key: string): Promise<T | null> {
  const value = await redisClient.get(key);
  if (!value) return null;

  return JSON.parse(value) as T;
}

/* Save to cache */
export async function setCache<T>(
  key: string,
  data: T,
  ttlSeconds = 300
): Promise<void> {
  await redisClient.set(
    key,
    JSON.stringify(data),
    { EX: ttlSeconds }
  );
}

/* Remove from cache */
export async function deleteCache(key: string): Promise<void> {
  await redisClient.del(key);
}