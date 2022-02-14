import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import * as dayjs from 'dayjs'
import { UploadApiResponse, UploadApiErrorResponse, v2 } from 'cloudinary'
import { Readable } from 'stream'
import { File, FileModelDocument } from '../Models/file.model'

v2.config({
  cloud_name: 'bruhello',
  api_secret: 'y4T4bX1k5SOaaD3Nnlv4Eg1kRyM',
  api_key: '376199273119565',
  secure: true,
})

const MAX_COVER_SIZE = 3 * 1024 * 1024
const MAX_FILE_SIZE = 5 * 1024 * 1024

export const MulterCoverConfig = {
  limits: {
    fileSize: MAX_COVER_SIZE,
  },
  fileFilter: (
    req: Express.Request,
    file: Express.Multer.File,
    cb: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
      return cb(new BadRequestException('Only image files are allowed!'), false)
    }
    cb(null, true)
  },
}

export const MulterFilesConfig = {
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
}

@Injectable()
export class FileUploadService {
  constructor(
    @InjectModel(File.name)
    private readonly FileModel: Model<FileModelDocument>,
  ) {}

  async cloudinaryUpload(
    file: Express.Multer.File,
    folder: 'Covers' | 'Files',
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        {
          folder: folder,
          use_filename: true,
          unique_filename: true,
          public_id: `${FileUploadService.getTime()}-${file.originalname}`,
        },
        (error, result) => {
          if (error) return reject(error)
          resolve(result)
        },
      )
      Readable.from(file.buffer).pipe(upload)
    })
  }

  async saveFile(
    fileName: string,
    file: UploadApiResponse | UploadApiErrorResponse,
  ): Promise<File> {
    return await this.FileModel.create({
      fileName: fileName,
      url: file.secure_url,
      size: file.bytes,
    })
  }

  async removeFile(url: string): Promise<File> {
    return this.FileModel.findOneAndDelete({ url })
  }

  async deleteAttachmentById(_id: string): Promise<File> {
    return this.FileModel.findByIdAndDelete({ _id })
  }

  private static getTime(): string {
    return `${dayjs().get('date')}-${dayjs().get('month')}-${dayjs().get(
      'year',
    )}-${dayjs().get('hour')}-${dayjs().get('minute')}-${dayjs().get(
      'millisecond',
    )}`
  }
}
