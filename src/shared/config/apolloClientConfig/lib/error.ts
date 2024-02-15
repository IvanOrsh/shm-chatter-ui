// import { ApolloError } from "@apollo/client"

export const formatErrorMessage = (errorMessage: string) => {
  return errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const extractApolloErrorMessage = (err: any) => {
  const errorMessage = err.graphQLErrors[0]?.extensions?.originalError?.message;

  if (!errorMessage) {
    // return formatErrorMessage(err.message);
    return;
  }

  if (Array.isArray(errorMessage)) {
    return formatErrorMessage(errorMessage[0]);
  }

  return formatErrorMessage(errorMessage);
};

/*
{
    "errors": [
        {
            "message": "Bad Request Exception",
            "locations": [
                {
                    "line": 2,
                    "column": 3
                }
            ],
            "path": [
                "createUser"
            ],
            "extensions": {
                "code": "BAD_REQUEST",
                "stacktrace": [
                    //...
                ],
                "originalError": {
                    "message": [
                        "email must be an email",
                        "password is not strong enough"
                    ],
                    "error": "Bad Request",
                    "statusCode": 400
                }
            }
        }
    ],
    "data": null
}

*/
