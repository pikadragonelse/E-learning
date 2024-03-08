import { Carousel, Col, Row } from "antd";
import { CarouselRef } from "antd/es/carousel";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { ItemCourse } from "./item-course";

export type CarouselList = { list?: any[] };
export const CarouselList: React.FC<CarouselList> = ({}) => {
    const listRef = useRef<CarouselRef>(null);
    const [page, setPage] = useState<number>(1);
    const [maxPage, setMaxPage] = useState<number>(1);
    const [multipleListCourse, setMultipleListCourse] = useState<Array<any[]>>([
        [1, 2, 3],
        [1, 2, 3],
        [1, 2, 3],
        [1, 2, 3],
    ]);

    return (
        <div className="">
            <Carousel className="h-80 " ref={listRef}>
                {multipleListCourse.map((listCourse) => (
                    <div>
                        <Row justify={"start"} gutter={16}>
                            {listCourse.map((value) => (
                                <Col
                                    span={24 / listCourse.length}
                                    className="list-col"
                                >
                                    <Link
                                        href={`/detail-course/${value.movieId}`}
                                    >
                                        <ItemCourse className="" />
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};
