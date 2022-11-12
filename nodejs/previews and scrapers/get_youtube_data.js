  // const puppeteer = require("puppeteer");
  const request = require("request");
  const cheerio = require("cheerio");
  const url_tool = require("url");
  const chalk = require('chalk');
  const keys = require('../../../configuration/keys');
  
  const display_console = false;

  /**
   * IMPORTANT youtube quota calculator https://developers.google.com/youtube/v3/determine_quota_cost
   * NOTE: this could be a problem down the road
   * link to youtube's quota description page https://developers.google.com/youtube/v3/guides/quota_and_compliance_audits
   * NOTE channel api curl \
      'https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=UC5RtvE80x0BhfOHjcLza7vw&key=[YOUR_API_KEY]'
   */

  const get_youtube_data = async (obj, callback) => {

    let meta_data = {};


    let orig_url = obj.url;
    if(display_console || true) console.log("[get_youtube_data] [youtube url] = ",orig_url);

    // let url = obj.url;
    // if(display_console || true) console.log("[get_youtube_data] [youtube url] = ",obj.url);
    if(display_console || false) console.log("[get_youtube_data] [new preview]");

    if(display_console || false) console.log(chalk.blue("[get_youtube_data] [new dotenv api key is]"),keys);
    if(display_console || false) console.log(chalk.blue("[get_youtube_data] [new youtube api key is]"),keys.youtube.APIKey);

    const url = url_tool.parse(orig_url,true);

    if(display_console || true) console.log("[get_youtube_data]new url = ",url);// WORKS - url is an object
    // const urlParams = new URLSearchParams(url.search);
    // const v_id = urlParams.get("v");
    let url_param_obj = url.query;//works  

    /**
      FAILS - query is also an object or a 
      Cannot convert object to primitive value
      query: [Object: null prototype] {},
    */ 
    // if(display_console || true) console.log(chalk.blue("[get_youtube_data] url.query",url.query));// FAILS

    // read the url to determin type
    let type = orig_url.includes("/channel/") ? "channels" : orig_url.includes("/clip/") ? "clips" : "videos";

    let v_id = url_param_obj.v;//works
    if(display_console || false) console.log(chalk.blue("[get_youtube_data] [v_id]",v_id));
    // const v_id = url.searchParams.get("v");

    if(v_id == undefined){
      //try playlist list=
      v_id = url_param_obj.list;
    }//if

    if(v_id == undefined){
      //try a path
      switch (type) {
        case "channels":
            v_id = url.path.replace("/channel/","");// WORKS
          break;
        case "clips":
            v_id = url.path.replace("/clips/","");// FAILS 6/22/22
            type = "videos"
          break;
        default:
            v_id = url.path.replace("/","");
          break;
      }
    }//if

    // protect against articles with youtube in the title
    if(!v_id) return callback({error:true, message:"youtube url does not have a video id"},null);


    const api_key = keys.youtube.APIKey;
    // let req_url = `${url}&key=${api_key}&part=snippet`;// old
    // https://www.googleapis.com/youtube/v3/videos?id=r-yxNNO1EI8&key=AIzaSyCTmVwNa82iqcffrSa3bfqFCK-N2U6JdDk&part=snippet
    const api_url = `https://www.googleapis.com/youtube/v3/${type}`;
    let req_url = `${api_url}?id=${v_id}&key=${api_key}&part=snippet`;

    if(display_console) console.log("[api url] = ",req_url);

    let has_error = false;
    let error_msg = "";

    // if(!browser){
    //   try {
    //     const browser = await puppeteer.launch({headless: true,devtools: true});
    //   } catch (e) {
    //     if(display_console) console.log("[browser launch] error",e);
    //     return callback(e,null);
    //   }
    // }

    // try {
    //   const page = await browser.newPage();
    // } catch (e) {
    //   if(display_console) console.log("[newPage] error",e);
    //   return callback(e,null);
    // }
    // const browser = await puppeteer.launch({headless: true,devtools: true})
    // .catch(err => {
    //   has_error = true;
    //   error_msg = `puppeteer launch error ${err}`;
    // });
    //
    // if(has_error == true){
    //   if(display_console) console.error("[browser] launch",error_msg);
    //   try {
    //     await page.close();
    //     if(display_console) console.error("[browser] closed: launch");
    //   } catch (e) {
    //     if(display_console) console.error("[browser] launch error closing browser",e);
    //   }
    //   return callback(error_msg,null);
    // }


    // try{
    // }catch(err){
    //   return callback(`puppeteer launch error ${err}`,null);
    // }

      // const page = await browser.newPage()
      // .catch(err => {
      //   has_error = true;
      //   error_msg = `browser newPage error ${err}`;
      // })

      // if(has_error == true){
      //   if(display_console) console.error("[browser] newpage",error_msg);
      //   await page.close();
      //   if(display_console) console.error("[browser] closed: newpage");
      //   return callback(error_msg,null);
      // }
    // try{
    // }catch(err){
    //   return callback(`browser newPage error ${err}`,null);
    // }


    if(display_console) console.log("[goto time stamp] ",Date());
    // await page.goto(url, {waitUntil: 'networkidle2'})
    // await page.goto(url)//
    // await page.goto(req_url, {waitUntil: 'domcontentloaded',timeout:15000})//
    // .catch(err => {
    //   has_error = true;
    //   error_msg = `page goto error ${err}`;
    // });

    // if(has_error == true){
    //   if(display_console) console.error("[browser] page goto",error_msg);
    //   await page.close();
    //   if(display_console) console.error("[browser] closed: page goto");
    //   return callback(error_msg,null);
    // }


    if(display_console) console.log("[starting content] ",Date());


    // const res_obj = await page.content()
    // .catch(err => {
    //   has_error = true;
    //   error_msg = `page content error ${err}`;
    // })
    //
    // if(has_error == true){
    //   if(display_console) console.log(error_msg);
    //   await page.close();
    //   return callback(error_msg,null);
    // }

    // page.on('if(display_console) console', msg => {
    //   if(display_console) console.log("[page.on if(display_console) console] ",msg.text());
    // });

    // meta_data = await page.evaluate(async () =>
    // {
    request(req_url, async (error, response, html) => {

      if(error){
        if(display_console) console.log("[request] response error",error);
        return callback(error,null);
      }
      if(display_console) console.log("[page.evaluate] ",Date());
      let meta_obj = {};
      let ret_data = {};
      let data_array = ["title","image","description"];

      //check meta tags
      // let head = document.querySelector("head");// can i speed this up by only looking in the head section?
      // let meta_els = document.querySelectorAll("meta");
      // let meta_els = head.querySelectorAll("meta");
      if(display_console) console.log("[pre select] ",Date());
      // let pre_el = document.querySelector(`pre`);//

      if(display_console) console.log("[response] body",response.body);

      // $ = cheerio.load(html);

      // if(display_console) console.log("[cheerio] $",$);

      // let pre_el = $(`pre`);// pre_el
      // if(display_console) console.log("[pre el]",pre_el);
      //
      // let meta_str = pre_el.innerHTML;

          if(display_console) console.log("[content ready] ",Date());
          // if(display_console) console.log(`[res data] = ${meta_str}`);

          try{
            // meta_obj = JSON.parse(meta_str);
            if(display_console) console.log("[response] type of",typeof response.body);

            // meta_obj = response.body;
            meta_obj = JSON.parse(response.body);
            let snippet = meta_obj.items[0].snippet;
            ret_data = {
              title:snippet.title,
              description: snippet.description,
              image: snippet.thumbnails.medium.url/*formerly default*/
            };
            // image: snippet.thumbnails.default.url

            ret_data = JSON.stringify(ret_data)
            if(display_console) console.log(`[return data] = ${ret_data}`);
            return callback(null,ret_data);

          }catch(err){
            error_msg = `JSON error - not a json object ${err}`;
            if(display_console) console.log("[page evaluate] fn catch",error_msg);

            return callback({error:true, message:error_msg},null);
          }// catch

    // })// page.evaluate
    })// request
    // .catch(err => {
    //   has_error = true;
    //   error_msg = `page evaluate error ${err}`;
    // })

    // if(has_error == true){
    //   if(display_console) console.error("[browser] page evaluate ",error_msg);
    //   await page.close();
    //   if(display_console) console.error("[browser] closed: page evaluate");
    //   return callback(error_msg,null);
    // }


    // try{
    // }catch(err){
    //   return callback(`page content error ${err}`,null);

    // }
    // await page.close();

  }//get_youtube_data

  module.exports = get_youtube_data;

  // try{
  // }catch(err){
  // }
