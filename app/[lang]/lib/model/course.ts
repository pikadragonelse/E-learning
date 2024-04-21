import { Category, defaultCategory } from "./categories";
import { Instructor, defaultInstructor } from "./instructor";
import { Language, defaultLanguage } from "./language";
import { Review, defaultReview } from "./review";
import { Topic, defaultTopic } from "./topic";

export interface Course {
    courseId: string;
    title: string;
    introduction: string;
    description: string;
    learnsDescription: string;
    requirementsDescription: string;
    price: number;
    discount: number;
    duration: number;
    categoryId: number;
    instructorId: number;
    averageRating: number;
    trailerUrl: string;
    subUrl: string;
    totalStudents: number;
    totalLessons: number;
    languageId: number;
    levelId: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    id: number;
    language: Language;
    level: {
        levelName: string;
    };
    category: Category;
    instructor: Instructor;
    topics: Topic[];
    reviews: Review[];
}

export const defaultCourse = {
    courseId: "",
    title: "",
    introduction: "",
    description: "",
    learnsDescription: "",
    requirementsDescription: "",
    price: 0,
    discount: 0,
    duration: 0,
    categoryId: 0,
    instructorId: 0,
    averageRating: 0,
    trailerUrl: "",
    subUrl: "",
    totalStudents: 0,
    totalLessons: 0,
    languageId: 0,
    levelId: 0,
    isActive: false,
    createdAt: "",
    updatedAt: "",
    id: 0,
    language: defaultLanguage,
    level: {
        levelName: "",
    },
    category: defaultCategory,
    instructor: defaultInstructor,
    topics: [defaultTopic],
    reviews: [defaultReview],
};
