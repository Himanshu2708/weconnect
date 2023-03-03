import React, { useState } from "react";
//import {twilio} from 'twilio-video'
import SwitchImg from "../../resources/images/switchToScreenSharing.svg";
import {LocalVideoTrack} from 'twilio-video';
const SwitchToScreenSharingButton = ({room}) => {

  const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
const [screenShareTrack,setScreenShareTrack]=useState(null);
  const handleScreenSharingEnabling = () => {
    // handle screen sharing
    if (!isScreenSharingActive)

    {
    navigator.mediaDevices.getDisplayMedia().then(stream=>{
      setIsScreenSharingActive(true);


      const screenTrack=new LocalVideoTrack(stream.getVideoTracks()[0],
      {name:'screen-share-track',});
      room.localParticipant.publishTrack(screenTrack);

      setScreenShareTrack(screenTrack);

     stream.getVideoTracks()[0].onended=()=>{
      room.localParticipant.unpublishTrack(screenTrack);
      setScreenShareTrack(false);
      setIsScreenSharingActive(false);
     }


      
    
    }
      ).catch(err=>{
        console.error('could not share screen',err);

      });

    }
    else
    {
         screenShareTrack.stop();

         room.localParticipant.unpublishTrack(screenShareTrack);

         setScreenShareTrack(null);

         setIsScreenSharingActive(false);

    }

  };

  return (
    <div className="video_button_container">
      <img
        src={SwitchImg}
        onClick={handleScreenSharingEnabling}
        className="video_button_image"
      />
    </div>
  );
};

export default SwitchToScreenSharingButton;
