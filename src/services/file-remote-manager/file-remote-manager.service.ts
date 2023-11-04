import { Injectable } from '@nestjs/common';
import {
    DeleteObjectCommand,
    GetObjectCommand,
    PutObjectCommand,
    S3Client,
  } from "@aws-sdk/client-s3";
  import { ConfigService } from "@nestjs/config";

@Injectable()
export class FileRemoteManagerService {
    constructor(private configService: ConfigService) {}
  private readonly s3Client = new S3Client({
    region: this.configService.getOrThrow("AWS_S3_REGION"),
  });

  async upload(bucket: string, filename: string, file: Buffer) {
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: filename,
        Body: file,
      }),
    );
  }

  async delete(bucket: string, filename: string) {
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: filename,
      }),
    );
  }

  async get(bucket: string, filename: string) {
    await this.s3Client.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: filename,
      }),
    );
  }
}
