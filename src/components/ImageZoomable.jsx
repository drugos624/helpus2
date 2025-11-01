
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

function ImageZoomable({ src, width = "300px", height = "300px", alt = "Immagine" }) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: "12px",
        overflow: "hidden",
        border: "2px solid #ccc",
        margin: "10px auto",
      }}
    >
      <TransformWrapper
        initialScale={1}
        minScale={1}
        maxScale={4}
        centerOnInit={true}
        doubleClick={{ disabled: false }}
        pinch={{ step: 5 }}
      >
        <TransformComponent
          wrapperStyle={{
            width: "100%",
            height: "100%",
          }}
        >
          <img
            src={src}
            alt={alt}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              touchAction: "none",
            }}
          />
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
}

export default ImageZoomable;
