import React from "react";
import { ItemInstructor } from "./item-instructor";
const url = "https://api.dicebear.com/7.x/miniavs/svg?seed=1";

export const ListInstructor = () => {
    return (
        <div className="overflow-hidden">
            <div className="flex gap-4 overflow-auto justify-between py-6">
                <ItemInstructor
                    srcAvt={url}
                    name="listInstructor"
                    major="Coder"
                />
                <ItemInstructor
                    srcAvt={url}
                    name="listInstructor"
                    major="Coder"
                />
                <ItemInstructor
                    srcAvt={url}
                    name="listInstructor"
                    major="Coder"
                />
                <ItemInstructor
                    srcAvt={url}
                    name="listInstructor"
                    major="Coder"
                />
                <ItemInstructor
                    srcAvt={url}
                    name="listInstructor"
                    major="Coder"
                />
                <ItemInstructor
                    srcAvt={url}
                    name="listInstructor"
                    major="Coder"
                />
                <ItemInstructor
                    srcAvt={url}
                    name="listInstructor"
                    major="Coder"
                />
            </div>
        </div>
    );
};
