import { AppConstantDatabase } from "src/app.constant";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { VariedadEntity } from "../variedad.entity";
import { EvaluacionFincaEntity } from "./evaluacion-finca.entity";
import { RespuestaFincaEntity } from "./respuesta-finca.entity";

@Entity('evaluacion_detalle')
export class EvaluacionDetalleEntity{
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
        name: 'numero_mesa'
    })
    numeroMesa: string;
    
    @Column({
        name: 'grado_variedad', 
        type: 'double precision', 
        nullable: true
    })
    gradoVariedad?: number;

    @Column({
        name: "tallos_por_ramo",
        nullable: false
    })
    tallosPorRamo: number;

    @Column({ name: 'id_variedad', nullable: true })
    idVariedad?: number;

    @ManyToOne(() => VariedadEntity, variedad => variedad.evaluacionesDetalle, { eager: true })
    @JoinColumn({ name: 'id_variedad' })
    variedad?: VariedadEntity;

    @Column({ name: 'id_evaluacion_finca', nullable: true })
    idEvaluacionFinca?: number;

    @ManyToOne(() => EvaluacionFincaEntity, evualFin => evualFin.evaluacionesDetalle, { eager: true })
    @JoinColumn({ name: 'id_evaluacion_finca' })
    evaluacionFinca?: EvaluacionFincaEntity;

    @OneToMany(() => RespuestaFincaEntity, respueFinc => respueFinc.evaluacionDetalle)
    respuestasFinca?: RespuestaFincaEntity[];
}