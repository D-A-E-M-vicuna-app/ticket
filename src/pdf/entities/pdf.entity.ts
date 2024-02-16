import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Pdf {
  
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  nombre: string;
  
  @Field()
  @Column()
  localidad: string;

  @Field()
  @Column()
  fecha: string;

  @Field()
  @Column()
  tipoDeVisita: string;
  
  @Field()
  @Column()
  problemaEncontrado: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  detalleProblema?: string;

  @Field()
  @Column()
  trabajoRealizado: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  detalleTrabajo?: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  observaciones?: string;

  @Field()
  @Column()
  ticketId: number;
}
