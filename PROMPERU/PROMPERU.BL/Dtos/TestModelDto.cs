namespace PROMPERU.BL.Dtos
{
    public class TestModelDto
    {
        public TestType? TestType { get; set; }
        public bool HasInstructions { get; set; } = false; // Por defecto en false
        public Instructions? Instructions { get; set; }
        public List<Element>? Elements { get; set; }
    }

    public class Instructions
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Alert { get; set; }
        public string? AlertIcon { get; set; }
        public string? ButtonText { get; set; }
        public string? ButtonIcon { get; set; }
    }

    public class Element
    {
        public int? ID { get; set; }
        public int Order { get; set; }
        public string Type { get; set; } = string.Empty; // Evita errores de serialización
        public string? QuestionText { get; set; }
        public bool? IsComputable { get; set; } // Opcional
        public string? Category { get; set; }
        public string? AnswerType { get; set; }
        public List<Answer>? Answers { get; set; }
        public Course? Course { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public SelectedForm? SelectedForm { get; set; }
    }

    public class Answer
    {
        public int? ID { get; set; }
        public int Order { get; set; }
        public string Text { get; set; } = string.Empty;
        public int Value { get; set; }
    }

    public class SelectedForm
    {
        public int? ID { get; set; }
        public string? Value { get; set; }
        public string? Label { get; set; }
    }
}
