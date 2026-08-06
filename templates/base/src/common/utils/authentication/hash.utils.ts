import * as argon2 from 'argon2';
const ARGON2_CONFIG = {
  type: argon2.argon2id,
  memoryCost: 2 ** 14, // 16 MB
  timeCost: 2,
  parallelism: 4,
};
export function generateHash(input: string): Promise<string> {
  return argon2.hash(input, ARGON2_CONFIG);
}

export async function compareHash(
  input: string,
  hash: string,
): Promise<boolean> {
  // argon2.verify throws when the stored hash is not a valid argon2id hash
  // (e.g. a plaintext password or a legacy hash). Treat any failure as a
  // mismatch instead of surfacing a 500.
  try {
    return await argon2.verify(hash, input);
  } catch {
    return false;
  }
}
