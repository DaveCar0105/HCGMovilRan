import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { UsuarioRepository } from '../repositories/usuario.repository';
import { UsuarioAutenticacionDto } from 'src/dtos/usuario-autentication.dto';

@Injectable()
export class AutenticacionService {
  constructor(
    private readonly usuarioRepository: UsuarioRepository,
    private readonly jwtService: JwtService,
  ) {
  }

  /**
   * Verifica que los parámetros de autenticación del usuarioAutenticacionDto coincidan con los registrados en la base
   * de datos y de ser asi emite un JWT caso contrario una excepción.
   * @throw {BadRequestException}
   * @param usuarioAutenticacionDto
   * @returns {Promise<any>}
   * @author Roberto Toapanta
   * @version 0.1
   */
  async autenticarUsuario(usuarioAutenticacionDto: UsuarioAutenticacionDto) {
    console.log("estoy x aca");
    const usuarioEntity = await this.usuarioRepository.selectByNick(usuarioAutenticacionDto.nickname);
    console.log(usuarioEntity);
    if (usuarioEntity) {
      if (usuarioEntity.estado && usuarioAutenticacionDto.nickname === usuarioEntity.usuarioUsername && usuarioAutenticacionDto.password === usuarioEntity.usuarioPassword) {
        const payload = {
            id: usuarioEntity.id,
            nickname: usuarioEntity.usuarioUsername,
            rol: usuarioEntity.usuarioNombre,
          };
          delete usuarioEntity.usuarioPassword;
          return { accessToken: this.jwtService.emitirToken(payload), usuarioDto: usuarioEntity };
      }
    }
    throw new BadRequestException('¡Credenciales inválidas!');
  }

  /**
   * Verifica que el token sea válido y tenga una sesión activa.
   * @param {string} jwt
   * @param {(error, data) => void} callback
   * @author Roberto Toapanta
   * @version 0.1
   */
  verificarToken(jwt: string, callback: (error, data) => void) {
    this.jwtService.verificarToken(jwt, (error, data) => {
      if (error) {
        callback({
          mensaje: '¡Jwt inválido!',
          error: error,
        }, null);
      } else {
        callback(null, {
          mensaje: 'Token válido',
          data: data,
        });
      }
    });
  }
}
