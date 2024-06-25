"use client";

import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import { Popover, Skeleton } from "antd";
import { apiInstance } from "@/plugin/apiInstance";
import { Course } from "../lib/model/course";
import { NewItemCourse } from "./new-item-course";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ResSearch } from "../lib/model/search";

export default function Search({
    placeholder,
    className,
    onSearch = () => {},
    onChange = () => {},
}: {
    placeholder?: string;
    className?: string;
    onSearch?: (valueSearch: string) => void;
    onChange?: (value: string) => void;
}) {
    const [value, setValue] = useState("");
    const [listCourse, setListCourse] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const timer = useRef<any>();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const searchInline = (value: string) => {
        clearTimeout(timer.current);
        setIsLoading(true);
        if (value === "") {
            setIsLoading(false);
            setListCourse([]);
            return;
        }
        timer.current = setTimeout(() => {
            apiInstance
                .get("courses/elasticSearch", { params: { search: value } })
                .then((res) => {
                    const dataSearch = res.data as ResSearch;
                    setListCourse(
                        dataSearch.hits.hits.map((hit) => {
                            if (hit._source != null) {
                                if (hit.highlight?.introduction?.length > 0) {
                                    return {
                                        ...(hit._source as any),
                                        introduction:
                                            hit.highlight.introduction[0],
                                    };
                                } else {
                                    return hit._source;
                                }
                            }
                        })
                    );
                    setIsLoading(false);
                })
                .catch((err) => {
                    setIsLoading(false);
                    console.log(err);
                });
        }, 200);

        return () => {
            clearTimeout(timer.current);
        };
    };
    useEffect(() => {
        setValue(searchParams.get("search")?.toString() || "");
    }, []);

    const searchPage = (value: string) => {
        const params = new URLSearchParams(searchParams);

        if (value !== "") {
            params.set("search", value);
        } else {
            params.delete("search");
        }

        replace(`/en/search?${params.toString()}`);
    };

    return (
        <div
            className={`relative flex flex-1 text-zinc-800 flex-shrink-0 ${className}`}
        >
            {pathname.split("/")[2] === "search" ? (
                <input
                    className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => {
                        pathname.split("/")[2] === "search"
                            ? undefined
                            : searchInline(e.target.value);
                        setValue(e.target.value);
                        onChange(e.target.value);
                    }}
                    onKeyDown={(e) => {
                        e.key === "Enter" || e.key === "13"
                            ? searchPage(value)
                            : undefined;
                    }}
                />
            ) : (
                <Popover
                    arrow={false}
                    trigger={"click"}
                    content={
                        <ul className="w-[400px] max-w-[400px] md:w-[600px] md:max-w-[600px] max-h-[600px] overflow-auto flex flex-col gap-4">
                            <Skeleton loading={isLoading} active className="">
                                {listCourse?.length > 0
                                    ? listCourse.map((course, index) => (
                                          <li key={index}>
                                              <NewItemCourse
                                                  course={course}
                                                  layout="horizontal"
                                                  isHiddenButton
                                                  isHiddenDesc
                                                  className="h-28"
                                              />
                                          </li>
                                      ))
                                    : value !== ""
                                    ? "No result for your search"
                                    : "Type name/desc to find the course"}
                            </Skeleton>
                        </ul>
                    }
                    className="w-full"
                >
                    <input
                        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => {
                            searchInline(e.target.value);
                            setValue(e.target.value);
                            onChange(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            e.key === "Enter" || e.key === "13"
                                ? searchPage(value)
                                : undefined;
                        }}
                    />
                </Popover>
            )}

            <SearchOutlined
                className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 cursor-pointer active:text-gray-700"
                onClick={() => onSearch(value)}
            />
        </div>
    );
}
