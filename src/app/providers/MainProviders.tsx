import type { FC, JSX, PropsWithChildren } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Provider } from "react-redux";

import { reduxStore } from "../store";
import { Fallback } from "../../shared";

export const MainProviders = ({ children }: PropsWithChildren) => {
  return (
    <ErrorBoundary FallbackComponent={Fallback}>
      <Provider store={reduxStore}>{children}</Provider>
    </ErrorBoundary>
  );
};
