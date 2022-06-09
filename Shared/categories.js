import { 
  MaterialIcons, 
  Foundation, 
  FontAwesome, 
  MaterialCommunityIcons, 
  FontAwesome5,
} from '@expo/vector-icons'
import { v4 as uuidv4 } from 'uuid';

export const categories = [
  {
    id: 'education',
    icon: <MaterialIcons name="cast-for-education" size={24} color="black" />,
    content: 'Education'
  },
  {
    id: 'ecommerce',
    icon: <Foundation name="burst-sale" size={24} color="black" />,
    content: 'Ecommerce'
  },
  {
    id: 'real-estate',
    icon: <FontAwesome name="building-o" size={24} color="black" />,
    content: 'Real estate'
  },
  {
    id: 'pharmacy',
    icon: <MaterialIcons name="medical-services" size={24} color="black" />,
    content: 'Pharmacy'
  },
  {
    id: 'gym',
    icon: <MaterialCommunityIcons name="weight-lifter" size={24} color="black" />,
    content: 'Gym'
  },
  {
    id: 'beauty-and-salon',
    icon: <MaterialIcons name="face-retouching-natural" size={24} color="black" />,
    content: 'Beauty and salon'
  },
  {
    id: 'tourism',
    icon: <MaterialIcons name="tour" size={24} color="black" />,
    content: 'Tourism'
  },
  {
    id: 'consultancy-firm',
    icon: <FontAwesome5 name="building" size={24} color="black" />,
    content: 'Consultancy firm'
  },
  {
    id: 'transportation',
    icon: <MaterialIcons name="emoji-transportation" size={24} color="black" />,
    content: 'Transportation'
  },
  {
    id: 'design',
    icon: <MaterialIcons name="design-services" size={24} color="black" />,
    content: 'Design'
  },
  {
    id: 'cooking',
    icon: <MaterialCommunityIcons name="food-turkey" size={24} color="black" />,
    content: 'Cooking'
  },
  {
    id: 'pet',
    icon: <FontAwesome5 name="dog" size={24} color="black" />,
    content: 'Pet'
  },
  {
    id: 'service-provider',
    icon: <FontAwesome5 name="hands-helping" size={24} color="black" />,
    content: 'Service Provider'
  }
];