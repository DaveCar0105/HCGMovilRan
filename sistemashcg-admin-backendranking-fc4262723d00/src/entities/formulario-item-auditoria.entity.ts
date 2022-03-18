import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { FormularioAuditoriaEntity } from "./formulario-auditoria.entity";
import { ItemAuditoriaEntity } from "./item-auditoria.entity";

@Entity('formulario_item_auditoria')
export class FormularioItemAuditoriaEntity{
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ name: 'id_formulario', nullable: true })
    idFormulario?: number;

    @ManyToOne(() => FormularioAuditoriaEntity, formularioItem => formularioItem.formularioItems)
    @JoinColumn({ name: 'id_formulario' })
    formulario?: FormularioAuditoriaEntity;

    @Column({ name: 'id_item', nullable: true })
    idItem?: number;

    @ManyToOne(() => ItemAuditoriaEntity, item => item.formularioItems)
    @JoinColumn({ name: 'id_item' })
    item?: ItemAuditoriaEntity;
}