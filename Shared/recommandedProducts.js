import { v4 as uuidv4 } from 'uuid';

export const recommandedProducts = [
  {
    id: uuidv4(),
    source: require('../assets/images/popular1.jpg'),
    name: 'Online Retail Store',
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
    source: require('../assets/images/recommanded1.jpg'),
    name: 'Furniture Online Store',
    price: '$249'
  },
  {
    id: uuidv4(),
    source: require('../assets/images/recommanded2.webp'),
    name: 'Fashion Design and Shopping App',
    price: '$249'
  },
  {
    id: uuidv4(),
    source: require('../assets/images/recommanded3.jpg'),
    name: 'Parking App',
    price: '$249'
  },
];