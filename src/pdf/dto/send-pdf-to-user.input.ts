import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class SendPdfToUserInput {
  
  @Field()
  email: string;
  
  @Field()
  pdfBase64: string;

  
}