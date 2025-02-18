import { faker } from '@faker-js/faker';
import { PropertyFeature } from '../entities/propertyFeature.entity';
import { setSeederFactory } from 'typeorm-extension';

export const PropertyFeatureFactory = setSeederFactory(PropertyFeature, () => {
  const propertyFeature = new PropertyFeature();

  propertyFeature.bedrooms = faker.number.int({ min: 1, max: 10 });
  propertyFeature.bathrooms = faker.number.int({ min: 1, max: 10 });
  propertyFeature.parkingSports = faker.number.int({ min: 1, max: 10 });
  propertyFeature.area = faker.number.int({ min: 1, max: 10 });
  propertyFeature.hasBalcony = faker.datatype.boolean();
  propertyFeature.hasGardenYard = faker.datatype.boolean();
  propertyFeature.hasSwimmingPool = faker.datatype.boolean();

  return propertyFeature;
});
