import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { UserHelperModule } from './Auth/UserHelper/user-helper.module'
import { BoardModule } from './Board/board.module'
import { ColumnModule } from './column/column.module'
import { CardModule } from './Card/card.module'
import { FileUploadModule } from './FileUpload/file-upload.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './src/Config/.env',
    }),
    MongooseModule.forRoot(process.env.DATABASE),
    AuthModule,
    UserHelperModule,
    BoardModule,
    ColumnModule,
    CardModule,
    FileUploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
