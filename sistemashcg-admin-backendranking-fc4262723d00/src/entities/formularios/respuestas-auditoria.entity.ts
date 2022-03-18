import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ItemAuditoriaEntity } from "../item-auditoria.entity";
import { AuditoriaAgenciaDetalleEntity } from "./auditoria-agencia-detalle.entity";

@Entity('respuesta_auditoria')
export class RespuestaAuditoriaEntity{
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

    @Column({ name: 'id_auditoria_detalle', nullable: true })
    idAuditoriaAgenciaDetalle?: number;

    @ManyToOne(() => AuditoriaAgenciaDetalleEntity, evaluacDetall => evaluacDetall.respuestasAuditoria, { eager: true })
    @JoinColumn({ name: 'id_auditoria_detalle' })
    auditoriaAgenciaDetalle?: AuditoriaAgenciaDetalleEntity;

    @Column({ name: 'id_item', nullable: true })
    idItem?: number;

    @ManyToOne(() => ItemAuditoriaEntity, itemE => itemE.respuestasAuditoria, { eager: true })
    @JoinColumn({ name: 'id_item' })
    item?: ItemAuditoriaEntity;
}