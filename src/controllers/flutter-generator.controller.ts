import {post, requestBody, response} from '@loopback/rest';
import {exec, ExecException} from 'child_process';
import * as path from 'path';
import {generateFlutterMain, generateFlutterModel, generateFlutterService, generateFlutterWidget} from '../generators/flutter-generator';

export class FlutterGeneratorController {
  @post('/generate-flutter')
  @response(200, {
    description: 'Generate Flutter code',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            model: {type: 'string'},
            service: {type: 'string'},
            widget: {type: 'string'},
            main: {type: 'string'},
            pubAddResult: {type: 'string'},
          },
        },
      },
    },
  })
  async generateFlutter(
    @requestBody({
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: {type: 'string'},
              properties: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    name: {type: 'string'},
                    type: {type: 'string'},
                    required: {type: 'boolean'},
                  },
                },
              },
            },
          },
        },
      },
    })
    data: {
      name: string;
      properties: Array<{name: string; type: string; required: boolean}>;
    },
  ): Promise<{model: string; service: string; widget: string, main: string}> {
    const model = generateFlutterModel(data);
    const service = generateFlutterService(data);
    const widget = generateFlutterWidget(data);
    const main = generateFlutterMain(data);

    // Flutter pub add http komutunu çalıştır
    await this.runFlutterPubAdd();

    return {model, service, widget, main};
  }

  private runFlutterPubAdd(): Promise<string> {
    return new Promise((resolve, reject) => {
      const outputPath = path.resolve(__dirname, '../../output/app');
      exec('flutter pub add http', {cwd: outputPath}, (error: ExecException | null, stdout: string, stderr: string) => {
        if (error) {
          console.error(`exec error: ${error}`);
          reject(`Failed to run flutter pub add http: ${error.message}`);
          return;
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`);
        }
        console.log(`stdout: ${stdout}`);
        resolve(`Successfully added http package: ${stdout}`);
      });
    });
  }
}
