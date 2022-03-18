import { AppConstantDatabase } from "src/app.constant";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AuditoriaAgenciaEntity } from "./formularios/auditoria-agencia.entity";
import { EvaluacionFincaEntity } from "./formularios/evaluacion-finca.entity";

@Entity('carguera')
export class CargueraEntity{
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
        name: 'carguera_nombre'
    })
    cargueraNombre: string;

    @Column({nullable: false, default: AppConstantDatabase.DB_COLUMN_ESTADO_DEFAULT_ACTIVO})
    estado: number;

    @OneToMany(() => AuditoriaAgenciaEntity, evaluaFinc => evaluaFinc.carguera)
    auditoriaAgencia?: AuditoriaAgenciaEntity[];
}