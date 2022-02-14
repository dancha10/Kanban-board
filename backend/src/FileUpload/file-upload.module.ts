import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { memoryStorage } from 'multer'
import { FileUploadService } from './file-upload.service'
import { MongooseModule } from '@nestjs/mongoose'
import { File, FileSchema } from '../Models/file.model'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: File.name, schema: FileSchema }]),
    MulterModule.register({
      storage: memoryStorage(),
    }),
  ],
  controllers: [],
  providers: [FileUploadService],
  exports: [FileUploadService],
})
export class FileUploadModule {}
