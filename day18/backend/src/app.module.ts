import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './api/auth/auth.module';
import { UserModule } from './api/user/user.module';
import { TeacherModule } from './api/teacher/teacher.module';
import { StudentModule } from './api/student/student.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './api/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),

        entities: [__dirname + '/**/*.entity.{ts,js}'],
        migrations: [__dirname + '/migrations/*.{ts,js}'],

        synchronize: false,
        migrationsRun: false,
      }),
    }),
    AuthModule,
    UserModule,
    TeacherModule,
    StudentModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
