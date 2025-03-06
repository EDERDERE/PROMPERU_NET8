namespace PROMPERU.BL.Dtos
{
    public class MaestrosDto
    {
        public List<TestType> TestTypes { get; set; }
        public List<Course> Courses { get; set; }
        public List<SelectedForm> Forms { get; set; }
        public MaestrosDto()
        {
            TestTypes = new List<TestType>();
            Courses = new List<Course>();
            Forms = new List<SelectedForm>();
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
