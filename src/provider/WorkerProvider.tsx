import React, { createContext, FC, useContext } from 'react';
import { WorkerService } from '../service/WorkerService';

interface WorkerState {
  workerService?: WorkerService;
}

const initalState = { workerService: new WorkerService() };

const WorkerServiceContext = createContext<WorkerState>(initalState);

export function useWorkerService() {
  return useContext(WorkerServiceContext);
}

interface Props {
  children: React.ReactNode;
}

const WorkerProvider: FC<Props> = ({ children }) => {
  return <WorkerServiceContext.Provider value={initalState}>{children}</WorkerServiceContext.Provider>;
};

export default WorkerProvider;
