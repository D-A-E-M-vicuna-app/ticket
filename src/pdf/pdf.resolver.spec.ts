import { Test, TestingModule } from '@nestjs/testing';
import { PdfResolver } from './pdf.resolver';
import { PdfService } from './pdf.service';

describe('PdfResolver', () => {
  let resolver: PdfResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PdfResolver, PdfService],
    }).compile();

    resolver = module.get<PdfResolver>(PdfResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
