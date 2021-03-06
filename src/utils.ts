import { exists, mkdir, writeFile } from 'fs';
import { join } from 'path';
import { promisify } from 'util';

const existsAsync = promisify(exists);
const mkdirAsync = promisify(mkdir);

export async function mkdirIfNotExists(dir: string) {
  const parts = dir.split(/[\/\\]/);

  if (parts.length) {
    let currentPath = parts.shift() || '';
    for (const part of parts) {
      currentPath = join(currentPath, part);
      if (!(await existsAsync(currentPath))) {
        await mkdirAsync(currentPath);
      }
    }
  }
}

export const writeFileAsync = promisify(writeFile);
