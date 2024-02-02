import React from "react";
import {
    faCameraRetro,
    faCode,
    faMagnifyingGlassLocation,
    faNewspaper,
    faPenRuler,
    faScaleUnbalancedFlip,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TrendingCategory } from "./trending-category";

export const ListTrendingCategory = () => {
    return (
        <div className="overflow-hidden">
            <div className="flex justify-between items-end py-2 md:py-8  overflow-auto">
                <TrendingCategory
                    icon={
                        <FontAwesomeIcon
                            icon={faCode}
                            className="w-8 lg:w-14"
                        />
                    }
                    text="Coding"
                />
                <TrendingCategory
                    icon={
                        <FontAwesomeIcon
                            icon={faNewspaper}
                            className="w-6 lg:w-12"
                        />
                    }
                    text="Content writing"
                />
                <TrendingCategory
                    icon={
                        <FontAwesomeIcon
                            icon={faMagnifyingGlassLocation}
                            className="w-6 lg:w-12"
                        />
                    }
                    text="SEO"
                />
                <TrendingCategory
                    icon={
                        <FontAwesomeIcon
                            icon={faPenRuler}
                            className="w-6 lg:w-12"
                        />
                    }
                    text="Design"
                />
                <TrendingCategory
                    icon={
                        <FontAwesomeIcon
                            icon={faCameraRetro}
                            className="w-6 lg:w-12"
                        />
                    }
                    text="Photography"
                />
                <TrendingCategory
                    icon={
                        <FontAwesomeIcon
                            icon={faScaleUnbalancedFlip}
                            className="w-8 lg:w-14"
                        />
                    }
                    text="Sales"
                />
            </div>
        </div>
    );
};
