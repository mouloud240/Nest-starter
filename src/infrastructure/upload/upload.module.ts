import { Module } from '@nestjs/common';
import { UPLOAD_SERVICE } from './upload.constants';
import { NoopUploader } from './noop-uploader.service';

@Module({
  providers: [{ provide: UPLOAD_SERVICE, useClass: NoopUploader }],
  exports: [UPLOAD_SERVICE],
})
export class UploadModule {}
