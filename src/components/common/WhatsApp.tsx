"use client";

import { memo } from "react";
import Image from "next/image";
// import { Tooltip } from 'react-tooltip';

const WhatsApp = () => {
  const phoneNumber = "+919999532041";
  const IMAGE_SIZE = 64;

  const handleClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="relative h-16 w-16">
      <Image
        src="https://organicnationmages.s3.ap-south-1.amazonaws.com/other_images/whatsApp.webp"
        alt="Chat with us on WhatsApp"
        onClick={handleClick}
        className="absolute top-0 left-0 h-16 w-16 cursor-pointer transition-opacity duration-300"
        width={IMAGE_SIZE}
        height={IMAGE_SIZE}
        loading="lazy"
        data-tooltip-id="whatsapp-tooltip"
        data-tooltip-content="Click to chat with us"
        data-tooltip-place="top"
      />

      {/* <Tooltip
        id="whatsapp-tooltip"
        className="!bg-[#25D366] !rounded-lg !py-2 !px-4"
        place="top"
        animation="fade"
        delayShow={200}
        delayHide={300}
      /> */}
    </div>
  );
};

export default memo(WhatsApp);
