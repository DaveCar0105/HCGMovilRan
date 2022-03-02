import { HttpModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AutenticationGuards } from './common/guards/guard';
import { AutenticacionController } from './controllers/autentication.controller';
import { CargueraController } from './controllers/carguera.controller';
import { CategoriaController } from './controllers/categoria.controller';
import { CausaController } from './controllers/causa.controller';
import { ClienteController } from './controllers/cliente.controller';
import { FormularioController } from './controllers/formulario.controller';
import { InformacionAuditoriaController } from './controllers/informacion-auditoria.controller';
import { ItemRangoController } from './controllers/item-rango.controller';
import { ItemController } from './controllers/item.controller';
import { PaisController } from './controllers/pais.controller';
import { PostcosechaController } from './controllers/postcosecha.controller';
import { ProcesoMaltratoController } from './controllers/proceso-maltrato.controller';
import { ProcesoTamanoBotonController } from './controllers/proceso-tamano-boton.controller';
import { ProductoController } from './controllers/producto.controller';
import { RangoController } from './controllers/rango.controller';
import { SubcategoriaController } from './controllers/subcategoria.controller';
import { TipoCajaController } from './controllers/tipo-caja.controller';
import { UsuarioController } from './controllers/usuario.controller';
import { VariedadController } from './controllers/variedad.controller';
import { AuditoriaCausaEntity } from './entities/auditoria-causa.entity';
import { CargueraEntity } from './entities/carguera.entity';
import { CategoriaEntity } from './entities/categoria.entity';
import { CausaEntity } from './entities/causa.entity';
import { ClienteEntity } from './entities/cliente.entity';
import { FormularioItemEntity } from './entities/formulario-item.entity';
import { FormularioEntity } from './entities/formulario.entity';
import { InformacionAuditoriaEntity } from './entities/informacion-auditoria.entity';
import { ItemRangoEntity } from './entities/item-rango.entity';
import { ItemEntity } from './entities/item.entity';
import { PaisEntity } from './entities/pais.entity';
import { PostcosechaEntity } from './entities/postcosecha.entity';
import { ProcesoMaltratoEntity } from './entities/proceso-maltrato.entity';
import { ProcesoTamanoBotonEntity } from './entities/proceso-tamano-boton.entity';
import { ProductoEntity } from './entities/producto.entity';
import { RangoEntity } from './entities/rango.entity';
import { SubcategoriaEntity } from './entities/subcategoria.entity';
import { TipoCajaEntity } from './entities/tipo-caja.entity';
import { UsuarioEntity } from './entities/usuario.entity';
import { VariedadEntity } from './entities/variedad.entity';
import { CargueraRepository } from './repositories/carguera.repository';
import { CategoriaRepository } from './repositories/categoria.repository';
import { CausaRepository } from './repositories/causa.repository';
import { ClienteRepository } from './repositories/cliente.repository';
import { FormularioRepository } from './repositories/formulario.repository';
import { InformacionAuditoriaRepository } from './repositories/informacion-auditoria.repository';
import { ItemRangoRepository } from './repositories/item-rango.repository';
import { ItemRepository } from './repositories/item.repository';
import { PaisRepository } from './repositories/pais.repository';
import { PostcosechaRepository } from './repositories/postcosecha.repository';
import { ProcesoMaltratoRepository } from './repositories/proceso-maltrato.repository';
import { ProcesoTamnoBotonRepository } from './repositories/proceso-tamano-boton.repository';
import { ProductoRepository } from './repositories/producto.repository';
import { RangoRepository } from './repositories/rango.repository';
import { SubcategoriaRepository } from './repositories/subcategoria.repository';
import { TipoCajaRepository } from './repositories/tipo-caja.repository';
import { UsuarioRepository } from './repositories/usuario.repository';
import { VariedadRepository } from './repositories/variedad.repository';
import { AutenticacionService } from './services/autentication.service';
import { JwtService } from './services/jwt.service';

const ENTIDADES = [
  CargueraEntity,
  ClienteEntity,
  PaisEntity,
  TipoCajaEntity,
  UsuarioEntity,
  PostcosechaEntity,
  ProductoEntity,
  VariedadEntity,
  CausaEntity,
  InformacionAuditoriaEntity,
  AuditoriaCausaEntity,
  ProcesoTamanoBotonEntity,
  ProcesoMaltratoEntity,
  RangoEntity,
  CategoriaEntity,
  SubcategoriaEntity,
  ItemEntity,
  FormularioEntity,
  FormularioItemEntity,
  ItemRangoEntity
];

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '12345678',
        database: 'DBPRUEBA',
        entities: ENTIDADES,
        synchronize: true
      })
    }),
    TypeOrmModule.forFeature(ENTIDADES),
  ],
  controllers: [
    AppController,
    CargueraController,
    CausaController,
    ClienteController,
    PaisController,
    PostcosechaController,
    ProcesoMaltratoController,
    ProcesoTamanoBotonController,
    ProductoController,
    TipoCajaController,
    UsuarioController,
    VariedadController,
    AutenticacionController,
    RangoController,
    CategoriaController,
    SubcategoriaController,
    ItemController,
    FormularioController,
    ItemRangoController,
    InformacionAuditoriaController,
  ],
  providers: [
    AppService,
    AutenticationGuards,
    JwtService,
    AutenticacionService,
    CargueraRepository,
    CausaRepository,
    ClienteRepository,
    PaisRepository,
    PostcosechaRepository,
    ProcesoTamnoBotonRepository,
    ProcesoMaltratoRepository,
    ProductoRepository,
    TipoCajaRepository,
    UsuarioRepository,
    VariedadRepository,
    RangoRepository,
    CategoriaRepository,
    SubcategoriaRepository,
    ItemRepository,
    FormularioRepository,
    ItemRangoRepository,
    InformacionAuditoriaRepository
  ],
})
export class AppModule {}
