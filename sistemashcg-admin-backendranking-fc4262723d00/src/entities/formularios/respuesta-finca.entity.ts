import { AppConstantDatabase } from "src/app.constant";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ItemEntity } from "../item.entity";
import { EvaluacionDetalleEntity } from "./evaluacion-detalle.entity";

@Entity('respuesta_finca')
export class RespuestaFincaEntity{
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
        name: 'cantidad_respuesta', 
        type: 'double precision', 
        nullable: true
    })
    cantidadRespuesta?: number;

    @Column({
        name: 'total_respuesta', 
        type: 'double precision', 
        nullable: true
    })
    totalRespuesta?: number;

    @Column({ name: 'id_evaluacion_detalle', nullable: true })
    idEvaluacionDetalle?: number;

    @ManyToOne(() => EvaluacionDetalleEntity, evaluacDetall => evaluacDetall.respuestasFinca, { eager: true })
    @JoinColumn({ name: 'id_evaluacion_detalle' })
    evaluacionDetalle?: EvaluacionDetalleEntity;

    @Column({ name: 'id_item', nullable: true })
    idItem?: number;

    @ManyToOne(() => ItemEntity, itemE => itemE.respuestasFinca, { eager: true })
    @JoinColumn({ name: 'id_item' })
    item?: ItemEntity;
}