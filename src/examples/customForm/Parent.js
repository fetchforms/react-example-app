import React from 'react';
import { FetchFormsProvider } from '@fetchforms/react';
import CustomFetchForm from './CustomFetchForm';

const HookParent = () => {
  const fetchFormId = process.env.REACT_APP_FF_FORM_ID;

  return (
    <FetchFormsProvider permission={process.env.REACT_APP_FF_TOKEN}>
      <CustomFetchForm slug={fetchFormId} />
    </FetchFormsProvider>
  );
};

export default HookParent;
