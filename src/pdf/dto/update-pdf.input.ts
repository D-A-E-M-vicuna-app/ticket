import { CreatePdfInput } from './create-pdf.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePdfInput extends PartialType(CreatePdfInput) {
  @Field(() => Int)
  id: number;
}
