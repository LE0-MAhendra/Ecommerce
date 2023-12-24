// User interface
export interface UserProps {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string | null;
  date_joined: string;
  last_login: string;
  created_date: string;
  modified_date: string;
  is_customer: boolean;
  is_admin: boolean;
  is_staff: boolean;
  is_active: boolean;
  is_superadmin: boolean;
}

// Brand interface
export interface BrandProps {
  id: string;
  user: UserProps;
  name: string;
  description: string | null;
  slug: string | null;
  logo: string;
  created_at: string;
  updated_at: string;
}

// Category interface
export interface CategoryProps {
  id: string;
  user: UserProps;
  name: string;
  slug: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

// Products interface
export interface ProductsProps {
  id: string;
  user: UserProps;
  name: string;
  category: CategoryProps[];
  price: number;
  discount_percentage: number | null;
  sale_price: number | null;
  brand: BrandProps | null;
  rating: number;
  description: string | null;
  image: ProductImageProps[];
  quantity: number;
  is_available: boolean;
  created_at: string;
  updated_at: string;
}
export interface ProductImageProps {
  id: string;
  product: ProductsProps;
  image_file: string;
  image_url: string;
}
export interface CartProps {
  id: string;
  user: UserProps;
  is_checked_out: boolean;
  created_at: string;
  updated_at: string;
  delivery_fee: Number;
  Total_qty: Number;
  final_price_del: Number;
  final_price: Number;
  cart_items: CartItemProps[];
}

export interface CartItemProps {
  id: string;
  cart: CartProps;
  product: ProductsProps;
  cart_quantity: number;
  total_price: number;
}
export interface OrderProps {
  id: string;
  user: UserProps;
  cart: CartProps | null;
  Payment_id: string | null;
  payment_sign: string | null;
  payment_success: boolean;
  created_at: string;
  updated_at: string;
}
