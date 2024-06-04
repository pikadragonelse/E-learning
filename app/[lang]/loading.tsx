import { LoadingOutlined } from "@ant-design/icons";

export default function Loading() {
    return (
        <div className="w-44 m-auto mt-40">
            <img src="/images/logo-main.png" alt="" className="w-full" />
            <div className="flex gap-2 text-gray-800 mt-4 ml-10">
                <LoadingOutlined />
                <span>Loading...</span>
            </div>
        </div>
    );
}
