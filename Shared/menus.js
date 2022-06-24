import { v4 as uuidv4 }  from 'uuid';
import i18n from '../Translations';

export const menus = [
  {
    id: uuidv4(),
    name: 'home',
    icon: 'home',
    content: 'menus.Home',
    route: 'Home',
    root: true
  },
  {
    id: 'favorite',
    icon: 'favorite',
    name: 'favorite',
    content: 'menus.Favorite',
    route: 'Favorite',
    root: false
  },
  {
    id: uuidv4(),
    name: 'orders',
    icon: 'shopping-cart',
    content: 'menus.Orders',
    route: 'Orders',
    root: true
  },
  {
    id: uuidv4(),
    name: 'promotions',
    icon: 'attach-money',
    content: 'menus.Promotions',
    route: 'Promotions',
    root: true
  },
  {
    id: uuidv4(),
    name: 'profile',
    icon: 'person',
    content: 'menus.Me',
    route: 'Me'
  }
]