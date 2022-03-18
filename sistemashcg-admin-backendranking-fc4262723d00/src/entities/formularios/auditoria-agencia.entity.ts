import { AppConstantDatabase } from "src/app.constant";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CargueraEntity } from "../carguera.entity";
import { ClienteEntity } from "../cliente.entity";
import { PaisEntity } from "../pais.entity";
import { PostcosechaEntity } from "../postcosecha.entity";
import { TipoCajaEntity } from "../tipo-caja.entity";
import { UsuarioEntity } from "../usuario.entity";
import { AuditoriaAgenciaDetalleEntity } from "./auditoria-agencia-detalle.entity";

@Entity('auditoria_agencia')
export class AuditoriaAgenciaEntity{
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
        name: 'cantidad_cajas', 
        nullable: false
    })
    cantidadCajas: number;

    @Column({
        name: 'numero_tallos', 
        nullable: false
    })
    numeroTallos: number;

    @Column({
        name: 'numero_ramos', 
        nullable: false
    })
    numeroRamos: number;

    @Column({
        name: 'numero_ramos_muestreado', 
        nullable: false
    })
    numeroRamosMuestreados: number;

    @Column({
        name: 'grado_auditoria', 
        type: 'double precision',
        nullable: false
    })
    gradoAuditoria: number;

    @Column({
        name: 'temperatura_caja', 
        type: 'double precision',
        nullable: false
    })
    temperaturaCaja: number;

    @Column({
        nullable: false,
        length: AppConstantDatabase.DB_COLUMN_TEXT_TAMANIO,
        name: 'numero_guia'
    })
    numeroGuia: string;

    @Column({
        nullable: false,
        length: AppConstantDatabase.DB_COLUMN_TEXT_TAMANIO,
        name: 'identificador_caja'
    })
    identificadorCaja: string;

    @Column({ name: 'id_postcosecha', nullable: true })
    idPostcosecha?: number;

    @ManyToOne(() => PostcosechaEntity, postcosecha => postcosecha.auditoriaAgencia, { eager: true })
    @JoinColumn({ name: 'id_postcosecha' })
    postcosecha?: PostcosechaEntity;

    @Column({ name: 'id_usuario', nullable: true })
    idUsuario?: number;

    @ManyToOne(() => UsuarioEntity, usuario => usuario.auditoriaAgencia, { eager: true })
    @JoinColumn({ name: 'id_usuario' })
    usuario?: UsuarioEntity;

    @OneToMany(() =>  AuditoriaAgenciaDetalleEntity, evaluaDetall => evaluaDetall.auditoriaAgencia)
    auditoriasDetalle?:  AuditoriaAgenciaDetalleEntity[];

    @Column({ name: 'id_carguera', nullable: true })
    idCarguera?: number;

    @ManyToOne(() => CargueraEntity, cargue => cargue.auditoriaAgencia, { eager: true })
    @JoinColumn({ name: 'id_carguera' })
    carguera?: CargueraEntity;

    @Column({ name: 'id_cliente', nullable: true })
    idCliente?: number;

    @ManyToOne(() => ClienteEntity, cliet => cliet.auditoriaAgencia, { eager: true })
    @JoinColumn({ name: 'id_cliente' })
    cliente?: ClienteEntity;

    @Column({ name: 'id_pais', nullable: true })
    idPais?: number;

    @ManyToOne(() => PaisEntity, pais => pais.auditoriaAgencia, { eager: true })
    @JoinColumn({ name: 'id_pais' })
    pais?: PaisEntity;

    @Column({ name: 'id_tipo_caja', nullable: true })
    idTipoCaja?: number;

    @ManyToOne(() => TipoCajaEntity, tipoC => tipoC.auditoriaAgencia, { eager: true })
    @JoinColumn({ name: 'id_tipo_caja' })
    tipoCaja?: TipoCajaEntity;
}

/*
@OneToMany(() => AuditoriaAgenciaEntity, evaluaFinc => evaluaFinc.carguera)
    auditoriaAgencia?: AuditoriaAgenciaEntity[];
*/