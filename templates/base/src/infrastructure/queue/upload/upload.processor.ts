import { Inject, NotImplementedException } from '@nestjs/common';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { UPLOAD_JOBS } from 'src/common/constants/jobs';
import { QUEUE_NAME } from 'src/common/constants/queues';
import { IUploadService } from 'src/infrastructure/upload/upload-service.interface';
import { UPLOAD_SERVICE } from 'src/infrastructure/upload/upload.constants';
import { UploadJobDto } from './dto/upload-job.dto';

@Processor(QUEUE_NAME.UPLOAD)
export class UploadProcessor extends WorkerHost {
  constructor(
    @Inject(UPLOAD_SERVICE) private readonly uploadService: IUploadService,
  ) {
    super();
  }
  process(job: Job<UploadJobDto>): Promise<unknown> {
    switch (job.name) {
      case UPLOAD_JOBS.UPLOAD_FILE:
        return this.uploadService.upload(job.data.file, job.data.options);
      case UPLOAD_JOBS.DELETE_FILE:
        if (!this.uploadService.delete) {
          throw new NotImplementedException(
            'Current UPLOAD_SERVICE provider does not support delete.',
          );
        }
        return this.uploadService.delete(
          job.data.options.metadata?.id as string,
        );
      default:
        return Promise.resolve({
          message: 'Upload job processed',
          jobId: job.id,
        });
    }
  }
}
