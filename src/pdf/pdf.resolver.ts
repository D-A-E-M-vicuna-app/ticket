import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PdfService } from './pdf.service';
import { Pdf } from './entities/pdf.entity';
import { CreatePdfInput } from './dto/create-pdf.input';
import { UpdatePdfInput } from './dto/update-pdf.input';

@Resolver(() => Pdf)
export class PdfResolver {
  constructor(private readonly pdfService: PdfService) {}

  @Mutation(() => Pdf)
  createPdf(@Args('CreatePdfInput') createPdfInput: CreatePdfInput): Promise<Pdf> {
    return this.pdfService.create(createPdfInput);
  }

  @Query(() => [Pdf], { name: 'pdf' })
  findAll() {
    return this.pdfService.findAll();
  }

  @Query(() => Pdf, { name: 'pdf' })
  findOne(@Args('id', { type: () => Int }) id: number) {
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
}
