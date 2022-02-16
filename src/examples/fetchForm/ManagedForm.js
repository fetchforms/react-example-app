import React, { useState } from 'react';
import { FetchForm, FetchFormsProvider } from '@fetchforms/react';

const ManagedForm = () => {
  const [formSubmission, setFormSubmission] = useState(null);
  const onSubmit = async (values) => {
    /* To show an error on the form, uncomment the line below */
    // return 'There was an error submitting the form.';
    console.log('return values', values);
    setFormSubmission(values);
  };
  return (
    <div className=''>
      <FetchFormsProvider permission={process.env.REACT_APP_FF_TOKEN}>
        <div className='text-3xl mb-2'>Managed Form</div>
        <p className='text-gray-600'>
          The easiest way to use Fetch Forms. Pass in a form slug and we'll
          handle client-side validation, input formatting, submissions, and
          styling.
          <br />
          When submitted, the data will be passed to your component after it's
          formatted and saved to the Fetch Forms cloud (only if cloudSave is
          enabled).
        </p>
        <br />
        <div>
          <FetchForm
            slug={process.env.REACT_APP_FF_FORM_ID}
            onSubmit={onSubmit}
          />
          <br />
          {formSubmission && (
            <pre>{JSON.stringify(formSubmission, null, 2)}</pre>
          )}
        </div>
      </FetchFormsProvider>
    </div>
  );
};

export default ManagedForm;
