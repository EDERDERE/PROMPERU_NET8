using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PROMPERU.BL.Dtos
{
    public class TestModelResponseDto
    {
        public List<Step> Steps { get; set; }
        public ActiveTest ActiveTest { get; set; }
        public Evaluated Evaluated { get; set; }
    }

    public class Step
    {
        public int Id { get; set; }
        public int StepNumber { get; set; }
        public string IconName { get; set; }
        public string IconUrl { get; set; }
        public bool Current { get; set; }
        public bool IsComplete { get; set; }
        public bool isApproved { get; set; }
        
    }

    public class ActiveTest
    {
        public TestType TestType { get; set; }
        public bool HasInstructions { get; set; }
        public Instructions Instructions { get; set; }
        public List<Element> Elements { get; set; }
    }
    
    public class Element
    {
        public int Id { get; set; }
        public int Order { get; set; }
        public string Type { get; set; }
        public string QuestionText { get; set; }
        public bool? IsComputable { get; set; }
        public string Label { get; set; }
        public string Category { get; set; }
        public string AnswerType { get; set; }
        public List<Answer> Answers { get; set; }
        public List<SelectAnswer> SelectAnswers { get; set; }
        public Course Course { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public SelectedForm SelectedForm { get; set; }
    }

    public class Evaluated
    {
        public string Ruc { get; set; }
        public string LegalName { get; set; }
        public string TradeName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Region { get; set; }
        public string Province { get; set; }
    }
}
