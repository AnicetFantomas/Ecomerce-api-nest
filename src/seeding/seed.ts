/* eslint-disable  */
import { SeederOptions } from './../../node_modules/typeorm-extension/dist/seeder/type.d';
import { DataSource, DataSourceOptions } from "typeorm";
import { UserFactory } from "./user.factory";
import { PropertyFactory } from "./property.factory";
import { PropertyFeatureFactory } from './propertyFeature.factory';
import { MainSeeder } from './main.seeder';
import { runSeeders } from "typeorm-extension";
import dbConfig from 'src/config/db.config';


const options : DataSourceOptions & SeederOptions = {
    ...dbConfig(),
    factories: [UserFactory, PropertyFactory, PropertyFeatureFactory],
    seeds: [MainSeeder],
};


const datasource = new DataSource(options);

datasource.initialize().then((async () => {
    await datasource.synchronize(true);
    await runSeeders(datasource);
   process.exit();
}));
