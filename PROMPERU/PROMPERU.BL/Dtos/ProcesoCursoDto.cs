namespace PROMPERU.BL
{
    public class ProcesoCursoDto
    {
        public int? ID { get; set; }
        public string RUC { get; set; }
        public int Insc_ID { get; set; }
        public int CourseID { get; set; }
        public string CourseCode { get; set; }
        public string CourseName { get; set; }
        public string CourseButtonLink { get; set; }
        public string EventType { get; set; }
        public DateTime? CourseStartDate { get; set; }
        public DateTime? CourseEndDate { get; set; }
        public decimal IndividualScore { get; set; }
        public decimal GlobalScore { get; set; }
        public string Status { get; set; }

    }
}
