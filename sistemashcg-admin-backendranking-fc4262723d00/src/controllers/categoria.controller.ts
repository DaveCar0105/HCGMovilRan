import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
import { AppConstantController } from "src/app.constant";
import { CategoriaRepository } from "src/repositories/categoria.repository";

@Controller(AppConstantController.CATEGORIA_CONTROLLER)
export class CategoriaController{
    constructor(private readonly categoriaRepository: CategoriaRepository){}

    @Post()
    create(@Body() objetoDto) {
        return this.categoriaRepository.insert(objetoDto);
    }

    @Get()
    async findAll(@Res() response) {
        return response.send(await this.categoriaRepository.selectAll());
    }

    @Get('id/:id')
    async findOne(@Param('id') id, @Res() response) {
        return response.send(await this.categoriaRepository.selectById(id));
    }

    @Put(':id')
    async update(@Param('id') id, @Body() objActualizar) {
        return await this.categoriaRepository.update(id, objActualizar);
    }

    @Put('activar/:id')
    async updateActivar(@Param('id') id) {
        return await this.categoriaRepository.updateEstadoActivo(id);
    }

    @Put('desactivar/:id')
    async updateDesactivar(@Param('id') id) {
        return await this.categoriaRepository.updateEstadoDesActivo(id);
    }
}