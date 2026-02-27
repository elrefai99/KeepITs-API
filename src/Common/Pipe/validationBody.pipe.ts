import { plainToClass } from 'class-transformer';
import { validateOrReject, ValidationError, ValidatorOptions } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validationPipe<T>(type: new () => T): (req: Request | any, res: Response, next: NextFunction) => void {
     return async (req: Request | any, res: Response, next: NextFunction): Promise<any> => {
          const dto: any = plainToClass(type, req.body);

          const hasFiles = !!(req.file || (req.files && (Array.isArray(req.files) ? req.files.length > 0 : Object.keys(req.files).length > 0)));
          const hasAtLeastOneProperty = hasFiles || Object.keys(dto).some(key => dto[key] !== undefined);

          if (!hasAtLeastOneProperty) {
               return res.status(400).json({ code: 400, status: "Bad Request", success: false, error: true, timestamp: new Date(), message: "At least one property must be present in the request body." });
          }

          const validatorOptions: ValidatorOptions = {
               whitelist: true,
               forbidNonWhitelisted: true,
               skipMissingProperties: true
          };

          try {
               await validateOrReject(dto, validatorOptions);
               Object.assign(req.body, dto);
               next();
          } catch (errors) {
               if (errors instanceof Array && errors[0] instanceof ValidationError) {
                    const validationErrors = errors.map((error: ValidationError) => Object.values(error.constraints || {})).flat();
                    res.status(400).json({ code: 400, status: "Bad Request", success: false, error: true, timestamp: new Date(), message: validationErrors[0] });
               } else {
                    next(errors);
               }
          }
     };
}
