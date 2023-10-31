import React, { useEffect } from "react";
import { Sidebar, ProgressSpinner } from "primereact";

const Loading = (props) => {
  const { show } = props;

  useEffect(() => {
    show ? _disableContent() : _ableContent();
  }, [show]);

  const _disableContent = () =>
    document.getElementById("root").classList.contains("disabled-content");
  const _ableContent = () =>
    document.getElementById("root").classList.contains("disabled-content");

  return (
    show && (
      <div
        className="modal fade loading show d-block"
        style={{ zIndex: 9000 }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <svg viewBox="0 0 32 32" className="_loading w-100">
            <div className="flex justify-content-center">
              <Sidebar
                showCloseIcon={false}
                style={{ backgroundColor: "#f0f0f0" }}
                visible={show}
                fullScreen
              >
                <div
                  style={{
                    margin: "0",
                    position: "absolute",
                    top: "60%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                  className="flex justify-content-center"
                >
                  <h1>
                    {" "}
                    กรุณารอสักครู่
                  </h1>
                </div>
                <div
                  style={{
                    margin: "0",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                  className="flex justify-content-center"
                >
                  <ProgressSpinner />
                </div>
              </Sidebar>
            </div>
          </svg>
        </div>
      </div>
    )
  );
};

export default Loading;
