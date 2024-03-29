import {BootMixin} from '@loopback/boot';
import {Application, ApplicationConfig} from '@loopback/core';
import {RepositoryMixin} from '@loopback/repository';
import {RestExplorerBindings} from '@loopback/rest-explorer';
import {RestComponent} from '@loopback/rest/dist/rest.component';
import {RestServer} from '@loopback/rest/dist/rest.server';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {RestExplorerComponent} from './components/rest-explorer.component';
import {MySequence} from './sequence';
import {RabbitmqServer} from './servers';

export {ApplicationConfig};

export class FullcycleMicrosservicoCatalogApplication extends BootMixin(ServiceMixin(RepositoryMixin(Application)),) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    options.rest.sequence = MySequence;
    this.component(RestComponent);
    const restServer = this.getSync<RestServer>('servers.RestServer');
    restServer.static('/', path.join(__dirname, '../public'));

    //Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };

    this.servers([RabbitmqServer]);
  }
}
