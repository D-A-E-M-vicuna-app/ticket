import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePdfInput {
  
  @Field()
  nombre: string;
  
  @Field()
  localidad: string;

  @Field()
  fecha: string;

  @Field()
  tipoDeVisita: string;
  
  @Field()
  problemaEncontrado: string;

  @Field({ nullable: true })
  detalleProblema?: string;

  @Field()
  trabajoRealizado: string;

  @Field({ nullable: true })
  detalleTrabajo?: string;

  @Field({ nullable: true })
  observaciones?: string;

  @Field(() => Int)
  ticketId: number;
}