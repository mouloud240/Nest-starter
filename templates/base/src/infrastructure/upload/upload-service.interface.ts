import { UploadFile } from './types/upload-file.type';
import { UploadOptions } from './types/upload-options.type';
import { UploadResult } from './types/upload-result.type';

export interface IUploadService {
  upload(file: UploadFile, options?: UploadOptions): Promise<UploadResult>;
  delete?(id: string): Promise<void>;
}
