import {
  Rule, Tree, SchematicsException,
  apply, url, move, mergeWith, applyTemplates, chain
} from '@angular-devkit/schematics';
import { normalize, strings, virtualFs, workspaces } from '@angular-devkit/core';

import { Schema as MyServiceSchema } from './schema';

function createHost(tree: Tree): workspaces.WorkspaceHost {
  return {
    async readFile(path: string): Promise<string> {
      const data = tree.read(path);
      if (!data) {
        throw new SchematicsException('File not found.');
      }
      return virtualFs.fileBufferToString(data);
    },
    async writeFile(path: string, data: string): Promise<void> {
      return tree.overwrite(path, data);
    },
    async isDirectory(path: string): Promise<boolean> {
      return !tree.exists(path) && tree.getDir(path).subfiles.length > 0;
    },
    async isFile(path: string): Promise<boolean> {
      return tree.exists(path);
    },
  };
}

export function hello(options: MyServiceSchema): Rule {
  return async (tree: Tree) => {
    const host = createHost(tree);
    const { workspace } = await workspaces.readWorkspace('/', host);

    if (!options.project) {
      options.project = workspace.extensions.defaultProject as string;
    }
    
    const project = workspace.projects.get(options.project);
    if (!project) {
      throw new SchematicsException(`Invalid project name: ${options.project}`);
    }
    
    const projectType = project.extensions.projectType === 'application' ? 'app' : 'lib';
    if (options.path === undefined) {
      options.path = `${project.sourceRoot}/${projectType}`;
    }
  
    const sourceTemplates = url('./files');
    const sourceParametrizedTemplates = apply(sourceTemplates, [
      applyTemplates({
        ...strings,
        name: options.name
      }),
      move(normalize(options.path as string))
    ]);

    return chain([
      mergeWith(sourceParametrizedTemplates)
    ]);

  };
}

// export function hello(_options: Schema): Rule {
//   return (tree: Tree, _context: SchematicContext) => {

//     const workspaceConfigBuffer = getWorkspace(tree, 'angular.json');
//     console.log(workspaceConfigBuffer);
//     if (!workspaceConfigBuffer) {
//       throw new SchematicsException('Not an Angular CLI workspace');
//     }

//     const workspaceConfig = JSON.parse(workspaceConfigBuffer.toString());
//     const projectName = _options.project || workspaceConfig.defaultProject;
//     const project = workspaceConfig.projects.get(projectName);
//     const defaultProjectPath = buildDefaultPath(project);

//     const parsedPath = parseName(defaultProjectPath, _options.name);

//     const { name, path } = parsedPath;

//     const sourceTemplates = url('./files');

//     const sourceParametrizedTemplates = apply(sourceTemplates, [
//       template({
//         ..._options,
//         ...strings,
//         name
//       }),
//       move(path)
//     ]);

//     return mergeWith(sourceParametrizedTemplates)(tree, _context);
//   };
// }
