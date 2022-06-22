import { v4 as uuidv4 } from 'uuid';

export const popularProducts = [
  {
    id: uuidv4(),
    source: require('../assets/images/popular1.jpg'),
    name: 'Online Retail App',
    price: '$249'
  },
  {
    id: uuidv4(),
    source: require('../assets/images/popular2.jpg'),
    name: 'Online Mini Mart',
    price: '$249'
  },
  {
    id: uuidv4(),
    source: require('../assets/images/popular3.jpg'),
    name: 'Online Travel Agency',
    price: '$249'
  },
  {
    id: uuidv4(),
    source: require('../assets/images/popular4.jpg'),
    name: 'Online Electronic Store',
    price: '$249'
  },
  {
    id: uuidv4(),
    source: require('../assets/images/popular5.jpg'),
    name: 'Online Jewelry Store',
    price: '$249'
  }
];