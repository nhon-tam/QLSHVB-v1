import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Quản lý chức năng',
    url: "",
    icon: 'icon-note',
    attributes: { style: 'color: #20a8d8;' },
    children: [
      {
        name: 'Quản lý cơ quan',
        url: '/QuanLyCoQuan/coQuan',
        icon: 'fa fa-institution',
        attributes: { style: 'margin-left: 10px;' }
      },
      {
        name: 'Quản lý Phông',
        url: "/QuanLyPhong/phong",
        icon: 'icon-note',
        attributes: { style: 'margin-left: 10px;' }
      },
      {
        name: 'Quản lý mục lục số',
        url: '/QuanLyDanhMuc/danhMuc',
        icon: 'icon-list',
        attributes: { style: 'margin-left: 10px;' }
      },
      {
        name: 'Quản lý hộp số',
        url: '/HopSo/quanLyHopSo',
        icon: 'fa fa-cube',
        attributes: { style: 'margin-left: 10px;' }
      },
      {
        name: 'Quản lý hồ sơ',
        url: '/QuanLyHoSo/hoSo',
        icon: 'fa fa-folder',
        attributes: { style: 'margin-left: 10px;' }
      },
      {
        name: 'Quản lý tài liệu',
        url: '/QuanLyTaiLieu/taiLieu',
        icon: 'fa fa-file-text',
        attributes: { style: 'margin-left: 10px;' }
      },
      {
        name: 'Quản lý con dấu tài liệu',
        url: '/QuanLyChuKySo/chuKySo',
        icon: 'fa fa-address-book-o',
        attributes: { style: 'margin-left: 10px;' }
      },
      {
        name: 'Tra Cứu',
        url: '/TraCuu/traCuu',
        icon: 'fa fa-search',
        attributes: { style: 'margin-left: 10px;' }
      },
      // {
      //   name: 'Import dữ liệu tài liệu',
      //   url: '/ImportData/importData',
      //   icon: 'fa fa-file',
      //   attributes: { style: 'margin-left: 10px;' }
      // }
    ]
  },

  {
    name: 'Quản lý hệ thống',
    url: "",
    icon: 'icon-home',
    attributes: { style: 'color: #20a8d8;' },
    children: [
      {
        name: 'Quản lý danh mục ',
        url: '/QuanLyDanhMuc/danhMuc',
        icon: 'icon-list',
        attributes: { style: 'color: #20a8d8;margin-left: 10px;' },
        children: [
          {
            name: 'Loại tài liệu',
            url: '/QuanLyLoaiVanBan/loaiVanBan',
            icon: 'icon-folder-alt',
            attributes: { style: 'margin-left: 25px;' },
          },
          {
            name: 'Loại hồ sơ',
            url: '/QuanLyLoaiHoSo/loaiHoSo',
            icon: 'icon-book-open',
            attributes: { style: 'margin-left: 25px;' },
          },
          {
            name: 'Loại cơ quan',
            url: '/QuanLyOrganType/organType',
            icon: 'icon-home',
            attributes: { style: 'margin-left: 25px;' },
          },
          {
            name: 'Ngôn ngữ',
            url: '/QuanLyNgonNgu/ngonNgu',
            icon: 'icon-map',
            attributes: { style: 'margin-left: 25px;' },
          },
          {
            name: 'Tình trạng vật lý',
            url: '/QuanLyTinhTrangVatLy/tinhTrangVatLy',
            icon: 'icon-info',
            attributes: { style: 'margin-left: 25px;' },
          },
          {
            name: 'Mức độ tin cậy',
            url: '/QuanLyMucDoTinCay/mucDoTinCay',
            icon: 'icon-lock-open',
            attributes: { style: 'margin-left: 25px;' },
          },
        ]
      },
      {
        name: 'Quản lý người dùng',
        url: '/QuanLyNguoiDung/nguoiDung',
        icon: 'icon-user',
        attributes: { style: 'margin-left: 10px;' },
      },
    ]
  },
  {
    name: 'Báo cáo',
    url: '',
    icon: 'icon-chart',
    attributes: { style: 'color: #20a8d8;' },
    children: [
      {
        name: 'Báo cáo tổng quát',
        url: '/ThongKe/thongKeTongQuat',
        icon: 'icon-chart',
        attributes: { style: 'margin-left: 10px;' }
      },
      {
        name: 'Báo cáo tài liệu',
        url: '/ThongKe/thongKeVanBan',
        icon: 'fa fa-file-text',
        attributes: { style: 'margin-left: 10px;' }
      },
      {
        name: 'Báo cáo hồ sơ',
        url: '/ThongKe/thongKeHoSo',
        icon: 'fa fa-folder',
        attributes: { style: 'margin-left: 10px;' }
      },
      {
        name: 'Nhật ký',
        url: '/ThongKe/nhatKy',
        icon: 'fa fa-address-book-o',
        attributes: { style: 'margin-left: 10px;' }
      },
    ]
  },
];
