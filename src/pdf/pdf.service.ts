import { Injectable } from '@nestjs/common';
import { CreatePdfInput } from './dto/create-pdf.input';
import { UpdatePdfInput } from './dto/update-pdf.input';
import { Pdf } from './entities/pdf.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Send } from 'express';
import { SendPdfToUserInput } from './dto/send-pdf-to-user.input';
import { SendPdfToUserResponse } from './responses/send-pdf-to-user.response';

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

  findOne(id: number): Promise<Pdf>{
    const pdf = this.pdfRepository.findOne({where: {id: id}});
    if(!pdf){
      throw new Error('No existe el pdf');
    }
    return pdf;
  }

  update(id: number, updatePdfInput: UpdatePdfInput) {
    return `This action updates a #${id} pdf`;
  }

  remove(id: number) {
    return `This action removes a #${id} pdf`;
  }
  
  async sendPdfToUser(sendPdfToUserInput: SendPdfToUserInput): Promise<SendPdfToUserResponse>{
    //enviar el pdf al usuario
    const email = sendPdfToUserInput.email;
    const pdfBase64 = sendPdfToUserInput.pdfBase64;
    console.log('email', email);
    console.log('pdfBase64', pdfBase64);
    console.log('enviando pdf al usuario');

    //const fs = require('fs');
    const nodemailer = require('nodemailer');
    const client = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    
    const pdfBuffer = Buffer.from(pdfBase64, 'base64');
    //fs.writeFileSync('output22.pdf', pdfBuffer);//descarga el pdf en el root de la app
    
    try {
      await client.sendMail(
        {
          from: 'Area informatica D.A.E.M. <noreply@ejemplo.com>',
          to: email,
          subject: 'Reporte de visita tecnica',
          html: `
          <h2>Informe de visita tecnica</h2>
          <h3>Estimado usuario junto con saludar se adjunta informe de visita tecnica</h3> 
          <p>Atte: Area informatica D.A.E.M.</p>
        
        `,
          attachments: [
            {
              filename: 'reporte.pdf',
              content: pdfBase64.split('base64,')[1],
              encoding: 'base64'
            }
          ],
        }
      );
      return { message: 'Pdf enviado al usuario' , success: true};
  } catch (error) {
      console.error('Error sending email', error);
      return { message: 'Error enviando el correo', success: false};
  }
  }
}
