import React, { createRef, useState,useEffect } from "react"
import { useScreenshot } from "use-react-screenshot"

const ScreenshotComponent = ({ children ,onImageCapture, captureScreenshot, setCaptureScreenshot }) => {
  const ref = createRef(null)
  const [image, takeScreenshot] = useScreenshot()

  useEffect(() => {
    // When captureScreenshot becomes true, take the screenshot
    if (captureScreenshot) {
      handleScreenshot();
    }
  }, [captureScreenshot]);

  const handleScreenshot = async () => {
    const capturedImage = await takeScreenshot(ref.current);

    // Call the callback with the captured image
    onImageCapture(capturedImage);

    // Reset captureScreenshot to false to avoid taking multiple screenshots
    setCaptureScreenshot(false);
  }

  return (
    <div>
      <div ref={ref}>{children}</div>
    </div>
  )
}

export default ScreenshotComponent
