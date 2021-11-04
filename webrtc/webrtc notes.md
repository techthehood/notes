# WebRTC notes

#### GOTCHA: hello echo
[WebRTC Acoustic Echo cancelation](https://stackoverflow.com/questions/37390574/webrtc-acoustic-echo-cancelation)   

```
  <video
  style={main_class}
  ref={videoRef}
  
  muted="true"
  autoPlay />
```
> muted="true" there was also an instruction to lower the video elements volume to zero but so far its unneccessary

failed
```
  const constraints = { video: true, audio: {echoCancellation: true}};// failed
  const constraints = { video: true, audio: true, echoCancellation: true};// failed
  const constraints = { video: true, audio: true};// failed
```
> the audio: {echoCancellation: true} needs more research