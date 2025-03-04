namespace PROMPERU.BL.Dtos
{
    public class ListTestDto
    {
        public List<TestType> TestTypes { get; set; }
        public List<Course> Courses { get; set; }

        public ListTestDto()
        {
            TestTypes = new List<TestType>();
            Courses = new List<Course>();
        }
    }

    public class TestType
    {
        public int Value { get; init; }
        public string Label { get; init; }
    }

    public class Course
    {
        public int Value { get; init; }
        public string Label { get; init; }
    }
}
