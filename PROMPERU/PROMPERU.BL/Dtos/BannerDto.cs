using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PROMPERU.BL.Dtos
{
    public class BannerDto
    {
        public int id { get; set; }
        public int orden { get; set; }
        public string description { get; set; }
        public string   imageUrl { get; set; }
    }   
}
