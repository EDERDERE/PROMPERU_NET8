using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PROMPERU.BL.Dtos
{
    public class TestModelRequestDto
    {
        public List<Step> Steps { get; set; }
        public ActiveTest ActiveTest { get; set; }        
    }

    public class SelectAnswer
    {
        public string Input { get; set; }
        public int? Id { get; set; }
    }

}
