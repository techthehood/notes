# MJML send data callback notes
> shows how mjml is passed to the xhr post request to submit the mjml formatted form to the server

```
  const sendData = (data) => {

    // let formData = {
    //   from: from.value,
    //   email: email.value,
    //   subject: subject.value,
    //   message: message.value
    // }

    let formData = {};

    formData.subject = `${form_info.select[`${active_form}`].title} Form Submission`;
    formData.email = data.email;
    formData.active_form = active_form;
    // formData.message = prep_message({...data});
    switch (mode) {
      case "raw":
        formData.message = {...data};
        formData.format = "text";
        break;

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
      
      case "basic":
        // basic html display
        formData.message = prep_message({ ...data });
        break;
    
      default:
        // full html duplicate of form
        formData.message = prep_preview();
        break;
    }

    console.log(formData.message);

    if (form_test) return;

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/mail/sendMail');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.onload = () => {
      console.log(xhr.responseText);
      if (xhr.responseText == 'success') {
        // alert('Email sent');
        store.setPage(FSUCCESS);

        if (dev_mode) {
          // do nothing
        } else {
          // this doesn't work as is
          // from.value = "";
          // email.value = "";
          // subject.value = "";
          // message.value = "";
        }
      } else {
        // alert('An error occured!');
        store.setPage(FFAIL);
      }// else
    }

    xhr.send(JSON.stringify(formData));
  };// sendData
```

NOTE: formData is destructured to provide all the body properties used by mail_template fn to add data to the MJML template
```
   const mjml_template = mail_template({...formData});
```

```
const { form_info, agency_items2, edu_items2, gen_items2, html_parts, mail_styles } = require('../../../../jng');
...
  export const mail_template = (body) => {
    const active_form = body.active_form;
    const item_data = body.message;
    ...

    <MjmlBody>
        <MSC>
          <MjmlText>
          <RHead {...{ image: form_info.info.image, title: form_info.info.title, tag: "h3" }} />
          </MjmlText>
          <MjmlText>
            <div className="rForm_active" style={{ paddingBottom: "2rem", fontSize: "1rem" }}>{form_title}</div>
          </MjmlText>
        </MSC>

        <MjmlSection>
          <MCT column={{ ...dynamic_width, "fluid-on-mobile":"true"}}>
            <RField {...{ variant: `${form_info.form[`${"name"}`].variant}`, no_form: true, 
              attrib: { ...form_info.form[`${"name"}`].attrib, value: item_data.name, 
              wrap_style, label_style, input_style, } }} />
          </MCT>
          ...
```
> form_info and other data came from a jng.js data file