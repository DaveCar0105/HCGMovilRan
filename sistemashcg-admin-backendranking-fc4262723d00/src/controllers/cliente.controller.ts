import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
import { AppConstantController } from "src/app.constant";
import { ClienteRepository } from "src/repositories/cliente.repository";


@Controller(AppConstantController.CLIENTE_CONTROLLER)
export class ClienteController{
    constructor(private readonly clienteRepository: ClienteRepository){}

    @Post()
    create(@Body() objetoDto) {
        return this.clienteRepository.insert(objetoDto);
    }

    @Get()
    async findAll(@Res() response) {
        return response.send(await this.clienteRepository.selectAll());
    }

    @Get('id/:id')
    async findOne(@Param('id') id, @Res() response) {
        return response.send(await this.clienteRepository.selectById(id));
    }

    @Put(':id')
    async update(@Param('id') id, @Body() objActualizar) {
        return await this.clienteRepository.update(id, objActualizar);
    }

    @Put('activar/:id')
    async updateActivar(@Param('id') id) {
        return await this.clienteRepository.updateEstadoActivo(id);
    }

    @Put('desactivar/:id')
    async updateDesactivar(@Param('id') id) {
        return await this.clienteRepository.updateEstadoDesActivo(id);
    }
}