import CourseCard from "@/app/(admin)/components/cards/course-card";

export default function Page() {
    return (
        <div className="container">
            <Header />
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-2">
                <CourseCard
                    status="Published"
                    brandName="Coachify"
                    courseTitle="2025 MBA"
                    subtitle="CAT & OMETs Basics Builder"
                    recordingsCount={30}
                    totalHours={48}
                    categoryName="Computer Science"
                    courseName="Introduction to Programming"
                    studentsCount={512}
                    avatars={[
                        "https://eu.ui-avatars.com/api/?name=John+Doe&size=250",
                        "https://eu.ui-avatars.com/api/?name=John+Doe&size=250",
                        "https://eu.ui-avatars.com/api/?name=John+Doe&size=250",
                        "https://eu.ui-avatars.com/api/?name=John+Doe&size=250",
                    ]}
                />
                <CourseCard
                    status="Draft"
                    brandName="Coachify"
                    courseTitle="2025 MBA"
                    subtitle="CAT & OMETs Basics Builder"
                    recordingsCount={30}
                    totalHours={48}
                    categoryName="Category Name"
                    courseName="Course Name"
                    studentsCount={512}
                    avatars={[
                        "https://eu.ui-avatars.com/api/?name=John+Doe&size=250",
                        "https://eu.ui-avatars.com/api/?name=John+Doe&size=250",
                        "https://eu.ui-avatars.com/api/?name=John+Doe&size=250",
                        "https://eu.ui-avatars.com/api/?name=John+Doe&size=250",
                    ]}
                />
                <CourseCard
                    status="Draft"
                    brandName="Coachify"
                    courseTitle="2025 MBA"
                    subtitle="CAT & OMETs Basics Builder"
                    recordingsCount={30}
                    totalHours={48}
                    categoryName="Category Name"
                    courseName="Course Name"
                    studentsCount={512}
                    avatars={[
                        "https://eu.ui-avatars.com/api/?name=John+Doe&size=250",
                        "https://eu.ui-avatars.com/api/?name=John+Doe&size=250",
                        "https://eu.ui-avatars.com/api/?name=John+Doe&size=250",
                        "https://eu.ui-avatars.com/api/?name=John+Doe&size=250",
                    ]}
                />
            </div>
        </div>
    );
}

export function Header(){
    return (
        <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">Manage Your Courses</h3>
            {/* Filter + Add button row */}
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <span className="text-gray-600">Filter by</span>
                    <select className="border rounded px-2 py-1">
                        <option>Category</option>
                        <option>Category 2</option>
                    </select>
                </div>

                <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
                    + Add New Course
                </button>
            </div>
        </div>
    );
}
