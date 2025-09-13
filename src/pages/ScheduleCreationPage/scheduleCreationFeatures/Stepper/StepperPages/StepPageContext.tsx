import React, { createContext, useContext, useState } from "react";
import { TravelPlan } from "./StepPagesModel";

type TravelPlanState = Partial<TravelPlan>;

interface TravelPlanContextType {
  travelPlan: TravelPlanState;
  setTravelPlan: React.Dispatch<React.SetStateAction<TravelPlanState>>;
}

const TravelPlanContext = createContext<TravelPlanContextType | undefined>(undefined);

export const TravelPlanProvider = ({ children }: { children: React.ReactNode }) => {
  const [travelPlan, setTravelPlan] = useState<TravelPlanState>({});

  return (
    <TravelPlanContext.Provider value={{ travelPlan, setTravelPlan }}>
      {children}
    </TravelPlanContext.Provider>
  );
};

export const useTravelPlan = () => {
  const context = useContext(TravelPlanContext);
  if (!context) {
    throw new Error("useTravelPlan must be used within a TravelPlanProvider");
  }
  return context;
};
