import { AppConstantDatabase } from "src/app.constant";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { FormularioItemAuditoriaEntity } from "./formulario-item-auditoria.entity";
import { RespuestaAuditoriaEntity } from "./formularios/respuestas-auditoria.entity";
import { SubcategoriaAuditoriaEntity } from "./subcategoria-auditoria.entity";

@Entity('item_auditoria')
export class ItemAuditoriaEntity{
    @PrimaryGeneratedColumn()
    id?: number;

    @CreateDateColumn({
        name: 'fecha_hora_registro',
        type: 'timestamp without time zone'
    })
    fechaHoraRegistro? : Date;

    @UpdateDateColumn({
        name: 'fecha_hora_actualizacion',
        type: 'timestamp without time zone'
    })
    fechaHoraActualizacion? : Date;

    @Column({
        nullable: false,
        length: AppConstantDatabase.DB_COLUMN_TEXT_TAMANIO,
        name: 'item_nombre'
    })
    itemNombre: string;

    @Column({nullable: false, default: AppConstantDatabase.DB_COLUMN_ESTADO_DEFAULT_ACTIVO})
    estado: number;

    @Column({ name: 'id_subcategoria', nullable: true })
    idSubcategoria?: number;

    @ManyToOne(() => SubcategoriaAuditoriaEntity, subcategoria => subcategoria.items, { eager: true })
    @JoinColumn({ name: 'id_subcategoria' })
    subcategoria?: SubcategoriaAuditoriaEntity;

    @OneToMany(() => FormularioItemAuditoriaEntity, formularioItem => formularioItem.item)
    formularioItems?: FormularioItemAuditoriaEntity[];

    @OneToMany(() => RespuestaAuditoriaEntity, respueFinc => respueFinc.item)
    respuestasAuditoria?: RespuestaAuditoriaEntity[];
}