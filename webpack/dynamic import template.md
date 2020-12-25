




#### a quick lazy load template
set_form_controls.js > arc_add_info.onclick
```
  arc_add_info.onclick = async function(){

    const form = await import(/* webpackChunkName: "form" */ '../form/form.js');
    await form.get_info_form({"mod":"add","view":this.dataset.view},{state});

  }
```
**put the import load behind a user interaction**
