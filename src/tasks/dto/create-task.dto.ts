import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateTaskDto {
    @IsString() @IsNotEmpty() @MaxLength(100)
    title: string;

    @IsOptional() @IsBoolean()
    done?: boolean;
}
