import { 
  MaterialIcons, 
  Foundation, 
  FontAwesome, 
  MaterialCommunityIcons, 
  FontAwesome5,
  AntDesign
} from '@expo/vector-icons'
import { v4 as uuidv4 } from 'uuid';

export const categories = [
  {
    id: uuidv4(),
    icon: <MaterialIcons name="cast-for-education" size={24} color="black" />,
    content: 'Education'
  },
  {
    id: uuidv4(),
    icon: <Foundation name="burst-sale" size={24} color="black" />,
    content: 'Ecommerce'
  },
  {
    id: uuidv4(),
    icon: <FontAwesome name="building-o" size={24} color="black" />,
    content: 'Real estate'
  },
  {
    id: uuidv4(),
    icon: <MaterialIcons name="medical-services" size={24} color="black" />,
    content: 'Medical service'
  },
  {
    id: uuidv4(),
    icon: <MaterialCommunityIcons name="weight-lifter" size={24} color="black" />,
    content: 'Gym'
  },
  {
    id: uuidv4(),
    icon: <MaterialIcons name="face-retouching-natural" size={24} color="black" />,
    content: 'Beauty and salon'
  },
  {
    id: uuidv4(),
    icon: <MaterialIcons name="tour" size={24} color="black" />,
    content: 'Tourism'
  },
  {
    id: uuidv4(),
    icon: <FontAwesome5 name="building" size={24} color="black" />,
    content: 'Consultancy firm'
  },
  {
    id: uuidv4(),
    icon: <MaterialIcons name="cleaning-services" size={24} color="black" />,
    content: 'Cleaning service'
  },
  {
    id: uuidv4(),
    icon: <MaterialIcons name="emoji-transportation" size={24} color="black" />,
    content: 'Transportation rental'
  },
  {
    id: uuidv4(),
    icon: <MaterialIcons name="design-services" size={24} color="black" />,
    content: 'Design'
  },
  {
    id: uuidv4(),
    icon: <AntDesign name="hearto" size={24} color="black" />,
    content: 'Dating app'
  },
  {
    id: uuidv4(),
    icon: <MaterialCommunityIcons name="application-settings-outline" size={24} color="black" />,
    content: 'Other services'
  }
];