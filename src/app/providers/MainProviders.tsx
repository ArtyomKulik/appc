import type { FC, JSX } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";

import { reduxStore } from "../store";
import { Fallback } from "../../shared";

interface IProviders {
  readonly children: JSX.Element;
}

export const MainProviders: FC<IProviders> = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <Provider store={reduxStore}>{children}</Provider>
    </ErrorBoundary>
  );
};
