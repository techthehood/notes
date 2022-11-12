# MJML notes

[MJML home](https://mjml.io/)   

the issues md is misleading. apparently i still used mjml on the client side with RForm.js

**NovEvt/components/EventCamp/components/Register/lib/RForm.js**
```
  import { mail_template } from '../../Mail/mail_template';
  ...
  const sendData = (data) => {
    ...
    switch (mode) {
      ...
      case "email":
        // email template
        const values = form_data.getValues();
        // formData.message = { ...data };
        formData.message = { ...values };
        const mjml_template = mail_template({...formData});
        formData.message = mjml_template.html;
        formData.format = "email";

        console.log(mjml_template);
        break;
        ...
```

mail_template.js
```
  import { renderToMjml, Mjml, MjmlHead, MjmlStyle, MjmlBody, MjmlSection, 
  MjmlColumn, MjmlDivider, MjmlText, MjmlAttributes, MjmlSelector } from '@luma-team/mjml-react';

  import mjml2html from 'mjml-browser';
```
> @luma-team/mjml-react - WORKS with mjml-browser on the client side to produce an email html format on the client side that can be used on the server to structure your email message - **see mjml issues.md**