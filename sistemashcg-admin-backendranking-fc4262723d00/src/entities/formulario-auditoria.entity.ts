import { AppConstantDatabase } from "src/app.constant";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, OneToMany } from "typeorm";
import { FormularioItemAuditoriaEntity } from "./formulario-item-auditoria.entity";

@Entity('formulario_auditoria')
export class FormularioAuditoriaEntity{
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
        name: 'formulario_nombre'
    })
    formularioNombre: string;

    @Column({
        nullable: false,
        length: AppConstantDatabase.DB_COLUMN_TEXT_TAMANIO,
        name: 'formulario_nombre_desplazar'
    })
    formularioNombreDesplazar: string;

    @Column({nullable: false, default: AppConstantDatabase.DB_COLUMN_ESTADO_DEFAULT_ACTIVO})
    estado: number;

    @OneToMany(() => FormularioItemAuditoriaEntity, formularioItem => formularioItem.formulario)
    formularioItems?: FormularioItemAuditoriaEntity[];
}