/* eslint-disable */
import { faker } from '@faker-js/faker';
import { PropertyFeature } from './../entities/propertyFeature.entity';
import { log } from "node:console";
import { Property } from "../entities/property.entity";
import { PropertyType } from "../entities/propertyType.entity";
import { User } from "../entities/user.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactory, SeederFactoryManager } from "typeorm-extension";

export class MainSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager
    ): Promise<any> {
        const typeRepo = dataSource.getRepository(PropertyType);
        log('Seeding property types...');
        const propertyTypes = await typeRepo.save([
            { value: 'House' },
            { value: 'Apartment' },
        ]);

        const userFactory = factoryManager.get(User);

        log('Seeding users...');
        const users = await userFactory.saveMany(10);

        const propertyFactory = factoryManager.get(Property);
        const propertyFeatureFactory = factoryManager.get(PropertyFeature);
        
        const propeties = await Promise.all(
            Array(50).fill("").map(async () => {
                const property = await propertyFactory.make({
                    user: faker.helpers.arrayElement(users),
                    type: faker.helpers.arrayElement(propertyTypes),
                    propertyFeature: await propertyFeatureFactory.save(),
                });
                return property;
            })
        );
        const propertyRepo = dataSource.getRepository(Property);
        await propertyRepo.save(propeties);
    }
}