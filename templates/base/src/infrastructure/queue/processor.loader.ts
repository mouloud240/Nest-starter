import { globSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Load all BullMQ processor classes declared under the queue directory.
 *
 * Any file matching the processor pattern ts or js under the queue tree is
 * required, and every class export is registered as a provider. Keep helper
 * functions and DTOs out of .processor.ts files to avoid registering
 * unintended providers.
 */
export function loadProcessors(): any[] {
  const extension = __filename.endsWith('.ts') ? 'ts' : 'js';
  const files = globSync(`**/*.processor.${extension}`, {
    cwd: __dirname,
  });

  const processors: any[] = [];
  for (const file of files) {
    const module = require(resolve(__dirname, file));
    for (const exported of Object.values(module)) {
      if (typeof exported === 'function' && exported.prototype) {
        processors.push(exported);
      }
    }
  }
  return processors;
}
