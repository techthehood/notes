# manifest.json notes
sites:
[mozilla manifest docs](https://developer.mozilla.org/en-US/docs/Web/Manifest)
[google developer The Web App Manifest](https://developers.google.com/web/fundamentals/web-app-manifest/)
[google developer - confingured for a custom splash screen](https://developers.google.com/web/tools/lighthouse/audits/custom-splash-screen
[google developers - improved add to home screen](https://developers.google.com/web/updates/2017/02/improved-add-to-home-screen)
[]()


my manifest example:

```
{
 "//": "Some browsers will use this to enable push notifications.",
  "//": "It is the same for all projects, this is not your project's sender ID",
  "gcm_sender_id": "103953800507",
  "//": "I changed this location and added firebase manifest to one for A2HS",
  "short_name": "sunzao alight",
  "name": "sunzao | life together",
  "icons": [
    {
      "src": "../../images/flame@xs.png",
      "type": "image/png",
      "sizes": "48x48"
    },
    {
      "src": "../../images/flame.png",
      "type": "image/png",
      "sizes": "96x96"
    },
    {
      "src": "../../images/flame@2x.png",
      "type": "image/png",
      "sizes": "144x144"
    },
    {
      "src": "../../images/flame_192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "../../images/flame_512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "display": "standalone",
  "orientation": "portrait",
  "start_url": "/beta/index.php/alight/home",
  "background_color":"#323436",
  "theme_color":"#323436"
}



```

experiments & notes

imagescape gotcha:
imagescape adds an extra px to the 'image size' dimensions unless you modify the 'export area' height and width to be exactly the same

i have a problem with the title text on the splash screen being so far from
the image. so i tried different sizes and configurations

i tried to use same image and let the manifest zoom in
 for example:
    {
      "src": "../../images/flame_144.png",
      "type": "image/png",
      "sizes": "512x512"
    }
	
result: unsuccessful //this resulted in a tiny image.

once i update the manifest file the changes are available to the add to home screen button upon next reload - no history/clear cache neccessary

i liked this navy blue color #1a3867 but decided to go with a similar gray that is use on the business card in order to stay consistent. #323436
