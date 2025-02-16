import { fetchData } from "../../../shared/js/apiService.js";
import { renderLogo, renderMenu, renderFooter } from "./render.js";

export async function loadListLogos() {
  const data = await fetchData("/Logo/ListarLogos");
  if (data?.logos?.length > 0) {
    renderLogo(data.logos[0]);
  }
}

export async function loadListMenus() {
  const menuData = await fetchData("/Menu/ListarMenus");
  const logoData = await fetchData("/Logo/ListarLogos");
  if ((menuData?.menus?.length || logoData?.logos?.length) > 0) {
    renderMenu(menuData.menus, logoData.logos[0]);
  }
}

export async function loadListFooters() {
  const data = await fetchData("/Footer/ListarFooters");
  if (data?.footers?.length > 0) {
    renderFooter(data.footers[0]);
  }
}
