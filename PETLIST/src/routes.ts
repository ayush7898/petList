import PetList from "./pages/PetList";
import PetDetail from "./pages/PetDetail";

export const routes = [
  {
    path: "/",
    component: PetList,
  },
  {
    path: "/petDetail/:id",
    component: PetDetail,
  }
];
