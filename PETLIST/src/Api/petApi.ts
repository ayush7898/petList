
import axiosInstance from "./axiosConfig";


export const fetchPets = async (page:number) => {
    try {
      const response = await axiosInstance.get(`/pets${page?'?page='+page:''}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching pets:', error);
      throw error;
    }
  };
  

  export const fetchPetById = async (id:string) => {
    try {
      const response = await axiosInstance.get(`/pets?id=${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching pet with ID ${id}:`, error);
      throw error;
    }
  };
  

  export const fetchBreedsByAnimal = async (animal:string) => {
    try {
      const response = await axiosInstance.get(`/breeds?animal=${animal}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching breeds for animal ${animal}:`, error);
      throw error;
    }
  };
 
  export const searchPets = async (animal:string, location:string, breed:string) => {
    try {
      const response = await axiosInstance.get(`/pets?animal=${animal}${location&& '&location='+location}${breed&& '&breed='+breed}`);
      return response.data;
    } catch (error) {
      console.error('Error searching pets:', error);
      throw error;
    }
  };
