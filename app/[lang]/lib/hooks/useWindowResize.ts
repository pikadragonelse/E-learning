import { useEffect, useState } from "react";

export const useWindowResize = () => {
    const [windowSize, setWindowSize] = useState(window.innerWidth);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        function handleResize() {
            clearTimeout(timer);
            timer = setTimeout(() => {
                setWindowSize((prevSize) => {
                    const newWidth = window.innerWidth;
                    // Chỉ cập nhật state nếu kích thước thực sự thay đổi
                    if (prevSize !== newWidth) {
                        return newWidth;
                    }
                    return prevSize;
                });
            }, 300);
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(timer);
        };
    }, []);

    return windowSize;
};
