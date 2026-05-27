import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { GuidesModule } from './guides/guides.module';
import { TouristsModule } from './tourists/tourists.module';
import { PlacesModule } from './places/places.module';
import { RoutesModule } from './routes/routes.module';
import { BookingsModule } from './bookings/bookings.module';
import { ReviewsModule } from './reviews/reviews.module';
import { LoggerService } from './logger.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    GuidesModule,
    TouristsModule,
    PlacesModule,
    RoutesModule,
    BookingsModule,
    ReviewsModule,
  ],
  providers: [LoggerService],
  exports: [LoggerService],
})
export class AppModule {}