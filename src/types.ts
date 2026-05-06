export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Vector' | 'Icon' | 'Texture' | 'Illustration';
  imageUrl: string;
  author: string;
  fileSize: string;
  format: string;
}

export interface CartItem extends Product {
  quantity: number;
}
