import { Injectable } from '@nestjs/common';
import { CreatePdfInput } from './dto/create-pdf.input';
import { UpdatePdfInput } from './dto/update-pdf.input';
import { Pdf } from './entities/pdf.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PdfService {

  constructor(
    @InjectRepository(Pdf)
    private pdfRepository: Repository<Pdf>,
  ) { }
  async create(createPdfInput: CreatePdfInput): Promise<Pdf>{
    const pdf = await this.pdfRepository.findOne({where: {ticketId: createPdfInput.ticketId}});
    if(pdf){
      throw new Error('Ya existe un pdf para este ticket');
    }
    return this.pdfRepository.save(createPdfInput);
    
  }

  findAll() {
    return `This action returns all pdf`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pdf`;
  }

  update(id: number, updatePdfInput: UpdatePdfInput) {
    return `This action updates a #${id} pdf`;
  }

  remove(id: number) {
    return `This action removes a #${id} pdf`;
  }
}
