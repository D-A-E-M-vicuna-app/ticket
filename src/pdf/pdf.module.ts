import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { PdfResolver } from './pdf.resolver';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pdf } from './entities/pdf.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pdf]),
  ],
  providers: [PdfResolver, PdfService],
})
export class PdfModule {}
