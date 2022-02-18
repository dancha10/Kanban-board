import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import * as cookieParser from 'cookie-parser'
import * as session from 'express-session'
import * as csurf from 'csurf'
import helmet from 'helmet'

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function start() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api/')

  app.use(helmet())
  app.enableCors({
    origin: process.env.CORS,
    credentials: true,
  })
  app.use(cookieParser())

  /*app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      resave: false,
      cookie: { maxAge: 3 * 60 * 60 * 1000 },
      saveUninitialized: false,
    }),
  )*/
  //app.use(csurf({ cookie: false }))

  const docs = new DocumentBuilder()
    .setTitle('Bruhello REST API')
    .setDescription('DOCUMENTATION REST API')
    .setVersion('0.0.1')
    .build()

  const document = SwaggerModule.createDocument(app, docs)
  SwaggerModule.setup('/docs', app, document)

  await app.listen(process.env.PORT || 5000, () =>
    console.log(`Server has been started on ${process.env.PORT} port`),
  )
}

start()
