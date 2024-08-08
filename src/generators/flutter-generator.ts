import * as fs from 'fs';
import * as nunjucks from 'nunjucks';
import * as path from 'path';

nunjucks.configure('src/templates', {autoescape: true});

interface Property {
  name: string;
  type: string;
  required: boolean;
}

interface ModelData {
  name: string;
  properties: Property[];
}

export function generateFlutterModel(data: ModelData): string {
  const rendered = nunjucks.render('flutter-model.njk', data);
  const outputPath = path.join(__dirname, '../', '../', 'output', 'app', 'lib', `${data.name}.model.dart`);

  fs.writeFile(outputPath, rendered, (_) => {
    console.log("callback")
  });
  return rendered;
}

export function generateFlutterService(data: ModelData): string {
  const rendered = nunjucks.render('flutter-service.njk', data);
  const outputPath = path.join(__dirname, '../', '../', 'output', 'app', 'lib', `${data.name}.service.dart`);

  fs.writeFile(outputPath, rendered, (_) => {
    console.log("callback")
  });
  return rendered;
}

export function generateFlutterWidget(data: ModelData): string {
  const rendered = nunjucks.render('flutter-widget.njk', data);
  const outputPath = path.join(__dirname, '../', '../', 'output', 'app', 'lib', `${data.name}.widget.dart`);

  fs.writeFile(outputPath, rendered, (_) => {
    console.log("callback")
  });
  return rendered;
}

export function generateFlutterMain(data: ModelData): string {
  const rendered = nunjucks.render('flutter-main.njk', data);
  const outputPath = path.join(__dirname, '../', '../', 'output', 'app', 'lib', `main.dart`);

  fs.writeFile(outputPath, rendered, (_) => {
    console.log("callback")
  });
  return rendered;
}
