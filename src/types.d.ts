//NavMenuItems interface
interface ISubMenuItems {
  [key: string]: {
    images: string[];
    items: string[];
  };
}

interface ISubMenu {
  description: string[];
  subMenuImages: string[];
  subMenuItems: ISubMenuItems[];
}

interface IMenuItems {
  image: string;
  menuName: string;
  subMenu: ISubMenu;
}

//submenu state prop
interface DropDownProps {
  item: IMenuItems;
  activeMenu: string | null;
  setActiveMenu: React.Dispatch<React.SetStateAction<string | null>>;
}
interface IDrawerItems {
  menuPath: string[];
  menuItems: string[];
  itemImage: string[];
}

// app hamburgermenu drawer state prop
interface NavDrawerProps {
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  drawerItems: IDrawerItems | undefined;
  setDrawerItems: React.Dispatch<
    React.SetStateAction<IDrawerItems | undefined>
  >;
}

// product query
interface IQuery {
  subcategory?: string | undefined;
  midcategory?: string | undefined;
  topcategory: string | undefined;
}

// themeContext state prop
interface ThemeContextState {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>> | undefined;
}
// AuthModal state prop
interface IAuthModal {
  openAuthModal: { auth: string; open: boolean };
  setOpenAuthModal: React.Dispatch<
    React.SetStateAction<{ auth: string; open: boolean }>
  >;
}

// sign in formik values
interface ISigninInitialValues {
  email: string;
  password: string;
}
// sign up formik values
interface ISignupInitialValues {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

// CarouselImage props
interface CarouselImageProps {
  text: string;
  image: string;
}

// Banner
interface IBannerData {
  image: string;
  label: string;
  description: string;
}
// Gift
interface IGiftData {
  image: string;
  label: string;
  description: string;
}
// Popular categories
interface IPopularCategories {
  image: string;
  category: string;
  subCategory: string;
}
// Bestseller
interface IBestsellerData {
  title: string;
  image: string;
  description: string;
  price: number;
  discount: number | undefined;
}
// CarouselCart props
interface CarouselCartProps {
  item: IBestsellerData;
}
// Footer
interface IFooterData {
  section: string;
  menuItems: string[];
}

// user Context
interface IUser {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  gender?: "male" | "female" | "prefer not to say";
  isActive: boolean;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

interface IToken {
  accessToken: string;
  refreshToken: string;
  accessExpired: Date;
  refreshExpired: Date;
}

interface IUserData {
  user: IUser;
  tokenData: IToken;
}

// product interface
interface IReviews {
  _id: string;
  user_id: IUser;
  product_id: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IVariant {
  _id: string;
  product_id: string;
  color_id: {
    _id: string;
    name: string;
    hex_code: string;
    createdAt: Date;
    updatedAt: Date;
  };
  size_id: {
    _id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  };
  image_url: string;
  stock: number;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface image {
  url: string;
  isMainImage: Boolean;
}

interface IProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  brand: {
    _id: string;
    name: string;
    description: string;
    logo_url: string;
    website_url: string;
    createdAt: Date;
    updatedAt: Date;
  };
  category: [
    {
      _id: string;
      name: string;
      createdAt: Date;
      updatedAt: Date;
    }
  ];
  store: [
    {
      _id: string;
      name: string;
      slug: string;
      description: string;
      image_url: string;
      logo_url: string;
      createdAt: Date;
      updatedAt: Date;
    }
  ];
  price: number;
  discount: {
    _id: string;
    type: string;
    amount: number;
    start_date: Date;
    end_date: Date;
    createdAt: Date;
    updatedAt: Date;
  };
  promotion: {
    _id: string;
    code: string;
    description: string;
    type: string;
    amount: number;
    min_purchase: number;
    expired_date: Date;
    createdAt: Date;
    updatedAt: Date;
  };
  variants: IVariant[];
  reviews: IReviews[];
  images: image[];
  createdAt: Date;
  updatedAt: Date;
}

interface ProductCardProps {
  product: IProduct;
}

// cart interface
interface ICart {
  _id: string;
  user_id: IUser;
  product_id: IProduct;
  variant_id: IVariant;
  quantity: number;
  status: "pending" | "completed" | "canceled";
  orderDate: Date;
}

interface INewCart {
  user_id: string;
  product_id: string;
  variant_id: string;
  quantity: number;
  status: "pending" | "completed" | "canceled";
  orderDate: Date;
}

interface IUpdateCartItem {
  data: {
    user_id?: string;
    product_id?: string;
    variant_id?: string;
    quantity?: number;
    status?: "pending" | "completed" | "canceled";
    orderDate?: Date;
  };
  cartId: string;
}

// Product detail page  - variant
interface ISelectedVariant {
  variantId: string | null;
  size: string;
  color: string | null;
  colorName: string | null;
  stock: number | null;
  image: string | null;
}

// Wishlist
interface IWishlist {
  _id: string;
  user_id: IUser;
  product_id: IProduct;
}

interface INewWishlist {
  user_id: string;
  product_id: string;
}

interface IBanner {
  _id: string;
  label: string;
  description: string;
  image_url: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
}
