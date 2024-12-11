export type SuccessResponse = {
  type: "success";
  data: {
    accessToken: string;
    name: string;
    email: string;
  };
};

export type ErrorResponse = {
  type: "error";
  err: {
    status: number;
    message: string;
  };
};

export type ControllerResponse = SuccessResponse | ErrorResponse;
