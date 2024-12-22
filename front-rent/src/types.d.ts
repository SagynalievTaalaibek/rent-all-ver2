export interface RegisterMutation {
  username: string;
  password: string;
  fullName: string;
  phone: string;
}

export interface UserI {
  _id: string;
  username: string;
  fullName: string;
  phone: string;
  token: string;
  role: string;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface RegisterResponse {
  message: string;
  user: UserI;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}

//Category

export interface MainCategoryI {
  _id: string;
  mainCategoryName: string;
}

export interface CategoryMutation {
  mainCategoryId: string;
  category: string;
}

export interface CategoryI {
  _id: string;
  mainCategoryId: MainCategoryI;
  category: string;
}
export interface CategoryByMainCategoryId {
  _id: string;
  category: string;
}

export interface CategoryUpdate {
  _id: string;
  mainCategoryId: string;
  category: string;
}

// Item

export interface ItemMutation {
  title: string;
  mainCategoryId: string;
  category: string;
  images: string[];
  description: string;
  price: string;
  location: string;
  availability: boolean;
}

export interface ItemsI {
  _id: string;
  title: string;
  mainCategoryId: {
    _id: string;
    mainCategoryName: string;
  };
  category: {
    _id: string;
    category: string;
  };
  images: string[];
  description: string;
  price: string;
  location: string;
  user: {
    _id: string;
    fullName: string;
    phone: string;
  };
  availability: boolean;
}

export interface OrdersMutation {
  items: string;
  clientId: string;
  ownerId: string;
}

export interface OrderI {
  _id: string;
  items: {
    _id: string;
    title: string;
  };
  clientId: {
    _id: string;
    fullName: string;
    phone: string;
  };
  ownerId: {
    _id: string;
    fullName: string;
    phone: string;
  };
  date: string;
  status: string;
}
