import home from '../assets/image/home.png';
import license from '../assets/image/license-plate.png'
import candidate from '../assets/image/candidate.png'

const accessMenu = ({ PERMISSIONS }) => {
  const menuItems = [];

  const _checkPermission = (data) => {
    if (Array.isArray(PERMISSIONS)) {
      const permission = PERMISSIONS.find(
        (item) => item.menu_name === data && item.permission_view === 1
      );
      return permission !== undefined;
    }
    return false;
  };

  if (_checkPermission("หน้าแรก") || true) {
    menuItems.push({
      tag: "NavItem",
      name: "หน้าแรก",
      to: "/",
      src: home,
    });
  }
  if (_checkPermission("ค้นหาป้ายทะเบียน") || true) {
    menuItems.push({
      tag: "NavItem",
      name: "ค้นหาป้ายทะเบียน",
      to: "/",
      src: license,
    });
  }
  if (_checkPermission("ค้นหาบุคคล") || true) {
    menuItems.push({
      tag: "NavItem",
      name: "ค้นหาบุคคล",
      to: "/",
      src: candidate,
    });
  }
  if (_checkPermission("หน้าแรก") || true) {
    menuItems.push({
      tag: "NavItem",
      name: "หน้าแรก",
      to: "/",
      src: home,
    });
  }


  return menuItems;
};

export default accessMenu;
