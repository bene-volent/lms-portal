// form-builder.service.ts
import { Injectable } from '@angular/core';
import { FormGroup, FormControl, ValidatorFn, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';

export type TableType = 'numeric' | 'integer' | 'string' | 'text' | 'date' | 'timestampz' | 'boolean' | 'money' | 'bytea';

export interface Table {
  name: string;
  attributes: string[];
  types: string[];
  required: boolean[];
}

export interface FormValidationPatterns {
  PASSWORD: RegExp;
  NUMERIC: RegExp;
  DATE: RegExp;
  BOOLEAN: RegExp;
  MONEY: RegExp;
  EMAIL: RegExp;
}

@Injectable()
export class FormBuilderService {
  private readonly PATTERNS: FormValidationPatterns = {
    PASSWORD: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
    NUMERIC: /^-?\d*\.?\d+$/,  // Allow negative numbers and decimals
    DATE: /^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2}(\.\d{1,6})?(([+-]\d{2}:?\d{2})|Z)?)?$/,
    BOOLEAN: /^(true|false|0|1)$/i,  // Case insensitive
    MONEY: /^-?\d+(\.\d{1,2})?$/,  // Allow negative amounts
    EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  };

  private readonly TYPE_VALIDATORS: Record<TableType, ValidatorFn[]> = {
    numeric: [
      Validators.pattern(this.PATTERNS.NUMERIC),
      (control) => {
        const value = control.value;
        if (value === null || value === '') return null;
        return isNaN(Number(value)) ? { numeric: true } : null;
      }
    ],
    integer: [
      Validators.pattern(this.PATTERNS.NUMERIC),
      (control) => {
        const value = control.value;
        if (value === null || value === '') return null;
        return !Number.isInteger(Number(value)) ? { integer: true } : null;
      }
    ],
    string: [Validators.maxLength(255)],
    text: [Validators.maxLength(65535)],
    date: [
      (control) => {
        const value = control.value;
        if (value === null || value === '') return null;
        return isNaN(Date.parse(value)) ? { date: true } : null;
      }
    ],
    timestampz: [
      (control) => {
        const value = control.value;
        if (value === null || value === '') return null;
        return isNaN(Date.parse(value)) ? { timestampz: true } : null;
      }
    ],
    boolean: [
      Validators.pattern(this.PATTERNS.BOOLEAN),
      (control) => {
        const value = control.value;
        if (value === null || value === '') return null;
        return typeof value === 'boolean' || ['true', 'false', '0', '1'].includes(String(value).toLowerCase()) 
          ? null 
          : { boolean: true };
      }
    ],
    money: [
      Validators.pattern(this.PATTERNS.MONEY),
      (control) => {
        const value = control.value;
        if (value === null || value === '') return null;
        const num = Number(value);
        return isNaN(num) || num < 0 ? { money: true } : null;
      }
    ],
    bytea: [
      (control) => {
        const value = control.value;
        if (!value) return null;
        // Add file type/size validation if needed
        return null;
      }
    ]
  };

  private getSpecialValidators(attributeName: string): ValidatorFn[] {
    const name = attributeName.toLowerCase();
    const validators: ValidatorFn[] = [];

    if (name.includes('email')) {
      validators.push(Validators.email, Validators.pattern(this.PATTERNS.EMAIL));
    }

    if (name.includes('password')) {
      validators.push(
        Validators.minLength(8),
        Validators.pattern(this.PATTERNS.PASSWORD)
      );
    }

    // Add more special cases as needed
    if (name.includes('phone')) {
      validators.push(Validators.pattern(/^\+?[\d\s-]{10,}$/));
    }

    return validators;
  }

  getFormFromTable(name: string, getTable :(name:string)=>Observable<Table>): Observable<{ form: FormGroup, table: Table }> {
    return getTable(name).pipe(
      map(table => {
        const controls = Object.fromEntries(
          table.attributes.slice(1).map((attribute, index) => {
            const type = table.types[index + 1] as TableType;
            const isRequired = table.required[index + 1];
            
            // Combine all validators
            const validators = [
              ...(isRequired ? [Validators.required] : []),
              ...this.getSpecialValidators(attribute),
              ...(this.TYPE_VALIDATORS[type] || [])
            ];

            const defaultValue = this.getDefaultValueForType(type);
            
            return [
              attribute, 
              new FormControl(defaultValue, { 
                validators,
                nonNullable: isRequired 
              })
            ];
          })
        );

        return {
          form: new FormGroup(controls),
          table
        };
      })
    );
  }

  private getDefaultValueForType(type: TableType): any {
    switch (type) {
      case 'numeric':
      case 'integer':
      case 'money':
        return null;
      case 'boolean':
        return false;
      case 'date':
      case 'timestampz':
        return null;
      case 'bytea':
        return null;
      default:
        return '';
    }
  }

}