export interface ProjectCategory {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: {
    secure_url: string;
    publicId: string;
  };
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Video {
  url: string;
  duration?: number;
}

export interface IImage {
  secure_url: string;
  publicId: string;
}


export interface TechStackItem {
  name: string;
  version?: string;
  secure_url: string;
  publicId: string;
}




export interface Project {
  _id?: string;
  title: string;
  shortDesc: string;
  description?: string;
  liveDemo?: string;
  repoLink?: string;
  isFeatured: boolean;
  rating: number;
  views: number;

  thumbnail: {
    secure_url: string;
    publicId: string;
  } | null ;
  images?: {
    secure_url: string;
    publicId: string;
  }[];
  gallery?: {
    secure_url: string;
    publicId: string;
  }[];

  videos?: Video[];
  techStack: TechStackItem[];
  categoryId: string[] ;

  status: "planning" | "in-progress" | "completed";
  completionDate?: string;

  createdAt: string;
  updatedAt: string;
}
