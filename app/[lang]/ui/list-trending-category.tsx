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
            <div className="flex justify-between items-end py-2 md:py-8 overflow-auto">
                <TrendingCategory
                    icon={
                        <FontAwesomeIcon
                            icon={faCode}
                            className="md:text-2xl lg:text-4xl"
                        />
                    }
                    text="Coding"
                />
                <TrendingCategory
                    icon={
                        <FontAwesomeIcon
                            icon={faNewspaper}
                            className="md:text-2xl lg:text-4xl"
                        />
                    }
                    text="Content writing"
                />
                <TrendingCategory
                    icon={
                        <FontAwesomeIcon
                            icon={faMagnifyingGlassLocation}
                            className="md:text-2xl lg:text-4xl"
                        />
                    }
                    text="SEO"
                />
                <TrendingCategory
                    icon={
                        <FontAwesomeIcon
                            icon={faPenRuler}
                            className="md:text-2xl lg:text-4xl"
                        />
                    }
                    text="Design"
                />
                <TrendingCategory
                    icon={
                        <FontAwesomeIcon
                            icon={faCameraRetro}
                            className="md:text-2xl lg:text-4xl"
                        />
                    }
                    text="Photography"
                />
                <TrendingCategory
                    icon={
                        <FontAwesomeIcon
                            icon={faScaleUnbalancedFlip}
                            className="md:text-2xl lg:text-4xl"
                        />
                    }
                    text="Sales"
                />
            </div>
        </div>
    );
};
