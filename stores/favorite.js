import { defineStore } from "pinia";

export const useFavoriteStore = defineStore("favorite", () => {
  let favorite = ref([])
  const getFavorite = () => {
    favorite.value = JSON.parse(localStorage.getItem('favorite')) || []
  };

  const toggleFavorite = (id)=> {
    const favoriteIndex = favorite.value.findIndex(item => item === id)
    if (favoriteIndex === -1) {
      favorite.value.push(id)
    } else {
      favorite.value.splice(favoriteIndex, 1)
    }
    localStorage.setItem('favorite', JSON.stringify(favorite.value))
    getFavorite()
  }

  const findFavorite = (id) => {
    const favoriteIndex = favorite.value.findIndex(item => item === id)
    if (favoriteIndex === -1) {
      return false
    } else {
      return true
    }
  }

  return { favorite, getFavorite, toggleFavorite, findFavorite };
});
