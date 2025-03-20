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
    public  class Evaluated
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
