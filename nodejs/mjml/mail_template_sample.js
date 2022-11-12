


import { renderToMjml, Mjml, MjmlHead, MjmlStyle, MjmlBody, MjmlSection, 
  MjmlColumn, MjmlDivider, MjmlText, MjmlAttributes, MjmlSelector } from '@luma-team/mjml-react';
import mjml2html from 'mjml-browser';
const { form_info, agency_items2, edu_items2, gen_items2, html_parts, mail_styles } = require('../../../../jng');
import { obj_exists } from '../../../../../tools/exists';

// from controllers/
// import RHead from '../js/components/Register/lib/RHead';
// import RInfo from '../js/components/Register/lib/RInfo';
// // import RawHide from '../../RawHide';
// import RField from '../js/components/Register/lib/RField';
// import RList from '../js/components/Register/lib/RList';
// import RCheck from '../js/components/Register/lib/RCheck';

// from Register/lib/
import RHead from '../Register/lib/RHead';
import RInfo from '../Register/lib/RInfo';
// import RawHide from '../../RawHide';
import RField from '../Register/lib/RField';
import MList from './MList';
import MCheck from './MCheck';
import MSCT from './MSCT';
import MCT from './MCT';
import MSC from './MSC';

export const mail_template = (body) => {
  const active_form = body.active_form;
  const item_data = body.message;

  // wrap RForm Components in mjml components
  const form_title = obj_exists(form_info, `select.${active_form}.title`) ? form_info.select[`${active_form}`].title : "";

  const wrap_style = mail_styles.wrap_style;
  const label_style = mail_styles.label_style;
  const input_style = mail_styles.input_style;

  const dynamic_width = ["contractor", "agency"].includes(active_form) ? { width: "70%" } : {};
  
  // const { html } = render(
  const mjmlString = renderToMjml(
    <Mjml>
      <MjmlHead>
        {/* <MjmlAttributes>
          <MjmlSelector path=".custom div">
            <MjmlAttributes name="data-id">42</MjmlAttributes>
            <MjmlAttributes name="class">big-div</MjmlAttributes>
          </MjmlSelector>
        </MjmlAttributes> */}
        <MjmlStyle inline="inline">
          {`td{
            padding: unset !important;
          }`}
        </MjmlStyle>
        {/* <MjmlStyle>
          td div{
            background-color: red !important;
          }
        </MjmlStyle> */}
      </MjmlHead>
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
          {["contractor", "agency"].includes(active_form) ? 
          <MCT column={{width:"30%", "fluid-on-mobile":"true"}} >
            <RField {...{ variant: `${form_info.form[`${"title"}`].variant}`, no_form: true, 
            attrib: { ...form_info.form[`${"title"}`].attrib, value: item_data.title, 
            wrap_style, label_style, input_style,} }} />
          </MCT>
            : null}
        </MjmlSection>

        <MjmlSection>
          <MCT column={{width:"70%", "fluid-on-mobile":"true"}}>
            <RField {...{ variant: ``, no_form: true, 
              attrib: {name:"company", type:"text", id:"company", label:"Company", value: item_data.company,
              wrap_style, label_style, input_style,} }} />
          </MCT>
          <MCT column={{width:"30%", "fluid-on-mobile":"true"}}>
            <RField {...{ variant: ``, no_form: true, 
              attrib: {name:"type", type:"text", id:"type", label:"Type", value: item_data.type,
              wrap_style, label_style, input_style,} }} />
          </MCT>
        </MjmlSection>

        <MjmlSection>
          <MCT column={{width:"70%", "fluid-on-mobile":"true"}}>
            <RField {...{
              variant: ``, no_form: true,
              attrib: {
                name: "address", type: "text", id: "address", label: "address", value: item_data.address,
                wrap_style, label_style, input_style,
              }
            }} />
          </MCT>
          <MCT column={{width:"30%", "fluid-on-mobile":"true"}}>
            <RField {...{
              variant: ``, no_form: true,
              attrib: {
                name: "suite", type: "text", id: "suite", label: "suite", value: item_data.suite,
                wrap_style, label_style, input_style,
              }
            }} />
          </MCT>
        </MjmlSection>

        <MjmlSection>
          <MCT column={{width:"60%", "fluid-on-mobile":"true"}}>
            <RField {...{
              variant: ``, no_form: true,
              attrib: {
                name: "city", type: "text", id: "city", label: "city", value: item_data.city,
                wrap_style, label_style, input_style,
              }
            }} />
          </MCT>
          <MCT column={{width:"20%", "fluid-on-mobile":"true"}}>
            <RField {...{
              variant: ``, no_form: true,
              attrib: {
                name: "state", type: "text", id: "state", label: "state", value: item_data.state,
                wrap_style, label_style, input_style,
              }
            }} />
          </MCT>
          <MCT column={{width:"20%", "fluid-on-mobile":"true"}}>
              <RField {...{
                variant: ``, no_form: true,
                attrib: {
                  name: "zip", type: "text", id: "zip", label: "zip code", value: item_data.zip,
                  wrap_style, label_style, input_style,
                }
              }} />
          </MCT>
        </MjmlSection>

        <MjmlSection>
          <MCT>
            <RField {...{
              variant: ``, no_form: true,
              attrib: {
                name: "telephone", type: "phone", id: "telephone", label: "telephone", value: item_data.telephone,
                wrap_style, label_style, input_style,
              }
            }} />
          </MCT>
          {["contractor", "agency"].includes(active_form) ?
          <MCT>
            <RField {...{
              variant: ``, no_form: true,
              attrib: {
                name: "fax", type: "phone", id: "fax", label: "fax", value: item_data.fax,
                wrap_style, label_style, input_style,
              }
            }} />
          </MCT>
          :
          <MCT>
            <RField {...{
              variant: ``, no_form: true,
              attrib: {
                name: "mobile", type: "phone", id: "mobile", label: "mobile", value: item_data.mobile,
                wrap_style, label_style, input_style,
              }
            }} />
          </MCT>}
        </MjmlSection>
        <MSCT>
          <RField {...{
            variant: ``, no_form: true,
            attrib: {
              name: "mobile", type: "phone", id: "mobile", label: "mobile", value: item_data.mobile,
              wrap_style, label_style, input_style,
            }
          }} />
        </MSCT>

        {["contractor"].includes(active_form) ?
          <MList {...{
            item_data, label: "job opportunities", category: "opportunities",
            item1: { name: "type", variant: "w3-col m6", placeholder: "opportunity type" },
            item2: { name: "description", variant: "w3-col m6", placeholder: "describe the opportunity..." }
          }} />
          : null}
        {["agency"].includes(active_form) ?
        <>
          <MCheck {...{
            item_data, items: agency_items2, category: "resources",
            label: "Resource Information", sub: "(Please check the services or information you will provide)", variant: "res_check"
          }} />
          <MSCT>
            < RField {...{
              no_form: true,
              variant: "w3-col res_txt",
              mode: "textarea",
              attrib: {
                name: "resources.skill",
                id: `resource_skill`,
                label: "Skill Training",
                value: item_data.resources?.skill,
                wrap_style: {...wrap_style, paddingTop: "1rem"}, label_style, input_style,
              },
            }} />
          </MSCT>
          <MSCT>
            < RField {...{
              no_form: true,
              variant: "w3-col res_txt",
              mode: "textarea",
              attrib: {
                name: "resources.additional",
                id: `resource_additional`,
                label: "Additional Services",
                value: item_data.resources?.additional,
                wrap_style, label_style, input_style,
              }
            }} />
          </MSCT>
        </>
        : null}

        {["applicant"].includes(active_form) ?
          <MList {...{
            item_data, label: "work experience", category: "experience",
            item1: { name: "type", variant: "w3-col m6", placeholder: "job type" },
            item2: { name: "duties", variant: "w3-col m6", placeholder: "" }
          }} />
          : null}
        {["applicant"].includes(active_form) ?
        <>
          <MCheck {...{
            item_data, items: edu_items2, category: "education",
            label: "Education", sub: "(Please check your highest level of education)", variant: "edu_check"
          }} />
          <MSCT>
            < RField {...{
              no_form: true,
              variant: "w3-col edu_txt",
              mode: "textarea",
              attrib: {
                name: "education.list",
                id: `education_list`,
                label: "school list",
                value: item_data.education?.list,
                wrap_style: { ...wrap_style, paddingTop: "1rem" }, label_style, input_style,
              },
            }} />
          </MSCT>
        </>
        : null}

        {["general"].includes(active_form) ?
        <>
          <MCheck {...{
            item_data, items: gen_items2, category: "general",
            label: "General Information", sub: "Brief description of your attendance:", variant: "gen_check"
          }} >
          </MCheck>
          <MSCT>
            < RField {...{
              no_form: true,
              variant: "w3-col gen_txt",
              mode: "textarea",
              attrib: {
                name: "general.other",
                id: `general`,
                label: "other",
                value: item_data.general?.other,
                wrap_style: { ...wrap_style, paddingTop: "1rem" }, label_style, input_style,
              },
            }} />
          </MSCT>
        </>
        : null}

      </MjmlBody>
    </Mjml>
  );// render

  // const mjmlString = renderToMjml(<Mjml>...</Mjml>));

  const html = mjml2html(mjmlString);

  return html;
}
/**
 {["applicant"].includes(active_form) ?
          <RList {...{
            store, form_data, onChange: updateInput, register, unregister, label: "work experience", category: "experience",
            item1: { name: "type", variant: "w3-col m6", placeholder: "job type" },
            item2: { name: "duties", variant: "w3-col m6", placeholder: "" }
          }} />
        : null}
        {["applicant"].includes(active_form) ?
          <RCheck {...{
            store, form_data, onChange: updateInput, register, unregister, items: edu_items, category: "education",
            label: "Education", sub: "(Please check your highest level of education)", variant: "edu_check"
          }} >
            < RField {...{
              variant: "w3-col edu_txt",
              mode: "textarea",
              attrib: {
                name: "education.list",
                id: `education_list`,
                label: "school list",
                register,
                placeholder: "list name of school or training ",
                onChange: updateInput,
                value: item_data.education?.list
              }
            }} />
          </RCheck>
          : null}
        {["general"].includes(active_form) ?
          <RCheck {...{
            store, form_data, onChange: updateInput, register, unregister, items: gen_items, category: "general",
            label: "General Information", sub: "Brief description of your attendance:", variant: "gen_check"
          }} >
            < RField {...{
              variant: "w3-col gen_txt",
              mode: "textarea",
              attrib: {
                name: "general.other",
                id: `general`,
                label: "other",
                register,
                placeholder: "",
                onChange: updateInput,
                value: item_data.general?.other
              }
            }} />
          </RCheck>
          : null}
 */

/**

<MjmlSection>
  <MjmlColumn>
    <MjmlText>
    </MjmlText>
  </MjmlColumn>
</MjmlSection>

 */