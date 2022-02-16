import React, { useState } from 'react';
import { useFetchForms } from '@fetchforms/react';
import {
  Form,
  Input,
  Button,
  Checkbox,
  Select,
  Radio,
  InputNumber,
  Alert
} from 'antd';
import './antDesignStyles.css';

const CustomFetchForm = () => {
  // FetchFormProvider needs to wrap this component
  const [fetchForm, loading, error, doCloudSubmit] = useFetchForms(
    process.env.REACT_APP_FF_FORM_ID
  );
  const [fail, setFail] = useState(false);

  const onFinish = async (values) => {
    if (fetchForm.cloudSave) {
      console.log("Saving to the Fetch Form's cloud");
      try {
        const isSaved = await doCloudSubmit(fetchForm.id, values);
        if (!isSaved) {
          throw new Error('There was an error submitting your form.');
        }
      } catch (err) {
        console.error(err);
        setFail(err.message);
      }
    }

    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  // custom form validation
  const createValidationRules = (fieldType, validations) => {
    const rules = validations.map((validation) => {
      if (validation.rule === 'required') {
        return { required: true, message: validation.message };
      } else if (validation.rule === 'regex') {
        return {
          pattern: new RegExp(validation.limit),
          message: validation.message
        };
      } else {
        return {
          [validation.rule]: validation.limit,
          message: validation.message,
          type: fieldType === 'number' ? 'number' : 'string'
        };
      }
    });
    console.log(fieldType, rules);
    return rules;
  };

  const dynamicField = (item) => {
    switch (item.fieldType) {
      case 'select':
        const { Option } = Select;
        return (
          <Select key={item.name}>
            <Option value=''></Option>
            {item.options.map((option) => (
              <Option value={option.value} key={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        );
      case 'checkbox':
        return <Checkbox key={item.name} />;
      case 'textarea':
        const { TextArea } = Input;
        return <TextArea key={item.name} />;
      case 'number':
        return <InputNumber key={item.name} />;
      case 'radio':
        return (
          <Radio.Group>
            {item.options.map((opt) => (
              <Radio value={opt.value} key={opt.value}>
                {opt.label}
              </Radio>
            ))}
          </Radio.Group>
        );
      default:
        return <Input {...item.fieldHtml} key={item.name} />;
    }
  };

  return (
    <div className=''>
      <div className='text-3xl'>Custom Form</div>
      <p className='text-gray-500'>
        You can render a Fetch Form with any component library - this example is
        using{' '}
        <a
          href='https://ant.design/components/overview/'
          target='_blank'
          rel='noreferrer'
        >
          Ant Design
        </a>
        . All the form data is in the returned Fetch Form object.
        <br />
        Design a beautiful form and integrate the validation rules with your
        component library and you have an amazing form in record time.
      </p>
      <br />
      {(error || fail) && (
        <Alert message={error || fail} type='error' showIcon />
      )}

      {loading ? (
        <div>Loading...</div>
      ) : (
        fetchForm && (
          <Form
            name='HookForm'
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
            noValidate
          >
            {fetchForm.formItems.map((item, i) => (
              <Form.Item
                key={i}
                label={item.label}
                name={item.name}
                valuePropName={
                  item.fieldType === 'checkbox' ? 'checked' : 'value'
                }
                rules={createValidationRules(item.fieldType, item.validation)}
                validateTrigger='onBlur'
              >
                {dynamicField(item)}
              </Form.Item>
            ))}
            <Form.Item
              wrapperCol={{
                span: 8,
                offset: 6
              }}
            >
              <Button type='primary' htmlType='submit'>
                {fetchForm.submitText}
              </Button>
            </Form.Item>
          </Form>
        )
      )}
    </div>
  );
};

export default CustomFetchForm;
