import { AppConstantDatabase } from "src/app.constant";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PostcosechaEntity } from "../postcosecha.entity";
import { UsuarioEntity } from "../usuario.entity";
import { EvaluacionDetalleEntity } from "./evaluacion-detalle.entity";

@Entity('evaluacion_finca')
export class EvaluacionFincaEntity{
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
        name: 'fecha_auditoria',
        type: 'timestamp without time zone'
    })
    fechaAuditoria? : Date;

    @Column({
        nullable: false,
        length: AppConstantDatabase.DB_COLUMN_TEXT_TAMANIO,
        name: 'tipo_evaluacion'
    })
    tipoEvaluacion: string;

    @Column({ name: 'id_postcosecha', nullable: true })
    idPostcosecha?: number;

    @ManyToOne(() => PostcosechaEntity, postcosecha => postcosecha.evaluacionesFinca, { eager: true })
    @JoinColumn({ name: 'id_postcosecha' })
    postcosecha?: PostcosechaEntity;

    @Column({ name: 'id_usuario', nullable: true })
    idUsuario?: number;

    @ManyToOne(() => UsuarioEntity, usuario => usuario.evaluacionesFinca, { eager: true })
    @JoinColumn({ name: 'id_usuario' })
    usuario?: UsuarioEntity;

    @OneToMany(() => EvaluacionDetalleEntity, evaluaDetall => evaluaDetall.evaluacionFinca)
    evaluacionesDetalle?: EvaluacionDetalleEntity[];
}