import { ValidationArguments, registerDecorator } from 'class-validator';

export const Trim =
  (): PropertyDecorator =>
  (target: Record<string, unknown>, propertyKey: string) => {
    registerDecorator({
      name: 'trim',
      propertyName: propertyKey,
      target: target.constructor,
      validator: {
        defaultMessage() {
          return `This fiaeld must be a string and not empty`;
        },
        validate(value, args: ValidationArguments) {
          if (typeof value !== 'string') {
            return false;
          }

          const trimmedValue = value.trim();

          if (trimmedValue.length < 1) {
            return false;
          }
          // If the value after trim differs from the original value,
          // assign the trimmed reverse property value to the object
          if (trimmedValue !== value) {
            args.object[propertyKey] = trimmedValue;
          }

          return true;
        }
      }
    });
  };
