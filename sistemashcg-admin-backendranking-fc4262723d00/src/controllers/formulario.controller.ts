import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
import { AppConstantController } from "src/app.constant";
import { FormularioRepository } from "src/repositories/formulario.repository";

@Controller(AppConstantController.FORMULARIO_CONTROLLER)
export class FormularioController{
    constructor(private readonly formularioRepository: FormularioRepository){}

    @Post()
    create(@Body() objetoDto) {
        return this.formularioRepository.insert(objetoDto);
    }

    @Get()
    async findAll(@Res() response) {
        return response.send(await this.formularioRepository.selectAll());
    }

    @Get('id/:id')
    async findOne(@Param('id') id, @Res() response) {
        return response.send(await this.formularioRepository.selectById(id));
    }

    @Put('activar/:id')
    async updateActivar(@Param('id') id) {
        return await this.formularioRepository.updateEstadoActivo(id);
    }

    @Put('desactivar/:id')
    async updateDesactivar(@Param('id') id) {
        return await this.formularioRepository.updateEstadoDesActivo(id);
    }

    @Get('formulario')
    async findAllFormularioApp(@Res() response) {
        return response.send(await this.formularioRepository.selectAllFormulario());
    }
}