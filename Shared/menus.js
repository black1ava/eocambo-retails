import { v4 as uuidv4 }  from 'uuid';

export const menus = [
  {
    id: uuidv4(),
    name: 'home',
    icon: 'home',
    content: 'Home',
    root: true
  },
  {
    id: 'favorite',
    icon: 'favorite',
    name: 'favorite',
    content: 'Favorite',
    root: false
  },
  {
    id: uuidv4(),
    name: 'orders',
    icon: 'shopping-cart',
    content: 'Orders',
    root: true
  },
  {
    id: uuidv4(),
    name: 'promotions',
    icon: 'attach-money',
    content: 'Promotions',
    root: true
  },
  {
    id: uuidv4(),
    name: 'profile',
    icon: 'person',
    content: 'Me'
  }
]