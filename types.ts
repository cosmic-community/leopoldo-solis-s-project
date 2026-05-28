export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface Categoria extends CosmicObject {
  type: 'categorias';
  metadata: {
    nombre?: string;
    descripcion?: string;
    color?: string;
  };
}

export interface Post extends CosmicObject {
  type: 'posts';
  metadata: {
    titulo?: string;
    extracto?: string;
    contenido?: string;
    imagen_destacada?: {
      url: string;
      imgix_url: string;
    };
    fecha_publicacion?: string;
    categoria?: Categoria;
  };
}

export interface Proyecto extends CosmicObject {
  type: 'proyectos';
  metadata: {
    titulo?: string;
    descripcion?: string;
    imagen_principal?: {
      url: string;
      imgix_url: string;
    };
    galeria?: Array<{
      url: string;
      imgix_url: string;
    }>;
    cliente?: string;
    ano?: string | number;
    url_proyecto?: string;
    tecnologias?: string;
    categoria?: Categoria;
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}