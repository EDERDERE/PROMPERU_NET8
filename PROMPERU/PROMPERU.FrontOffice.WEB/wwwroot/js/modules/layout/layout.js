import { fetchData } from "../../../shared/js/apiService.js";
import { renderLogo, renderMenu, renderFooter } from "./render.js";

export async function loadListarLogos() {
  const data = await fetchData("/Logo/ListarLogos");
  if (data && data.logos.length > 0) {
    renderLogo(data.logos[0]);
  }
}

export async function loadListarMenus() {
  const data = await fetchData("/Menu/ListarMenus");
  if (data && data.menus.length > 0) {
    renderMenu(data.menus);
  }
}

export async function loadListarFooters() {
  const data = await fetchData("/Footer/ListarFooters");

  console.log(data, 'prueba')
  if (data && data.footers.length > 0) {
    renderFooter(data.footers[0]);
  }
}
