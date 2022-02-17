import { AppConstantDatabase } from "src/app.constant";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('tipo_caja')
export class TipoCajaEntity{
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
        name: 'tipo_caja_nombre'
    })
    tipoCajaNombre: string;

    @Column({nullable: false, default: AppConstantDatabase.DB_COLUMN_ESTADO_DEFAULT_ACTIVO})
    estado: number;
}