export interface UploadOptions {
  uploadType:
    | 'USER'
    | 'ORGANIZATION'
    | 'HACKATHON'
    | 'PROVIDER'
    | 'SUBMISSION'
    | 'OTHER';
  metadata?: Record<string, unknown>;
}
