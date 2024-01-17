import { useRouteError } from "react-router-dom"
import InternalServerErrorPage from "./InternalServerErrorPage"
import NotFoundErrorPage from "./NotFoundErrorPage"
import BadRequestErrorPage from "./BadRequestErrorPage"
import UnauthorizedErrorPage from "./UnauthorizedErrorPage"
import { AxiosError } from "axios"

export default function ErrorHandler() {
  const error = useRouteError() as AxiosError;
  switch(error.status) {
    case 400:
      return <BadRequestErrorPage />
    case 401:
      return <UnauthorizedErrorPage />
    case 404:
      return <NotFoundErrorPage />;
    case 500:
      return <InternalServerErrorPage />;
  }

  return <div>{error.message}</div>
}
