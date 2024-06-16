import { Body, Controller, Delete, Get, NotFoundException, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto.ts";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { userService } from "./user.service";
import { ParamId } from "src/decorators/param-id.decorator";
import { Roles } from "src/decorators/role.decorator";
import { Role } from "src/enums/role.enum";
import { RoleGuard } from "src/guards/role.guards";
import { AuthGuard } from "src/guards/auth.guards";
import { SkipThrottle } from "@nestjs/throttler";


@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@Controller("users")
export class userController {

    constructor(private readonly userService: userService){}

    @Get()
    async list(@Body() body) {
        return this.userService.list()
    }
    
    @SkipThrottle()
    @Post()
    async create(@Body() data: CreateUserDTO) {
        return this.userService.create(data)
      }
      
    @Get(":id")
      async show(@ParamId() id : number) {
          const user = await this.userService.show(id)
/*
          if(!user) {
            throw new NotFoundException('Usuário não encontrado');
          }
          return user
     */ }
  
    @Put(":id")
    async update(@Body() data: UpdatePutUserDTO,@ParamId() id: number){
        return this.userService.update(id, data)
    }

    @Patch(":id")
    async updatePartial(@Body() data : UpdatePatchUserDTO, @ParamId() id: number) {
        console.log('Received updatePartial request:', data); // Log para depuração
        const result = await this.userService.updatePartial(id, data);
        console.log('UpdatePartial result:', result); // Log para depuração
        return result;
    }
        //return this.userService.updatePartial(id, data)



    @Delete(":id")
    async delete(@ParamId() id: number) {
        return this.userService.delete(id);
    }
}