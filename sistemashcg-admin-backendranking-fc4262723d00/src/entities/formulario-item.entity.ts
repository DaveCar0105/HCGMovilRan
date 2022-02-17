import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { FormularioEntity } from "./formulario.entity";
import { ItemEntity } from "./item.entity";

@Entity('formulario_item')
export class FormularioItemEntity{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ name: 'id_formulario', nullable: true })
    idFormulario?: number;

    @ManyToOne(() => FormularioEntity, formularioItem => formularioItem.formularioItems)
    @JoinColumn({ name: 'id_formulario' })
    formulario?: FormularioEntity;

    @Column({ name: 'id_item', nullable: true })
    idItem?: number;

    @ManyToOne(() => ItemEntity, item => item.formularioItems)
    @JoinColumn({ name: 'id_item' })
    item?: ItemEntity;
}