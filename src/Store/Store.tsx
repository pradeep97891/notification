import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { FC } from 'react';
import { MailService, CommonService } from '../Service/Services';


const store = configureStore({
  reducer: {
  
    [MailService.reducerPath]: MailService.reducer,
    [CommonService.reducerPath]: CommonService.reducer
  },
  middleware: (getDefaultMidleware) =>
    getDefaultMidleware()
      
      .concat(MailService.middleware)
      .concat(CommonService.middleware),
  devTools: true
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
interface ChildInterface {
    children?: React.ReactNode;
  }
  
const AppStoreProvider: FC<ChildInterface> = (props) => {
  return <Provider store={store}>{props.children}</Provider>;
};

export { AppStoreProvider };
