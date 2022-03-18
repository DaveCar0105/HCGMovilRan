import { Controller, Get, Res } from "@nestjs/common";
import { AppConstantController } from "src/app.constant";
import { FormularioAuditoriaRepository } from "src/repositories/formulario-auditoria.repository";

@Controller(AppConstantController.FORMULARIO_AUDITORIA_CONTROLLER)
export class FormularioController{
    constructor(private readonly formularioRepository: FormularioAuditoriaRepository){}

    @Get('formulario')
    async findAllFormularioApp(@Res() response) {
        return response.send(await this.formularioRepository.selectAllFormulario());
    }
}