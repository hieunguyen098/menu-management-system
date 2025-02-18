import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { PrismaModule } from '../prisma/prisma.module';
import { MenuController } from './menu.controller';

@Module({
  imports: [PrismaModule],
  controllers: [MenuController],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}
