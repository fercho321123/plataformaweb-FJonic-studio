import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
// ... tus otros imports

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbUrl = configService.get<string>('DATABASE_URL') || configService.get<string>('POSTGRES_URL');

        // Si hay URL de Neon, la usamos directamente (esto ignora el host 'base')
        if (dbUrl) {
          return {
            type: 'postgres',
            url: dbUrl,
            autoLoadEntities: true,
            synchronize: false,
            ssl: { rejectUnauthorized: false }, // Obligatorio para Neon
          };
        }

        // Si no hay URL (Localhost), usamos tus datos manuales
        return {
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'Yao072212',
          database: 'fjonic_autenticacion',
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    // ... tus otros módulos
  ],
})
export class AppModule {}