import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {JwtService} from '../../services/jwt.service';
import {UsuarioRepository} from '../../repositories/usuario.repository';

@Injectable()
export class AutenticationGuards implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly usuarioRepository: UsuarioRepository,
  ) {
  }

  /**
   * Verifica que el rol del usuario contenido en el token de autorizacion coincida con los valores almacenados
   * en la base datos y concede el permiso a dicha ruta en el caso de estar autorizado.
   * @param {ExecutionContext} context
   * @returns {Promise<boolean>}
   * @author Roberto Toapanta
   * @version 0.1
   */
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let jwtValue = request.headers.authorization;
    if (!jwtValue) {
      return false;
    } else {
      jwtValue = jwtValue.replace('Bearer ', '');
      const resultToken = this.jwtService.verificarTokenSync(jwtValue);
      if (resultToken) {
        const usuarioEntity = await this.usuarioRepository.selectByNick(resultToken.data.nickname);
        if (usuarioEntity && usuarioEntity.estado && usuarioEntity.usuarioUsername === resultToken.data.nickname) {
          //BORRAR PARA PRODUCCION
          return true;
        }
      }
      return false;
    }
  }
}
