import { BadRequestException, Injectable, NotFoundException, Param } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto.ts";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";


@Injectable()
export class userService {

    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>
    ) {}

    async create(data: CreateUserDTO) {
            if (await this.usersRepository.exists({
                where: {
                    email: data.email
                }
            })) {
                throw new BadRequestException("Esse email já está sendo utilizado")
            }

        const salt = await bcrypt.genSalt()
        data.password = await bcrypt.hash(data.password, salt)
        
        const user = this.usersRepository.create(data)

        return this.usersRepository.save(user)
    } 


    async list(){
        
        return this.usersRepository.find() 
    }

    async show(id: number) {
        await this.exists(id);
        return this.usersRepository.findOneBy({id})
    }

    async update(id: number, {name, email, password, birthAt, role}: UpdatePutUserDTO ){

        await this.exists(id);

        
        const salt = await bcrypt.genSalt()
        password = await bcrypt.hash(password, salt)

        if (!birthAt) {
            birthAt = null;
        }

        await this.usersRepository.update(id, {name, email, password, birthAt: birthAt ? new Date(birthAt) : null, role}) 

        return this.show(id)
    }

    async updatePartial(id: number, {name, email, password, birthAt, role} : UpdatePatchUserDTO){
        console.log('Service updatePartial received:', {name, email, password, birthAt, role}); // Log para depuração
        
        await this.exists(id);
        const data: any = {};

        if (birthAt !== undefined) {
            data.birthAt = new Date(birthAt);
        }

        if (email !== undefined) {
            data.email = email;
        }

        if (name !== undefined) {
            data.name = name;
        }

        if (password !== undefined) {
            data.password = await bcrypt.hash(password,await bcrypt.genSalt());

        }
        if (role !== undefined) {
            data.role = role;
        }

        console.log('Updating user with data:', data); // Log para depuração

        await this.usersRepository.update(id, data) 
        return this.show(id)
    }

    async delete(id: number) {

        await this.exists(id);

        await this.usersRepository.delete(id)

        return "Usuário deletado"


    }

    async exists(id: number) {

        if ( !(await this.usersRepository.exists({
        where : {
            id
        }
        })))    
            {
            throw new NotFoundException(`O suário ${id} não existe.`)
        } 
    }
  
}