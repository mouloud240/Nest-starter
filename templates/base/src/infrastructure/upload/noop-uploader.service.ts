import { Injectable, NotImplementedException } from '@nestjs/common';
import { IUploadService } from './upload-service.interface';
import { UploadFile } from './types/upload-file.type';
import { UploadOptions } from './types/upload-options.type';
import { UploadResult } from './types/upload-result.type';

/**
 * Default upload implementation that intentionally throws.
 * Replace the `UPLOAD_SERVICE` provider with a concrete adapter (e.g. Cloudinary, S3).
 */
@Injectable()
export class NoopUploader implements IUploadService {
  upload(_file: UploadFile, _options?: UploadOptions): Promise<UploadResult> {
    throw new NotImplementedException(
      'No UPLOAD_SERVICE provider registered. Provide a concrete IUploadService implementation.',
    );
  }
}
