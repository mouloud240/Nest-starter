import { UploadFile } from 'src/infrastructure/upload/types/upload-file.type';
import { UploadOptions } from 'src/infrastructure/upload/types/upload-options.type';

export class UploadJobDto {
  file: UploadFile;
  options: UploadOptions;
}
