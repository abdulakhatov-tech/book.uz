export type RenderComponentT = {
  Component: any;
  path: string;
  meta?: {
    title: string;
    description: string;
  };
  isPrivate?: boolean;
};

export type RoutePropT = {
  _id: string | number;
  path: string;
  Component: any;
  children?: RoutePropT[];
  isPrivate?: boolean,
};