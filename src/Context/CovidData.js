import { createContext } from "react";

const Covid19DataContext = createContext();

export const Covid19DataProvider = Covid19DataContext.Provider;
export const Covid19DataConsumer = Covid19DataContext.Consumer;

export default Covid19DataContext;
