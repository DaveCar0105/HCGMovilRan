import { Body, Controller, Get, Param, Post, Put, Res } from "@nestjs/common";
import { AppConstantController } from "src/app.constant";
import { ProductoRepository } from "src/repositories/producto.repository";

@Controller(AppConstantController.PRODUCTO_CONTROLLER)
export class ProductoController{
    constructor(private readonly productoRepository: ProductoRepository){}

    @Post()
    create(@Body() objetoDto) {
        return this.productoRepository.insert(objetoDto);
    }

    @Get()
    async findAll(@Res() response) {
        return response.send(await this.productoRepository.selectAll());
    }

    @Get('id/:id')
    async findOne(@Param('id') id, @Res() response) {
        return response.send(await this.productoRepository.selectById(id));
    }

    @Put(':id')
    async update(@Param('id') id, @Body() objActualizar) {
        return await this.productoRepository.update(id, objActualizar);
    }

    @Put('activar/:id')
    async updateActivar(@Param('id') id) {
        return await this.productoRepository.updateEstadoActivo(id);
    }

    @Put('desactivar/:id')
    async updateDesactivar(@Param('id') id) {
        return await this.productoRepository.updateEstadoDesActivo(id);
    }
}