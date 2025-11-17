interface Category {
  id: string;
  name: string;
  image: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  image: string;
  seller: string;
  isStarSeller: boolean;
  freeShipping: boolean;
  adBySeller?: boolean;
  fastShipping?: boolean;
}

