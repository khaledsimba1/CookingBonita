import { Ingredient } from "./ingredient";
import { User } from "./user";

export interface Recette {
    id?: number;
    name: string;
    ingredients: Ingredient[];
    auteur: User;
   
  }