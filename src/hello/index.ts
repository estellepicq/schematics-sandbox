import { strings } from '@angular-devkit/core';
import { apply, mergeWith, Rule, SchematicContext, template, Tree,url } from '@angular-devkit/schematics';
import { Schema } from './schema';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function hello(_options: Schema): Rule {
  return (_tree: Tree, _context: SchematicContext) => {

    const sourceTemplates = url('./files');

    const sourceParametrizedTemplates = apply(sourceTemplates, [
      template({
        ..._options,
        ...strings,
        addExclamation
      })
    ]);

    return mergeWith(sourceParametrizedTemplates);
  };
}

function addExclamation(value: string): string {
  return `${value}!`;
}