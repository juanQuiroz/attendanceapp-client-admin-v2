export type Cycle = {
  id: string;
  gapi_id: number;
  gapi_name: string;
  gapi_tipoCiclo: string;
  gapi_urlSeo: string;
  isCurrent: boolean;
  name: string;
  startDate: string;
  endDate: string;
  createdAt: string;
};

export type CyclesApiResponse = {
  statusCode: number;
  message: string;
  userMessage: string;
  data: Cycle[];
  meta: {
    total: number;
  };
};
