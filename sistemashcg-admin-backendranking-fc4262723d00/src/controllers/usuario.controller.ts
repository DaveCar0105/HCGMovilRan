import { Body, Controller, Get, Param, Post, Put, Res, UseGuards } from "@nestjs/common";
import { AppConstantController } from "src/app.constant";
import { AutenticationGuards } from "src/common/guards/guard";
import { UsuarioRepository } from "src/repositories/usuario.repository";

//@UseGuards(AutenticationGuards)
@Controller(AppConstantController.USUARIO_CONTROLLER)
export class UsuarioController{
    constructor(private readonly usuarioRepository: UsuarioRepository){}

    @Post()
    create(@Body() objetoDto) {
        return this.usuarioRepository.insert(objetoDto);
    }

    @Get()
    async findAll(@Res() response) {
        return response.send(await this.usuarioRepository.selectAll());
    }

    @Get('id/:id')
    async findOne(@Param('id') id, @Res() response) {
        return response.send(await this.usuarioRepository.selectById(id));
    }

    @Put(':id')
    async update(@Param('id') id, @Body() objActualizar) {
        return await this.usuarioRepository.update(id, objActualizar);
    }

    @Put('activar/:id')
    async updateActivar(@Param('id') id) {
        return await this.usuarioRepository.updateEstadoActivo(id);
    }

    @Put('desactivar/:id')
    async updateDesactivar(@Param('id') id) {
        return await this.usuarioRepository.updateEstadoDesActivo(id);
    }
}