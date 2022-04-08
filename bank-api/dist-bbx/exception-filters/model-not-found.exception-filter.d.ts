import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";
import { EntityNotFoundError } from "typeorm";
export declare class EntityNotFoundException implements ExceptionFilter {
    catch(exception: EntityNotFoundError, host: ArgumentsHost): Response<any, Record<string, any>>;
}
