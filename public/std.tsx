// class Solution {
//     public int lengthOfLongestSubstring(String s) {
//         int left = 0;
//         int maxLength = 0;
//         HashSet<Character> charSet = new HashSet<>(); 

//         for (int right = 0; right < s.length(); right++) {
//             while (charSet.contains(s.charAt(right))) {
//                 charSet.remove(s.charAt(left));
//                 left++;
//             }

//             charSet.add(s.charAt(right));
//             maxLength = Math.max(maxLength, right - left + 1);
//         }

//         return maxLength;       
//     }
// }




// var filterBuilder = Builders<StudentRequest>.Filter;
// var filter = filterBuilder.Eq(s => s.IsDelete, false);

// if (!string.IsNullOrEmpty(gender))
//     filter &= filterBuilder.Eq(s => s.Gender, gender);

// if (!string.IsNullOrEmpty(className))
//     filter &= filterBuilder.Eq(s => s.Class, className);

// return await _StudnetRegisterCollection
//     .Find(filter)
//     .Sort(sortDefinition)
//     .Skip((pageNumber - 1) * pageSize)
//     .Limit(pageSize)
//     .ToListAsync();




// public async Task<StudentResponse> AddSkills(SkillsRequest request)
// {
//     StudentResponse res = new StudentResponse();
 
//     // Initialize filter builder
//     var filterBuilder = Builders<StudentRequest>.Filter;
 
//     // Base filter: only include non-deleted records
//     var filter = filterBuilder.Eq(s => s.IsDelete, false);
 
//     // Loop through each student in the request.selectedKey
//     if (request.selectedKey != null && request.selectedKey.Any())
//     {        
//         foreach (var student in request.selectedKey) 
//         {
//             if (!string.IsNullOrEmpty(student.Gender))
//             {
//                 // Add gender filter (you can chain more filters as needed)
//                 filter &= filterBuilder.Eq(s => s.Gender, student.Gender);
//             }
 
//             // Similarly, apply more conditions if needed
//             // e.g., filter &= filterBuilder.Eq(s => s.City, student.City);
//         }
//     }
 
//     // Example usage (modify as per your DB context)
//     // var result = await _studentCollection.Find(filter).ToListAsync();
//     // res.Data = result;
 
//     return res;
// }



import React, { useRef, useEffect } from 'react';
import { Form, Input, Button, message, Space } from 'antd';

const { Item, useForm } = Form;

const FormInstanceExample = () => {
  const [form] = useForm(); // Hook for using Form instance
  const formRef = useRef(null); // Ref for accessing Form instance directly

  useEffect(() => {
    // You can access form methods here if needed,
    // though `useForm()` is generally preferred in function components.
    if (formRef.current) {
      console.log('Form instance available via ref:', formRef.current);
    }
  }, []);

  const onFinish = (values) => {
    console.log('Submitted values:', values);
    message.success('Form submitted successfully!');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed to submit:', errorInfo);
    message.error('Form submission failed!');
  };

  // 1. getFieldError
  const handleGetFieldError = () => {
    const errors = form.getFieldError('username');
    console.log('Errors for username:', errors);
    if (errors.length > 0) {
      message.info(`Username errors: ${errors.join(', ')}`);
    } else {
      message.info('No errors for username.');
    }
  };

  // 2. getFieldInstance (Ant Design does not directly expose a 'getFieldInstance' in the common public API for FormInstance.
  //    It's more of an internal detail. If you need to interact with the underlying DOM element,
  //    you'd typically use `ref` on the Ant Design Input component itself, not via FormInstance.
  //    However, if it's from a custom form library, its implementation might vary.)
  //    For Ant Design, you generally don't need to directly access the field instance this way.
  const handleGetFieldInstance = () => {
    message.warning("Ant Design's FormInstance does not typically expose 'getFieldInstance' directly in the public API for general use. You'd usually interact with the Field component or the Input's ref.");
  };

  // 3. getFieldsError
  const handleGetFieldsError = () => {
    const allErrors = form.getFieldsError();
    console.log('All fields errors:', allErrors);
    if (allErrors.some(field => field.errors.length > 0)) {
      message.info(`Fields with errors: ${allErrors.filter(field => field.errors.length > 0).map(field => field.name[0]).join(', ')}`);
    } else {
      message.info('No errors for any field.');
    }
  };

  // 4. getFieldsValue
  const handleGetFieldsValue = () => {
    const allValues = form.getFieldsValue();
    console.log('All current field values:', allValues);
    message.info(`Current values: ${JSON.stringify(allValues)}`);

    const specificValues = form.getFieldsValue(['username', 'email']);
    console.log('Specific field values (username, email):', specificValues);
    message.info(`Specific values (username, email): ${JSON.stringify(specificValues)}`);

    // get all values, including unmounted fields (if applicable, though less common with Ant Design's default behavior)
    // For Ant Design, `getFieldsValue(true)` is not a standard signature.
    // The `getFieldsValue` method typically returns values for mounted fields.
    // If you need values from unmounted fields, you'd usually manage them in your state.
    message.warning("`getFieldsValue(true)` is not a standard Ant Design FormInstance signature for 'all values including unmounted'. `getFieldsValue()` typically gets values of currently mounted fields.");
  };

  // 5. getFieldValue
  const handleGetFieldValue = () => {
    const username = form.getFieldValue('username');
    console.log('Value of username:', username);
    message.info(`Username value: ${username}`);
  };

  // 6. isFieldsTouched
  const handleIsFieldsTouched = () => {
    const isTouched = form.isFieldsTouched();
    console.log('Are any fields touched?', isTouched);
    message.info(`Any fields touched: ${isTouched}`);

    const specificTouched = form.isFieldsTouched(['username', 'password']);
    console.log('Are username or password touched?', specificTouched);
    message.info(`Username or password touched: ${specificTouched}`);

    const allTouched = form.isFieldsTouched(['username', 'password'], true);
    console.log('Are ALL username AND password touched?', allTouched);
    message.info(`ALL username AND password touched: ${allTouched}`);
  };

  // 7. isFieldTouched
  const handleIsFieldTouched = () => {
    const isUsernameTouched = form.isFieldTouched('username');
    console.log('Is username touched?', isUsernameTouched);
    message.info(`Username touched: ${isUsernameTouched}`);
  };

  // 8. isFieldValidating
  const handleIsFieldValidating = async () => {
    // To demonstrate, let's trigger a validation for username and check immediately
    try {
      // Intentionally trigger validation without waiting for it to finish fully
      form.validateFields(['username']).catch(() => {});
      const isUsernameValidating = form.isFieldValidating('username');
      console.log('Is username validating?', isUsernameValidating);
      message.info(`Username validating: ${isUsernameValidating}`);

      // After a short delay, it should no longer be validating
      await new Promise(resolve => setTimeout(resolve, 50));
      const isUsernameValidatingAfterDelay = form.isFieldValidating('username');
      console.log('Is username validating (after delay)?', isUsernameValidatingAfterDelay);
      message.info(`Username validating (after delay): ${isUsernameValidatingAfterDelay}`);

    } catch (error) {
      // Catch validation errors if any
      console.log(error)
    }
  };

  // 9. resetFields
  const handleResetFields = () => {
    form.resetFields();
    message.success('All fields have been reset.');
  };

  const handleResetSpecificFields = () => {
    form.resetFields(['username', 'password']);
    message.success('Username and password fields have been reset.');
  };

  // 10. scrollToField
  const handleScrollToField = () => {
    form.scrollToField('email', {
      block: 'center', // Scroll to center the field
      behavior: 'smooth',
      focus: true, // Focus on the field after scrolling (Ant Design 5.24.0+)
    });
    message.info('Scrolled to email field.');
  };

  // 11. setFields
  const handleSetFields = () => {
    form.setFields([
      { name: 'username', value: 'newUsername', errors: [] },
      { name: 'password', value: 'newPassword123', errors: ['Password too short!'] },
    ]);
    message.success('Username and password fields updated via setFields.');
  };

  // 12. setFieldValue
  const handleSetFieldValue = () => {
    form.setFieldValue('email', 'new.email@example.com');
    message.success('Email field updated via setFieldValue.');
  };

  // 13. setFieldsValue
  const handleSetFieldsValues = () => {
    // Note: this will override existing values for the specified fields
    form.setFieldsValue({
      username: 'adminUser',
      email: 'admin@example.com',
    });
    message.success('Username and email fields updated via setFieldsValue.');
  };

  // 14. submit
  const handleSubmit = () => {
    form.submit(); // This will trigger the onFinish or onFinishFailed handlers
  };

  // 15. validateFields
  const handleValidateFields = async () => {
    try {
      const values = await form.validateFields();
      console.log('Validation successful:', values);
      message.success('All fields validated successfully!');
    } catch (errorInfo) {
      console.log('Validation failed:', errorInfo);
      message.error('Validation failed. Check console for details.');
    }
  };

  const handleValidateSpecificFields = async () => {
    try {
      const values = await form.validateFields(['username', 'email']);
      console.log('Specific validation successful (username, email):', values);
      message.success('Username and email validated successfully!');
    } catch (errorInfo) {
      console.log('Specific validation failed:', errorInfo);
      message.error('Specific validation failed. Check console for details.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Ant Design FormInstance Examples</h1>
      <Form
        form={form}
        ref={formRef}
        name="basic"
        initialValues={{ remember: true, username: 'initialUser' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Item>
    
        <Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }, { min: 6, message: 'Password must be at least 6 characters.' }]}
        >
          <Input.Password />
        </Item>

        <Item
          label="Email"
          name="email"
          rules={[{ type: 'email', message: 'Please enter a valid email!' }]}
        >
          <Input />
        </Item>

        <Item>
          <Space wrap>
            <Button type="primary" onClick={handleGetFieldError}>
              getFieldError('username')
            </Button>
            <Button onClick={handleGetFieldInstance}>
              getFieldInstance (N/A)
            </Button>
            <Button onClick={handleGetFieldsError}>
              getFieldsError()
            </Button>
            <Button onClick={handleGetFieldsValue}>
              getFieldsValue()
            </Button>
            <Button onClick={handleGetFieldValue}>
              getFieldValue('username')
            </Button>
            <Button onClick={handleIsFieldsTouched}>
              isFieldsTouched()
            </Button>
            <Button onClick={handleIsFieldTouched}>
              isFieldTouched('username')
            </Button>
            <Button onClick={handleIsFieldValidating}>
              isFieldValidating('username')
            </Button>
            <Button onClick={handleResetFields}>
              resetFields()
            </Button>
            <Button onClick={handleResetSpecificFields}>
              resetFields(['username', 'password'])
            </Button>
            <Button onClick={handleScrollToField}>
              scrollToField('email')
            </Button>
            <Button onClick={handleSetFields}>
              setFields()
            </Button>
            <Button onClick={handleSetFieldValue}>
              setFieldValue('email')
            </Button>
            <Button onClick={handleSetFieldsValues}>
              setFieldsValue()
            </Button>
            <Button type="primary" onClick={handleSubmit}>
              submit()
            </Button>
            <Button onClick={handleValidateFields}>
              validateFields()
            </Button>
            <Button onClick={handleValidateSpecificFields}>
              validateFields(['username', 'email'])
            </Button>
          </Space>
        </Item>
      </Form>
    </div>
  );
};

export default FormInstanceExample;

 