import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

interface ImageItem {
  contentid: number;
  imgname: string;
  originimgurl: string;
  serialnum: string;
}
interface GalleryProps {
  images: ImageItem[];
}
const Gallery = ({ images }: GalleryProps) => {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "16px" }}>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {images.map((image) => (
          <SwiperSlide key={image.serialnum}>
            <img
              src={image.originimgurl}
              alt={image.imgname}
              style={{
                margin: "0 auto", // ✅ 수평 가운데 정렬
                width: "80%",
                height: "auto", // 💡 고정 높이로 적절히 제한
                objectFit: "cover", // ✅ 비율 유지하면서 꽉 차게
                borderRadius: "8px", // ✅ 둥근 모서리
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)", // ✅ 살짝 그림자 /
              }}
            ></img>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Gallery;
