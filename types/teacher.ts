export type Teacher = {
  id: string;
  fullname: string;
};

export type TeachersApiResponse = {
  statusCode: number;
  message: string;
  userMessage: string;
  data: Teacher[];
  meta: {
    total: number;
  };
};
