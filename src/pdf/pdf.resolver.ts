import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PdfService } from './pdf.service';
import { Pdf } from './entities/pdf.entity';
import { CreatePdfInput } from './dto/create-pdf.input';
import { UpdatePdfInput } from './dto/update-pdf.input';
import { SendPdfToUserInput } from './dto/send-pdf-to-user.input';
import { SendPdfToUserResponse } from './responses/send-pdf-to-user.response';

@Resolver(() => Pdf)
export class PdfResolver {
  constructor(private readonly pdfService: PdfService) {}

  @Mutation(() => Pdf)
  createPdf(@Args('CreatePdfInput') createPdfInput: CreatePdfInput): Promise<Pdf> {
    return this.pdfService.create(createPdfInput);
  }

  @Query(() => [Pdf], { name: 'pdfs' })
  findAll() {
    return this.pdfService.findAll();
  }

  @Query(() => Pdf, { name: 'pdf' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Pdf>{
    return this.pdfService.findOne(id);
  }

  @Mutation(() => Pdf)
  updatePdf(@Args('updatePdfInput') updatePdfInput: UpdatePdfInput) {
    return this.pdfService.update(updatePdfInput.id, updatePdfInput);
  }

  @Mutation(() => Pdf)
  removePdf(@Args('id', { type: () => Int }) id: number) {
    return this.pdfService.remove(id);
  }

  @Mutation(() => SendPdfToUserResponse , { name: 'sendPdfToUser' })
  sendPdfToUser(@Args('sendPdfToUserInput') sendPdfToUserInput: SendPdfToUserInput):Promise<SendPdfToUserResponse>{
    console.log('entrando en sendPdfToUser');
    return this.pdfService.sendPdfToUser(sendPdfToUserInput);
  }
}
